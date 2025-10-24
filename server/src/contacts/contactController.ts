import express from "express";
import { getContacts } from "./services/contactService";
const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const contacts = await getContacts();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.get('/:id', (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    res.send(`Contact details for ID: ${id}`);
});

router.post('/', (req: express.Request, res: express.Response) => {
    const newContact = req.body;
    res.status(201).send(`New contact created: ${JSON.stringify(newContact)}`);
});

router.put('/:id', (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const updatedContact = req.body;
    res.send(`Contact with ID: ${id} updated to: ${JSON.stringify(updatedContact)}`);
});

router.delete('/:id', (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    res.send(`Contact with ID: ${id} deleted`);
});

export default router;
