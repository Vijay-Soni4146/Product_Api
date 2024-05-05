const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  getProduct,
} = require("../controllers/products");

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);

module.exports = router;
