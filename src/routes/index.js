import Router from 'express'
import Cart from './Cart.js'

const router = Router();

//Test
router.use("/cart",Cart)

export default router
