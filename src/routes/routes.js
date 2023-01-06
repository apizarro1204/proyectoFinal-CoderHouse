// Primero configurar las rutas para la visualización. Luego agregar session, mongo y passport. Y otros quizá.
import express from "express"
import path from 'path'

const router = express.Router();

router.get('/', (req, res) => { // cambiar a login
    res.sendFile(path.join(process.cwd(), '/views/partials/home.html'))
})

router.get('/register', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/views/partials/register.html'))
})

router.get('/login', (req,res)=>{
    const username = req.session?.username
    if (username) {
        res.redirect('/home')
    } else {
        res.sendFile(path.join(process.cwd(), '/views/partials/login.html'))
    }

})

router.get("/login-error", (req, res) =>{
    res.sendFile(path.join(process.cwd(), '/views/partials/login-error.html'))
})

router.get('/logout', (req, res) => {
    const username = req.session?.username
    if (username) {
        req.session.destroy(err => {
            if (!err) {
                res.render(path.join(process.cwd(), '/views/logout.ejs'), {username})
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
});


export default router;