import { Router } from "express";
import { body } from "express-validator";
import {
  createProduct,
  updateProduct,
  getProduct,
  getProducts,
  deleteProduct,
} from "./handlers/product";

import {
  getUpdates,
  getOneUpdate,
  createUpdates,
  updateUpdates,
  deleteUpdates,
} from "./handlers/update";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

/**
 * Product
 */

router.get("/product", getProducts);
router.get("/product/:id", getProduct);
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
router.delete("/product/:id", deleteProduct);

/**
 * Update
 */

router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  createUpdates
);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").optional(),
  body("version").optional(),
  updateUpdates
);
router.delete("/update/:id", deleteUpdates);

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
router.delete("/updatepoint/:id");

router.use((err, req, res, next) => {
  console.log("we have an error");
  res.json({ message: "Error catching in route..." });
});

export default router;
