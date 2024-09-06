const Joi = require("joi");

const validator = schema => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    var message = "";
    for (let key in error.details) {
      var detail = error.details[key];
      message += detail.message + "\n";
    }
    return res.status(400).json({
      message: message
    });
  }
  next();
};

const UserSchema = Joi.object({
    Name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
    admin: Joi.number().required()
  });
  
  const UpdateUserSchema = Joi.object({
    Name: Joi.string().required(),
    email: Joi.string().required()
  });
  const newPasswordSchema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).required(),
    RePassword: Joi.string()
      .required()
      .valid(Joi.ref("newPassword"))
      .messages({ "any.only": "Passwords do not match" })
  });

  module.exports = {
    validateUser: validator(UserSchema),
    validatePasswordUpdate: validator(newPasswordSchema),
    validUserInfoUpdate: validator(UpdateUserSchema)
  };