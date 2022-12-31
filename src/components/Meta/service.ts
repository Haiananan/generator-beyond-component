import Meta, { MetaModel } from './model'
import * as Validation from './validation'
import * as Service from '../service'

export const create = (data: any) => Service.create<MetaModel>(Meta, data, Validation.create, 'name')

export const find = (data: any) => Service.find<MetaModel>(Meta, data, Validation.find)

export const findById = (_id: string) => Service.findById<MetaModel>(Meta, _id)

export const update = (data: any) => Service.update<MetaModel>(Meta, data, Validation.update, 'name')

export const remove = (data: any) => Service.remove<MetaModel>(Meta, data)
