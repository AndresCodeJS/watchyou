import Router from "express";
import { saveCart } from "../controllers/cart/saveCart.js";


const router = Router();


router.get("/save", saveCart);



export default router;