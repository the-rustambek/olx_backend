const Joi =  require("joi")

module.exports = {
    SignUpValidation: Joi.object({
        fullname : Joi.string().min(3).max(16).required(),
        email: Joi.string().email().required().toLowerCase(),
        password: Joi.string().min(8).required().pattern(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z]).{8}$/),
    }),
}


// ^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$