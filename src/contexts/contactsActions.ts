import { createContext, useContext } from "react";

type ContactsActions = {
    refresh: () => void;
    exportExcel: () => void;
};

export const ContactsActionsContext = createContext<ContactsActions | undefined>(undefined);

export const useContactsActions = () => {
    const context = useContext(ContactsActionsContext);
    if (!context) {
        throw new Error("useContactsActions must be used within a ContactsActionsProvider");
    }
    return context;
};