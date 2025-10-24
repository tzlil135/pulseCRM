import express from "express";
const router = express.Router();
import contactController from "../contacts/contactController";

router.use('/contacts', contactController);

export default router;
