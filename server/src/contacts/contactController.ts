import express from "express";
import { getContacts, getContactById, createContact, updateContact, deleteContact } from "./services/contactService";
const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const contacts = await getContacts();
        res.json(contacts);
    } catch (error: any) {
        console.error("GET /contacts failed:", error);
        res.status(500).json({
            message: "Server error",
            details: error.message || "Unknown error",
        });
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
        return res.status(201).json({
            message: "Contact created",
            contact: newContact,
        });
    } catch (error: any) {
        if (error.status === 400 && error.messages) {
            return res.status(400).json({
                message: "Validation failed",
                details: error.messages,
            });
        }
        console.error(`POST /contacts failed:`, error);
        res.status(500).json({
            message: "Server error",
            details: error.message || "Unknown error",
        });
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
