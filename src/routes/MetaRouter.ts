import { Router } from 'express'
import * as MetaComponent from '../components/Meta'

const router: Router = Router()

router.get('/', MetaComponent.find)

router.post('/', MetaComponent.create)

router.put('/', MetaComponent.update)

router.delete('/', MetaComponent.remove)

export default router
