import passport from '../config/passport.config.js'
import Product from '../DAOs/Product.dao.class.js';
import path from 'path'
import session from 'express-session'
import MongoStore from "connect-mongo";
import config from '../routes/connection.js'
import jwt from 'jsonwebtoken';

const products = new Product();

export const home = async (req, res) => {
    res.redirect("/login")
}

export const userLogged = async (req, res) => {
    const username = req.session?.passport.user;
    const element = await products.getAll()
    res.render(path.join(process.cwd(), './views/home.ejs'), {
        username, products: element, productsOk: element.length
    });
}

export const registeredUser = async (req, res) => {
    res.sendFile(path.join(process.cwd(), '/views/partials/register.html'))
}

export const loginSuccess = async (req, res) => {
    const username = req.session?.username
    if (username) {
        res.redirect('/home')
    } else {
        res.sendFile(path.join(process.cwd(), '/views/partials/login.html'))
    }
}

export const loginError = async (req, res) => {
    res.sendFile(path.join(process.cwd(), '/views/partials/login-error.html'))
}

export const logout = async (req, res) => {
    const username = req.session?.passport.user
    if (username) {
        req.session.destroy(err => {
            if (!err) {
                res.render(path.join(process.cwd(), '/views/logout.ejs'), { username })
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }

}

export const registerAuth = passport.authenticate("register", {
    successRedirect: "/login",
    failureRedirect: "/login-error",
    failureFlash: true,
})

// export const loginAuth = async (req, res, next) => { /passpot
//     passport.authenticate("login", async (err, user, info) => {
//         try {
//             if (err || user) {
//                 const error = new Error('new Error')
//                 return next(error)
//             }

//             req.login(user, { session: false }, async (err) => {
//                 if (err) return next(err)
//                 const body = { _id: user._id, email: user.email }
//                 const token = jwt.sign({ user: body }, process.env.JWT_PK)
//                 console.log(token)
//                 return res.json('/home')
//             })
//         } catch (error) {
//             return next(error)

//         }
//     })(req, res, next)
// }

export const loginAuth = passport.authenticate("login", {
    successRedirect: "/home",
    failureRedirect: "/login-error",
})


export const useSession = session({
    secret: "TOP SECRET",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: config.mongoRemote.cxnStr }),
    cookie: {
        maxAge: 600000,
    }
})

export const passportAuth = passport.initialize()


