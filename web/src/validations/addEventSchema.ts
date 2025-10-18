import Joi from "joi";

export const addEventSchema = Joi.object({
    callerName: Joi.string().required().messages({
        'string.empty': 'Caller name is required',
        'any.required': 'Caller name is required'
    }),
    description: Joi.string().required().messages({
        'string.empty': 'Description is required',
        'any.required': 'Description is required'
    }),
    address: Joi.string().allow('').optional(),
    location: Joi.object({
        city: Joi.string().required().messages({
            'string.empty': 'City is required',
            'any.required': 'City is required'
        }),
        street: Joi.string().required().messages({
            'string.empty': 'Street is required',
            'any.required': 'Street is required'
        }),
        houseNumber: Joi.string().required().messages({
            'string.empty': 'House number is required',
            'any.required': 'House number is required'
        }),
    }).required(),
    subject: Joi.string().required().messages({
        'string.empty': 'Subject is required',
        'any.required': 'Subject is required'
    }),
    subSubject: Joi.string().allow('').optional(),
    assignedTeam: Joi.string().required().messages({
        'string.empty': 'Assigned team is required',
        'any.required': 'Assigned team is required'
    }),
    resolvation: Joi.string().allow('').optional(),
});