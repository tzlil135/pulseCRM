import Joi from "joi";

export const resolveEventSchema = Joi.object({
    resolvation: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            'string.empty': 'Resolution note is required',
            'any.required': 'Resolution note is required',
            'string.min': 'Resolution note must contain at least 1 character',
        }),
});