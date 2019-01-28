const Joi = require('joi');

module.exports = {
    validateParam: (schema, name) => {
        return (req, res, next) => {
            let result = Joi.validate({ param: req['params'][name] }, schema);
            if(result.error){
                return res.status(400).json(result.error);
            } else {
                if(!req.value){
                    req.value = {};
                }
                if(!req.value.params){
                    req.value.params = {};
                }
                // Set new filtered parameter values into object ie req.value.params
                req.value.params[name] = result.value.param;
                next();
            }
        }
    },
    validateBody: (schema) => {
        return (req, res, next) => {
            let result = Joi.validate(req.body, schema, { escapeHtml: false });            
            if(result.error){
                return res.status(400).json(result.error);
            } else {
                if(!req.value) {
                    req.value = {};
                }
                if(!req.value.body) {
                    req.value.body = {};
                }
                // Set new filtered parameter values into object ie req.value.body
                req.value.body = result.value;
                next();
            }
        }
    },
    schemas: {
        idSchema: Joi.object().keys({
            param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().label("Not valid id.")
        }),
        authSchema: Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required()
        }),
        userSchema: Joi.object().keys({
            name: Joi.string().required(),            
            email: Joi.string().required(),
            phone: Joi.string().required(),
            password: Joi.string().required()
        })
    }
}