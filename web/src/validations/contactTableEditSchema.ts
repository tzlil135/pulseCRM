import Joi from "joi";

export const contactTableEditSchema = Joi.object({
    name: Joi.object({
        firstName: Joi.string().required().messages({
            'string.empty': 'First name is required',
            'any.required': 'First name is required'
        }),
        middleName: Joi.string().allow('').optional(),
        lastName: Joi.string().required().messages({
            'string.empty': 'Last name is required',
            'any.required': 'Last name is required'
        })
    }).required(),
    address: Joi.object({
        street: Joi.string().required().messages({
            'string.empty': 'Street is required',
            'any.required': 'Street is required'
        }),
        city: Joi.string().required().messages({
            'string.empty': 'City is required',
            'any.required': 'City is required'
        }),
        houseNumber: Joi.string().required().messages({
            'string.empty': 'House number is required',
            'any.required': 'House number is required'
        })
    }).required(),
    phone: Joi.string().required().messages({
        'string.empty': 'Phone number is required',
        'any.required': 'Phone number is required'
    }),
    email: Joi.string().required().email({ tlds: { allow: false } }).messages({
        'string.email': 'Email must be a valid email address',
        'string.empty': 'Email is required',
        'any.required': 'Email is required'
    }),
    company: Joi.string().allow('').optional()
});
