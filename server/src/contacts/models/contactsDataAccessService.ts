import config from "config";

const db = (config.has("DB") ? config.get<string>("DB") : "MONGODB").toUpperCase();

import { IContact } from "../models/mongodb/Contact";
import Contact from "../models/mongodb/Contact";

interface ApiError extends Error {
    status?: number;
}

if (db !== "MONGODB") {
    throw new Error(`Unsupported DB type: ${db}`);
}

export const find = async () => {
    try {
        const contacts = await Contact.find();
        return contacts;
    } catch (error: any) {
        if (!error.status) {
            error.status = 500;
            error.message = error.message || "Server error";
        }
        throw error;
    }
};

export const findById = async (id: string) => {
    try {
        if (!id) {
            const err: ApiError = new Error("ID is required");
            err.status = 400;
            throw err;
        }

        const contact = await Contact.findById(id);

        if (!contact) {
            const err: ApiError = new Error("Contact not found");
            err.status = 404;
            throw err;
        }

        return contact;

    } catch (error: any) {
        if (!error.status && error.name === "CastError") {
            error.status = 400;
            error.message = "Invalid contact id format";
        }

        if (!error.status) {
            error.status = 500;
            error.message = error.message || "Server error";
        }

        throw error;
    }
};

export const create = async (contact: IContact) => {
    try {
        const data = { ...contact };
        let newContact = new Contact(data);
        newContact = await newContact.save();
        return newContact;
    } catch (error: any) {
        error.status = 400;
        throw error;
    }
};

export const update = async (id: string, contact: IContact) => {
    try {
        if (!id) {
            const err: ApiError = new Error("ID is required");
            err.status = 400;
            throw err;
        }

        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            contact,
            {
                new: true,
                runValidators: true
            }

        );

        if (!updatedContact) {
            const err: ApiError = new Error("Contact not found");
            err.status = 404;
            throw err;
        }

        return updatedContact;

    } catch (error: any) {
        if (!error.status && error.name === "CastError") {
            error.status = 400;
            error.message = "Invalid contact id format";
        }

        if (!error.status && error.name === "ValidationError") {
            error.status = 400;
        }

        throw error;
    }
};

export const remove = async (id: string) => {
    try {
        if (!id) {
            const err: ApiError = new Error("ID is required");
            err.status = 400;
            throw err;
        }
        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            const err: ApiError = new Error("Contact not found");
            err.status = 404;
            throw err;
        }

        return {
            message: "Contact deleted successfully",
            contact: deletedContact,
        };

    } catch (error: any) {
        if (!error.status) {
            error.status = 500;
            error.message = error.message || "Server error";
        }
        throw error;
    }
};
