import mongoose from 'mongoose';
import { SHORT_TEXT_REQUIRED, HOUSE_NUMBER_REQUIRED } from '../../helpers/mongooseValidators';

export const Address = new mongoose.Schema(
    {
        street: SHORT_TEXT_REQUIRED,
        city: SHORT_TEXT_REQUIRED,
        houseNumber: HOUSE_NUMBER_REQUIRED,
    },
    { _id: false }
);
