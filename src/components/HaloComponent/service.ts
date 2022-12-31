import HaloComponent, { HaloComponentModel } from './model'
import * as Validation from './validation'
import * as Service from '../service'

export const create = (data: any) => Service.create<HaloComponentModel>(HaloComponent, data, Validation.create, 'name')

export const find = (data: any) => Service.find<HaloComponentModel>(HaloComponent, data, Validation.find)

export const findById = (_id: string) => Service.findById<HaloComponentModel>(HaloComponent, _id)

export const update = (data: any) => Service.update<HaloComponentModel>(HaloComponent, data, Validation.update, 'name')

export const remove = (data: any) => Service.remove<HaloComponentModel>(HaloComponent, data)
