import mongoose from "mongoose";
import { Name } from "./Name";
import { Address } from "./Address";
import {
    EMAIL_REQUIRED,
    PHONE_REQUIRED,
    PHONE_OPTIONAL,
    LONG_TEXT_OPTIONAL,
    SHORT_TEXT_OPTIONAL,
} from "../../helpers/mongooseValidators";

export interface IContact extends mongoose.Document {
    name: {
        firstName: string;
        middleName?: string;
        lastName: string;
    };
    email: string;
    phone: string;
    officePhone?: string;
    address: {
        street: string;
        city: string;
        houseNumber: string;
    };
    company?: string;
    position?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
    _id: mongoose.Types.ObjectId;
}

export const ContactSchema = new mongoose.Schema<IContact>({
    name: {
        type: Name,
        required: true,
    },
    email: EMAIL_REQUIRED,
    phone: PHONE_REQUIRED,
    officePhone: PHONE_OPTIONAL,
    address: {
        type: Address,
        required: true,
    },
    company: SHORT_TEXT_OPTIONAL,
    position: SHORT_TEXT_OPTIONAL,
    notes: LONG_TEXT_OPTIONAL,
}, { timestamps: true }
);

const Contact = mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;