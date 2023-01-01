# generator-beyond-component

一键生成CRUD业务组件，支持按Schema生成模型、验证代码！

## 安装

如果您已经安装过yeoman，则不需要重复安装

```cli
npm install --global yo
```

```cli
npm i generator-beyond-component -D
```

## 使用

### 生成骨架

使用yo启动生成器，按照提示进行即可

```cli
yo beyond-component
```

### 生成代码

#### 填写Schema部分

```js
const MetaComponentSchema: Schema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 20 },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true, min: 1, max: 120 },
  hobby: { type: [String] },
  sex: { type: String, required: true, enum: ["female", "male"] },
  birthday: { type: Date },
  status: { type: Boolean, required: true },
  profile: { type: Schema.Types.Mixed },
})
```

#### 生成

再运行一次指令，组件名称填写刚刚生成的组件名称（默认保存上次输入，直接回车即可）,选择`根据组件Schema生成Model和Validation，并视情况改造service.ts`

```cli
yo beyond-component
// 选如下选项
? 😕该组件已存在，请选择操作： 
  无视该组件，继续执行 
❯ 根据组件Schema生成Model和Validation，并视情况改造service.ts 
  终止执行并退出 

// 输入a，回车（全部覆盖）
❗️注册操作需要修改文件，请检查：（回车以展开选项）
 conflict src/components/MetaComponent/model.ts
? Overwrite src/components/MetaComponent/model.ts? (ynarxdeiH) a
>> overwrite this and all others
```

#### 结果

你会在这几个文件下，看到生成的代码

```ts

// model.ts
export interface MetaComponentModel extends Document {
  readonly _id: Schema.Types.ObjectId
  name: string
  email: string
  age: number
  hobby?: string[]
  sex: 'female' | 'male'
  birthday?: Date
  status: boolean
  profile?: any

}
```

```ts

// validation.ts
const validateCreateSchema = Joi.object({
  name: Joi.string().required().min(3).max(20),
  email: Joi.string().required(),
  age: Joi.number().required().min(1).max(120),
  sex: Joi.string().required().valid('female','male'),
  birthday: Joi.date(),
  status: Joi.boolean().required(),
  profile: Joi.any(),

}).unknown(true)

const validateUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string(),
  age: Joi.number().min(1).max(120),
  sex: Joi.string().valid('female','male'),
  birthday: Joi.date(),
  status: Joi.boolean(),
  profile: Joi.any(),

}).unknown(true)
```

如果Schema中存在unique属性字段，则会修改service.ts

```ts
// 判断到email为唯一键，自动添加
export const create = (data: any) => Service.create<MetaComponentModel>(MetaComponent, data, Validation.create, 'email')

export const find = (data: any) => Service.find<MetaComponentModel>(MetaComponent, data, Validation.find)

export const findById = (_id: string) => Service.findById<MetaComponentModel>(MetaComponent, _id)

export const update = (data: any) => Service.update<MetaComponentModel>(MetaComponent, data, Validation.update, 'email')

export const remove = (data: any) => Service.remove<MetaComponentModel>(MetaComponent, data)
```

## 注意事项

1. Schema目前仅支持基础属性，不支持联表。
2. Schema必须使用展开写法，例如`name:{type:String}`，而不是`name:String`，因为这会使检测混淆，会造成类型推断不明确的问题。
3. 此cli仅用于生成骨架和初始化代码，如修改Schema请手动修改，不要使用cli。
4. 如果组件被注册过，那么删除的时候应该也删掉`components/index.ts`中的引入导出，`route`文件夹下的路由文件，和`route/index.ts`中的引入。
5. Schema当中的唯一键只能设置`0或1`个，如果需要多个唯一键，请写自定义service和validation。
6. 此项目仅供`haian-admin-nodets`使用

## Future version

### TODO

1. 支持在Schema联表情况下生成代码
2. 支持在已有结构情况下，根据Schema结构同步修改代码
3. 支持一键删除组件，自动删除注册时的相关引入

### FIX

1. 删除import路径多余的斜杠（不影响运行）
2. 修改组件在注册时import的位置，目前默认在行首
