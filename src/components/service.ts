import {
  Model, Document, FilterQuery, isValidObjectId
} from 'mongoose'
import { FindFormType, PageInfoType } from './validation'

/** 通用创建Service，返回成功创建的model
 * @param meta 文档模型
 * @param data 数据
 * @param validation 数据验证函数
 * @param duplicateProp 指定唯一属性
 */
export async function create<T extends Document>(
  meta: Model<T>,
  data: any,
  validation?: (v: any) => T,
  duplicateProp?: keyof Omit<T, keyof Document>
): Promise<T> {
  try {
    let res: T

    if (validation) res = validation(data)

    if (duplicateProp) {
      const duplicate = await meta.findOne({
        [duplicateProp]: data[duplicateProp]
      } as FilterQuery<T>)
      if (duplicate) {
        throw new Error(`此${duplicateProp as string}已被占用，换一个试试吧！`)
      }
    }

    return await meta.create(res)
  } catch (error) {
    throw new Error(error.message)
  }
}
/** 通用多条查找Service，返回model数组和分页信息
 * @param meta 文档模型
 * @param data 数据
 * @param validation 数据验证函数
 * @returns [model数组, 分页信息]
 */
export async function find<T extends Document>(
  meta: Model<T>,
  data: any,
  validation?: (v: any) => FindFormType
): Promise<[T[], PageInfoType]> {
  try {
    const res: FindFormType = validation(data)
    if (typeof res.condition !== 'object') {
      res.condition = JSON.parse(res.condition) as object
    }
    const {
      page, limit, sortBy, sort
    } = res
    const metas = await meta
      .find(res.condition)
      .limit(+limit)
      .skip((+page - 1) * +limit)
      .sort({ [sortBy]: sort })

    if (!metas) throw new Error('Not found')
    const total = await meta.countDocuments()
    const maxPage = Math.ceil(metas.length / +limit)

    return [
      metas,
      {
        page: +page,
        limit: +limit,
        maxPage,
        total,
        find: metas.length
      }
    ]
  } catch (error) {
    throw new Error(error.message)
  }
}
/** 通用但条查找Service，返回model
 * @param meta 文档模型
 * @param _id 目标id
 */
export async function findById<T extends Document>(meta: Model<T>, _id: string): Promise<T> {
  try {
    // if (!isValidObjectId(_id)) throw new Error('Invalid id')
    const target = await meta.findById(_id)
    if (!target) throw new Error('Not found')

    return target
  } catch (error) {
    throw new Error(error.message)
  }
}
/** 通用更新Service，返回成功更新的model，data中必须包含_id
 * @param meta 文档模型
 * @param data 数据
 * @param validation 数据验证函数
 * @param duplicateProp 指定唯一属性
 * @return 更新后的model
 */
export async function update<T extends Document>(
  meta: Model<T>,
  data: any,
  validation?: (v: any) => T,
  duplicateProp?: keyof Omit<T, keyof Document>
): Promise<T> {
  try {
    if (!isValidObjectId(data._id)) throw new Error('Invalid id')
    const res: T = validation(data)

    const duplicate = await meta.findOne({
      [duplicateProp]: res[duplicateProp]
    } as FilterQuery<T>)
    if (duplicate && duplicate._id.equals(res._id)) {
      throw new Error(`此${duplicateProp as string}已被占用，换一个试试吧！`)
    }

    const target = await meta.findByIdAndUpdate(data._id, res as any, {
      new: true
    })
    if (!target) throw new Error('Not found')

    return target
  } catch (error) {
    throw new Error(error.message)
  }
}
/** 通用删除Service，返回成功删除的model，data中必须包含_id
 * @param meta 文档模型
 * @param data 数据
 * @return 删除的model
 */
export async function remove<T extends Document>(meta: Model<T>, data: any): Promise<T> {
  try {
    if (!isValidObjectId(data._id)) throw new Error('Invalid id')
    const target = await meta.findByIdAndDelete(data._id)
    if (!target) throw new Error('Not found')

    return target
  } catch (error) {
    throw new Error(error.message)
  }
}
