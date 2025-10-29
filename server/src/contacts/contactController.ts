import express from "express";
import { getContacts, getContactById, createContact, updateContact, deleteContact } from "./services/contactService";
import chalk from "chalk";
const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const contacts = await getContacts();
        res.status(200).send(contacts);
        console.log(chalk.green(`Fetched ${contacts.length} contacts`));
    } catch (error: any) {
        console.error(chalk.red(`Error fetching contacts: ${error.message}`));
        next(error);
    }
});

router.get('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const contact = await getContactById(id);
        res.status(200).json(contact);
        console.log(chalk.green(`Fetched contact with ID: ${id}`));
    } catch (error: any) {
        next(error);
    }
});

router.post('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const newContact = await createContact(req.body || {});
        res.status(201).send({ message: "Contact created", contact: newContact });
        console.log(chalk.green(`Created new contact`));
    } catch (error: any) {
        next(error);
    }
});

router.put('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { id } = req.params;
    try {
        const updated = await updateContact(id, req.body);
        res.status(200).send({ message: "Contact updated", contact: updated });
        console.log(chalk.green(`Updated contact with ID: ${id}`));
    } catch (error: any) {
        next(error);
    }
});

router.delete('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { id } = req.params;
    try {
        const deletedContact = await deleteContact(id);
        res.status(200).send({ message: "Contact deleted", contact: deletedContact });
        console.log(chalk.green(`Deleted contact with ID: ${id}`));
    } catch (error: any) {
        next(error);
    }
});

export default router;
