import { Router } from "express";
import { body, oneOf } from "express-validator";
import { createProduct, updateProduct } from "./handlers/product";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

/**
 * Product
 */

router.get("/product");
router.get("/product/:id", () => {});
router.post(
  "/product",
  body("name").isString().isLength({ min: 3 }),
  handleInputErrors,
  createProduct
);
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
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString()
);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").optional().isIn(["EN_COURS", "LIVRE", "DEPRECIE"]),
  body("version").optional()
);
router.delete("/update/:id", () => {});

/**
 * Update point
 */

router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString()
);
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString()
);
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
