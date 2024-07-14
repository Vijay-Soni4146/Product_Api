const UserService = require("../db/userServices");
const {
  GeneralMsgs,
  TableFields,
  ValidationMsgs,
} = require("../utils/constants");
const ValidationError = require("../utils/ValidationError");
const stripe = require("stripe")(process.env.SKTEST_KEY);

exports.register = async (req, res) => {
  // Check if email exists
  const userExists = await UserService.getUserByEmail(req.body.email)
    .withEmail()
    .execute();

  if (userExists) {
    res.json({
      status: ApiResponseCode.Conflict,
      message: GeneralMsgs.emailExists,
      result: [],
    });
  }

  const User = await UserService.insertUserRecord(req.body);

  res.json({ User });

  // send CREDENTIALS ON EMAIL
  // await sendMail(req.body.email, randomPassword, User.name);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserService.getUserByEmail(email)
    .withEmail()
    .withPassword()
    .withId()
    .withName()
    .withMobile()
    .execute();

  if (!user) {
    throw new ValidationError(GeneralMsgs.invalidEmail);
  }

  if (!(await user.isValidPassword(password))) {
    throw new ValidationError(GeneralMsgs.invalidPassword);
  }

  const token = await UserService.genAuthToken(user);

  UserService.saveAuthToken(user[TableFields.ID], token);

  return res.json({ user, token });
};

exports.isAuth = async (req, res) => {
  return res.json(req.user);
};

exports.logout = async (req, res) => {
  const headerToken = req.header("Authorization").replace("Bearer ", "");
  UserService.removeAuth(req.user[TableFields.ID], headerToken);
  return true;
};

exports.forgotPassword = async (req, res) => {
  let providedEmail = req.body[TableFields.email];
  providedEmail = (providedEmail + "").trim().toLowerCase();

  if (!providedEmail) throw new ValidationError(ValidationMsgs.emailEmpty);

  let { code, name, email } = await UserService.getResetPasswordToken(
    providedEmail
  );
  return { code, name, email };
  // Email.SendForgotPasswordEmail(name, email, code);
};

exports.resetPassword = async (req, res) => {
  let providedEmail = req.body[TableFields.email];
  providedEmail = (providedEmail + "").trim().toLowerCase();

  const { code, newPassword } = req.body;

  if (!providedEmail) throw new ValidationError(ValidationMsgs.emailEmpty);
  if (!code) throw new ValidationError(ValidationMsgs.passResetCodeEmpty);
  if (!newPassword) throw new ValidationError(ValidationMsgs.newPasswordEmpty);

  let user = await UserService.resetPassword(providedEmail, code, newPassword);
  let token = await createAndStoreAuthToken(user);
  return {
    user: await UserService.getUserById(user[TableFields.ID])
      .withPassword()
      .withEmail()
      .withId()
      .withName()
      .execute(),
    token: token || undefined,
  };
};

async function createAndStoreAuthToken(userObj) {
  const token = UserService.genAuthToken(userObj);
  await UserService.saveAuthToken(userObj[TableFields.ID], token);
  return token;
}

exports.getCheckout = (req, res) => {
  const cart = req.body.cart;
  console.log(cart);
  let total = 0;
  const products = cart.map((item) => {
    total += item.quantity * item.product.price;
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.product.title,
          description: item.product.description,
        },
        unit_amount: item.product.price * 100,
      },
      quantity: item.quantity,
    };
  });

  stripe.checkout.sessions
    .create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: products,
      success_url:
        req.protocol +
        "://" +
        req.get("host") +
        `/checkout/success?session_id={CHECKOUT_SESSION_ID}`, // => http://localhost:3000
      cancel_url: req.protocol + "://" + req.get("host") + "/checkout/cancel",
    })
    .then((session) => {
      res.status(200).json({
        sessionId: session.id,
        totalSum: total,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    });
};

exports.getCheckoutSuccess = (req, res, next) => {
  const sessionId = req.query.session_id;
  console.log(sessionId);
  // req.user
  //   .populate("cart.items.productId")
  //   .execPopulate()
  //   .then((user) => {
  //     const products = user.cart.items.map((i) => {
  //       return { quantity: i.quantity, product: { ...i.productId._doc } };
  //     });
  //     const order = new Order({
  //       user: {
  //         email: req.user.email,
  //         userId: req.user,
  //       },
  //       products: products,
  //     });
  //     return order.save();
  //   })
  //   .then((result) => {
  //     return req.user.clearCart();
  //   })
  //   .then(() => {
  //     res.redirect("/orders");
  //   })
  //   .catch((err) => {
  //     const error = new Error(err);
  //     error.httpStatusCode = 500;
  //     return next(error);
  //   });
};
