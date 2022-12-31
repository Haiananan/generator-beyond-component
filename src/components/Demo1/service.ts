import Demo1, { Demo1Model } from './model'
import * as Validation from './validation'
import * as Service from '../service'

export const create = (data: any) => Service.create<Demo1Model>(Demo1, data, Validation.create, 'email')

export const find = (data: any) => Service.find<Demo1Model>(Demo1, data, Validation.find)

export const findById = (_id: string) => Service.findById<Demo1Model>(Demo1, _id)

export const update = (data: any) => Service.update<Demo1Model>(Demo1, data, Validation.update, 'email')

export const remove = (data: any) => Service.remove<Demo1Model>(Demo1, data)
