import express from "express"
import session from "express-session";
import path from 'path'
import MongoStore from "connect-mongo";
import { fork } from "child_process";
import config from './connection.js'
import {webAuth} from '../auth/index.js'
import Container from '../../DAOs/Product.dao.class.js'// Verificar si sirve o no
import passport from '../config/passport.config.js'
import upload from '../controllers/multer.controller.js'



const router = express.Router();
const products = new Container();

router.use(passport.initialize());

router.use(session({
    secret: "TOP SECRET",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: config.mongoRemote.cxnStr }),
    cookie: {
        maxAge: 600000,
    }
}));



// GET

router.get("/", (req, res) => {
    res.redirect("/login");
});

router.get("/home", async (req, res) => {
    const username = req.session?.passport.user;
    const prods = await products.getAll()
    console.log(req.session);
    console.log(prods);

    res.render(path.join(process.cwd(), "/views/home.ejs"), { username, productos: prods, hayProducts: prods.length });
});

router.get('/register',(req, res) => {
    res.sendFile(path.join(process.cwd(), '/views/partials/register.html'))
})

router.get('/login', (req, res) => {
    const username = req.session?.username
    if (username) {
        res.redirect('/home')
    } else {
        res.sendFile(path.join(process.cwd(), '/views/partials/login.html'))
    }

})

router.get("/login-error", (req, res) => {
    res.sendFile(path.join(process.cwd(), '/views/partials/login-error.html'))
})

router.get('/logout', (req, res) => {
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
});

// POST

router.post("/home", (req, res) => {
    const product = req.body;
    products.put(product);
    res.redirect("/home");
});

router.post(
    "/register",
    passport.authenticate("register", {
        successRedirect: "/login",
        failureRedirect: "/login-error",
        failureFlash: true,
    })
);

router.post(
    "/login",
    passport.authenticate("login", {
        successRedirect: "/home",
        failureRedirect: "/login-error",
    }),
    function (req, res) {
        res.render("home", { username: req.body.username });
    }
);

router.post("/", (req, res) => {
	const producto = req.body;
	products.save(producto);
    res.json(producto);
});


export default router;