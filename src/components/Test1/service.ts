import Test1, { Test1Model } from './model'
import * as Validation from './validation'
import * as Service from '../service'

export const create = (data: any) => Service.create<Test1Model>(Test1, data, Validation.create)

export const find = (data: any) => Service.find<Test1Model>(Test1, data, Validation.find)

export const findById = (_id: string) => Service.findById<Test1Model>(Test1, _id)

export const update = (data: any) => Service.update<Test1Model>(Test1, data, Validation.update)

export const remove = (data: any) => Service.remove<Test1Model>(Test1, data)
