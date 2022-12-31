import { Router } from 'express'
import * as HaloComponentComponent from '../components/HaloComponent'

const router: Router = Router()

router.get('/', HaloComponentComponent.find)

router.post('/', HaloComponentComponent.create)

router.put('/', HaloComponentComponent.update)

router.delete('/', HaloComponentComponent.remove)

export default router
