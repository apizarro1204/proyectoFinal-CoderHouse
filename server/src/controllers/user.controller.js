import passport from "../config/passport.config.js";
import Product from "../DAOs/Product.dao.class.js";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";
import config from "../routes/connection.js";
import generateToken from "../config/jwt.config.js";

const products = new Product();

export const home = async (req, res) => {
  res.redirect("/login");
};

export const userLogged = async (req, res) => {
  const username = req.session?.email;
  const element = await products.getAll();
  res.render(path.join(process.cwd(), "./views/home.ejs"), {
    username,
    products: element,
    productsOk: element.length,
  });
};

export const registeredUser = async (req, res) => {
  res.sendFile(path.join(process.cwd(), "/views/partials/register.html"));
};

export const loginSuccess = async (req, res) => {
  const username = req.session?.email;
  if (username) {
    res.redirect("/home");
  } else {
    res.sendFile(path.join(process.cwd(), "/views/partials/login.html"));
  }
};

export const loginError = async (req, res) => {
  const error = res.status(500);
  const mensaje = "Email o contraseña incorrectos";
  res.render(path.join(process.cwd(), "/views/login-error.ejs"), {
    error,
    mensaje,
  });
  // res.status(500).json({status: 'error', message: 'Algo salió mal'})
};

export const logout = async (req, res) => {
  const username = req.session?.email;
  console.log(username)
  if (username) {
    req.session.destroy((err) => {
      if (!err) {
        res.render(path.join(process.cwd(), "/views/logout.ejs"), { username });
      } else {
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/");
  }
};

export const registerAuth = async (req, res, next) => {
  try {
    passport.authenticate("register", (error, user, message) => {
      if (error) {
        return next(error);
      }
      if (!user) {
        return res.status(401).json(message);
      }
      req.login(user, (error) => {
        if (error) {
          return next({ message: error });
        }
        return res.sendFile(path.join(process.cwd(), "/views/partials/login.html"));
      });
    })(req, res, next);
  } catch (error) {
    next(error);
  }
};

// export const registerAuth = passport.authenticate("register", {
//   successRedirect: "/login",
//   failureRedirect: "/login-error",
//   failureFlash: true,
// });

export const loginAuth = async (req, res, next) => {
  try {
    passport.authenticate(
      "login",
      { session: false },
      (error, user, message) => {
        if (error) {
          return next(error);
        }
        if (!user) {
          return res.status(401).json(message);
        }
        if (user) {
          res.cookie("auth", generateToken(user), {
            domain: process.env.DOMAIN_NAME,
          });
          return res.redirect("/home");
        }
      }
    )(req, res, next);
  } catch (error) {
    next(error);
  }
};

// export const loginAuth = async (req,res,next) => {
//   passport.authenticate('login', {
//     failureRedirect: '/login-error',
//   }), generateToken(req.body.email)
// }


// export const loginAuth = passport.authenticate("login", {
//   successRedirect: "/home",
//   failureRedirect: "/login-error",
// });

export const useSession = session({
  secret: "TOP SECRET",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: config.mongoRemote.cxnStr }),
  cookie: {
    maxAge: 600000,
  },
});

export const passportAuth = passport.initialize();
