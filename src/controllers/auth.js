const getLogin = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/productos')
    } else {
        res.render(`../src/views/pages/login.ejs`)
    }
}

const failLogin = (req, res) => {
    res.render('../src/views/pages/failLogin.ejs');
}

const logOut = (req, res) => {
    const email = req.user.email;
    req.session.destroy(err => {
        if (!err) {
            res.render('../src/views/pages/logOut.ejs', { email });
        } else {
            res.redirect('../src/views/pages/login.ejs');
        }
    });
}

const getRegister = (req, res) => {
    res.render('../src/views/pages/register.ejs');
}

const failRegister = (req, res) => {
    res.render('../src/views/pages/failRegister.ejs');
}

const redirectLogin = (req, res) => {
    res.redirect('/')
}

module.exports = {
    getLogin,
    failLogin,
    logOut,
    getRegister,
    failRegister,
    redirectLogin
}