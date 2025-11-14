import Joi from "joi";

export const eventTableEditSchema = Joi.object({
    eventNumber: Joi.forbidden(),

    callerName: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .pattern(/^[A-Za-z\u0590-\u05FF\s'-]+$/)
        .required()
        .messages({
            "string.empty": "Caller name is required",
            "any.required": "Caller name is required",
            "string.min": "Caller name must be at least 2 characters",
            "string.max": "Caller name must be at most 50 characters",
            "string.pattern.base": "Caller name may only contain letters and spaces",
        }),

    description: Joi.string()
        .trim()
        .min(2)
        .max(500)
        .required()
        .messages({
            "string.empty": "Description is required",
            "any.required": "Description is required",
            "string.min": "Description must be at least 2 characters",
            "string.max": "Description must be at most 500 characters",
        }),

    assignedTeam: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
            "string.empty": "Assigned team is required",
            "any.required": "Assigned team is required",
            "string.min": "Assigned team must be at least 2 characters",
            "string.max": "Assigned team must be at most 50 characters",
        }),

    location: Joi.object({
        city: Joi.string()
            .trim()
            .min(2)
            .max(50)
            .required()
            .messages({
                "string.empty": "City is required",
                "any.required": "City is required",
                "string.min": "City must be at least 2 characters",
                "string.max": "City must be at most 50 characters",
            }),
        street: Joi.string()
            .trim()
            .min(2)
            .max(50)
            .required()
            .messages({
                "string.empty": "Street is required",
                "any.required": "Street is required",
                "string.min": "Street must be at least 2 characters",
                "string.max": "Street must be at most 50 characters",
            }),
        houseNumber: Joi.string()
            .trim()
            .max(10)
            .required()
            .messages({
                "string.empty": "House number is required",
                "any.required": "House number is required",
                "string.max": "House number must be at most 10 characters",
            }),
    }).required(),
});
