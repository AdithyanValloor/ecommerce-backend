import express from "express";
import { getProducts, getProductsById, getProductImageById} from "../controllers/productControllers.js";

const router = express.Router()

router.get("/", getProducts);
router.get("/:id", getProductsById)
router.get("/:id/image", getProductImageById)

export default router