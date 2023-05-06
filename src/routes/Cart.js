import Router from "express";
import { saveCart } from "../controllers/cart/saveCart.js";


const router = Router();


router.post("/save", saveCart);



export default router;