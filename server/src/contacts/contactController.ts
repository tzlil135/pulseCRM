import express from "express";
import { getContacts, getContactById, createContact, updateContact, deleteContact } from "./services/contactService";
const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const contacts = await getContacts();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.get('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const contact = await getContactById(id);
        res.json(contact);
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.post('/', async (req: express.Request, res: express.Response) => {
    try {
        const newContact = await createContact(req.body);
        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.put('/:id', async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const updatedContact = req.body;
    try {
        const contact = await updateContact(id, updatedContact);
        res.json(contact);
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.delete('/:id', async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    try {
        const deletedContact = await deleteContact(id);
        res.json(deletedContact);
    } catch (error) {
        res.status(500).json({ error });
    }
});

export default router;
