export function webAuth(req, res, next) {
    if (req.session?.passport.user) {
        next()
    } else {
        res.redirect('/login')
    }
}

export function apiAuth(req, res, next) {
    if (req.session?.username) {
        next()
    } else {
        res.status(401).json({ error: 'An error ocurred' })
    }
}

export function verifyPass(){

    pass1 = document.getElementById('password');
    pass2 = document.getElementById('password2');

    if(pass1.value != pass2.value){
        document.getElementById('error').classList.add('show')

        return false;
    }else{
        
        document.getElementById('error').classList.remove('show');
        document.getElementById('ok').classList.remove('hidden');
        document.getElementById('login').disable = true;


        return true;
    }
}