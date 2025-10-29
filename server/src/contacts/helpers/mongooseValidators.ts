export const NAME_TEXT_REQUIRED = {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
    match: /^[A-Za-z\u0590-\u05FF\s'-]+$/,
};

export const NAME_TEXT_OPTIONAL = {
    type: String,
    required: false,
    trim: true,
    minlength: 0,
    maxlength: 30,
    match: /^[A-Za-z\u0590-\u05FF\s'-]*$/,
    default: '',
};

export const SHORT_TEXT_REQUIRED = {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
};

export const SHORT_TEXT_OPTIONAL = {
    type: String,
    required: false,
    trim: true,
    minlength: 0,
    maxlength: 50,
    default: '',
};

export const LONG_TEXT_OPTIONAL = {
    type: String,
    required: false,
    trim: true,
    minlength: 0,
    maxlength: 500,
    default: '',
};

export const EMAIL_REQUIRED = {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
};

export const PHONE_REQUIRED = {
    type: String,
    required: true,
    trim: true,
    match: /^[0-9]{9,15}$/,
};

export const PHONE_OPTIONAL = {
    type: String,
    required: false,
    trim: true,
    match: /^[0-9]{9,15}$/,
    default: '',
};

export const HOUSE_NUMBER_REQUIRED = {
    type: String,
    required: true,
    trim: true,
};