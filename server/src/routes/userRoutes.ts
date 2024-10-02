import { Router } from 'express'
import { fetchUserController, loginController, signupController } from '../controller/userController'
import { authMiddleware } from '../middleware/userMiddleware'

const router = Router()


router.route('/signup').post(signupController)

router.route('/login').post(loginController)

router.use(authMiddleware)

router.route('/fetch-user').get(fetchUserController)

export default router