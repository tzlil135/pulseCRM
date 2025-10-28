import Joi from "joi";

export const contactTableEditSchema = Joi.object({
    name: Joi.object({
        firstName: Joi.string()
            .trim()
            .min(2)
            .max(30)
            .pattern(/^[A-Za-z\u0590-\u05FF\s'-]+$/)
            .required()
            .messages({
                "string.empty": "First name is required",
                "any.required": "First name is required",
                "string.min": "First name must be at least 2 characters",
                "string.max": "First name must be at most 30 characters",
                "string.pattern.base": "First name may only contain letters and spaces",
            }),

        middleName: Joi.string()
            .trim()
            .allow("")
            .max(30)
            .pattern(/^[A-Za-z\u0590-\u05FF\s'-]*$/)
            .optional()
            .messages({
                "string.max": "Middle name must be at most 30 characters",
            }),

        lastName: Joi.string()
            .trim()
            .min(2)
            .max(30)
            .pattern(/^[A-Za-z\u0590-\u05FF\s'-]+$/)
            .required()
            .messages({
                "string.empty": "Last name is required",
                "any.required": "Last name is required",
                "string.min": "Last name must be at least 2 characters",
                "string.max": "Last name must be at most 30 characters",
                "string.pattern.base": "Last name may only contain letters and spaces",
            }),
    }).required(),
    address: Joi.object({
        street: Joi.string()
            .trim()
            .min(2)
            .max(50)
            .required()
            .messages({
                "string.empty": "Street is required",
                "any.required": "Street is required",
            }),
        city: Joi.string()
            .trim()
            .min(2)
            .max(50)
            .required()
            .messages({
                "string.empty": "City is required",
                "any.required": "City is required",
            }),
        houseNumber: Joi.string()
            .trim()
            .required()
            .messages({
                "string.empty": "House number is required",
                "any.required": "House number is required",
            }),
    }).required(),
    phone: Joi.string()
        .trim()
        .pattern(/^[0-9]{9,15}$/)
        .required()
        .messages({
            "string.empty": "Phone number is required",
            "any.required": "Phone number is required",
            "string.pattern.base": "Phone number must contain only digits (9–15)",
        }),
    email: Joi.string()
        .trim()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.empty": "Email is required",
            "any.required": "Email is required",
            "string.email": "Email must be valid",
        }),
    company: Joi.string().trim().max(50).allow("").optional(),
});
