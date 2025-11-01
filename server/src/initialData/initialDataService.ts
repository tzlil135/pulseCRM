import contactsData from "./initialDataContacts.json";
import { create } from "../contacts/models/contactsDataAccessService";
import { ContactInput } from "../types/contact";
import chalk from "chalk";

export const generateInitialContacts = async () => {
    const contacts: ContactInput[] = contactsData;
    contacts.forEach(async (contact) => {
        try {
            await create(contact);
            console.log(chalk.greenBright(`Created contact: ${contact.name.firstName} ${contact.name.lastName}`));
            return;
        } catch (error) {
            return console.error(chalk.redBright("Error creating contact:", error));
        }
    });
};