import { Router } from 'express'
import * as Test2Component from '../components/Test2'

const router: Router = Router()

router.get('/', Test2Component.find)

router.post('/', Test2Component.create)

router.put('/', Test2Component.update)

router.delete('/', Test2Component.remove)

export default router
