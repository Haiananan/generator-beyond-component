import { Router } from 'express'
import * as Demo1Component from '../components/Demo1'

const router: Router = Router()

router.get('/', Demo1Component.find)

router.post('/', Demo1Component.create)

router.put('/', Demo1Component.update)

router.delete('/', Demo1Component.remove)

export default router
