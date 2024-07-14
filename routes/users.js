const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  resetPassword,
  forgotPassword,
  isAuth,
  getCheckout,
} = require("../controllers/users");

const userAuth = require("../middlewares/userAuth");

router.post("/register", register);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
router.post("/logout", logout);
router.get("/isauth", userAuth, isAuth);

router.post("/checkout", getCheckout);

// router.get("/checkout/success", getCheckoutSuccess);

// router.get("/checkout/cancel", getCheckout);

// router.get("/orders", userAuth, getOrders);

// router.get("/orders/:orderId", userAuth, getInvoice);

module.exports = router;
