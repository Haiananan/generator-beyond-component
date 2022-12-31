import { Router } from 'express'
import * as Test1Component from '../components/a/b/c/Test1'

const router: Router = Router()

router.get('/', Test1Component.find)

router.post('/', Test1Component.create)

router.put('/', Test1Component.update)

router.delete('/', Test1Component.remove)

export default router
