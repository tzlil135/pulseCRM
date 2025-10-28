import { addContactSchema } from "./Joi/newContactValidation";

const validateNewContact = (contactData: any) => {
    return addContactSchema.validate(contactData);
};

export default validateNewContact;



