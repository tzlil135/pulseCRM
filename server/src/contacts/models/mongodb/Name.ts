import mongoose from "mongoose";
import { NAME_TEXT_REQUIRED, NAME_TEXT_OPTIONAL } from "../../helpers/mongooseValidators";

export const Name = new mongoose.Schema(
    {
        firstName: NAME_TEXT_REQUIRED,
        middleName: NAME_TEXT_OPTIONAL,
        lastName: NAME_TEXT_REQUIRED,
    },
    { _id: false }
);