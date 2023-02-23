import express from "express"
import * as UserControl from '../controllers/user.controller.js'

const router = express.Router();

router.use(UserControl.passportAuth);

router.use(UserControl.useSession);


router.get("/", UserControl.home)

router.get("/home", UserControl.userLogged)//ok

router.get('/register', UserControl.registeredUser)

router.get('/login', UserControl.loginSuccess)

router.get("/login-error", UserControl.loginError)

router.get('/logout', UserControl.logout)

router.post('/register', UserControl.registerAuth)

router.post( '/login', UserControl.loginAuth)


export default router;