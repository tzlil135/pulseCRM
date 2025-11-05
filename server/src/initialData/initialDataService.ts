import contactsData from "./initialDataContacts.json";
import { create } from "../contacts/models/contactsDataAccessService";
import { ContactInput } from "../types/contact";
import chalk from "chalk";
import Contact from "../contacts/models/mongodb/Contact";

export const generateInitialContacts = async () => {
    const count = await Contact.countDocuments();
    if (count > 0) {
        console.log(chalk.yellow(`Contacts collection is not empty. Skipping initial data generation. (${count} existing contacts found)`));
        return;
    }

    const contacts: ContactInput[] = contactsData;
    for (const contact of contacts) {
        try {
            await create(contact);
            console.log(chalk.green(`Inserted contact: ${contact.name.firstName} ${contact.name.lastName}`));
        } catch (error: any) {
            console.error(chalk.red(`Failed to insert contact: ${contact.name.firstName} ${contact.name.lastName}. Error: ${error.message}`));
        }
    }
};