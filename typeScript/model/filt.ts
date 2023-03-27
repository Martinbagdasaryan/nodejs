// import Joi from "joi";

// const validator = (schema: Joi.ObjectSchema<string>) => (payload: string) =>
//   schema.validate(payload, { abortEarly: false });

// const schema = Joi.object().keys({
//   email: Joi.string().email().required(),
//   password: Joi.string().regex(
//     /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? ]).*$/
//   ),
// });

// const validateUser = validator(schema)

// export default  validateUser;
