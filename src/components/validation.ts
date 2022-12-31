import * as Joi from 'joi'

/** 统一的多条查找表单验证schema
 * @param page 页码
 * @param limit 每页条数
 * @param sortBy 排序字段
 * @param sort 排序方式,1:升序,-1:降序
 * @param type 查询方式, and: 与, or: 或
 * @param condition 查询条件
 */
export const validateFindSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10),
  sortBy: Joi.string().default('_id'),
  sort: Joi.number().integer().valid(-1, 1).default(-1),
  type: Joi.string().valid('and', 'or').default('and'),
  condition: Joi.any().default({})
}).unknown(true)

/** 统一的多条查找表单验证类型
 * @param page 页码
 * @param limit 每页条数
 * @param sortBy 排序字段
 * @param sort 排序方式,1:升序,-1:降序
 * @param type 查询方式, and: 与, or: 或
 * @param condition 查询条件 对象或可转换为对象的字符串
 */
export interface FindFormType {
  page: number | string
  limit: number | string
  sortBy: string
  sort: 1 | -1
  type: 'and' | 'or'
  condition: object | string
}

/** 构造验证表单工具函数
 * @param data 待验证数据
 * @param schema 验证schema
 * @returns 验证通过的数据
 * @throws 验证失败抛出错误
 */
export function checkValidate<T = any>(
  data: any,
  ...schemas: Joi.ObjectSchema[]
): T {
  let resObj = {}
  schemas.forEach((schema) => {
    const res = schema.validate(data)
    if (res.error) throw new Error(res.error.message)
    else resObj = { ...resObj, ...res.value }
  })

  return resObj as T
}
/** 分页信息类型 */
export type PageInfoType = {
  page: number
  limit: number
  total: number
  maxPage: number
  find: number
}
