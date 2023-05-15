import { Router } from "express";
import { body } from "express-validator";
import { updateProduct } from "./handlers/product";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

/**
 * Product
 */

router.get("/product");
router.get("/product/:id", () => {});
router.post("/product", () => {});
router.put(
  "/product/:id",
  body("name").isString().isLength({ min: 3 }),
  handleInputErrors,
  updateProduct
);
router.delete("/product/:id", () => {});

/**
 * Update
 */

router.get("/update", () => {});
router.get("/update/:id", () => {});
router.post("/update", () => {});
router.put("/update/:id", () => {});
router.delete("/update/:id", () => {});

/**
 * Update point
 */

router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.post("/updatepoint", () => {});
router.put("/updatepoint/:id", () => {});
router.delete("/updatepoint/:id", () => {});

/**
 * User
 */

router.get("/user", () => {});
router.get("/user/:id", () => {});
router.post("/user", () => {});
router.put("/user/:id", () => {});
router.delete("/user/:id", () => {});

export default router;
