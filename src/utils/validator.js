const validator = (req, res, next) =>{
    const password = req.body.password;
    const confirmPassword = req.body.repeatPassword;

    if (password !== confirmPassword){
        res.render('../src/views/pages/failRegister.ejs')
    } else {
        next()
    }
}

module.exports = {
    validator
}