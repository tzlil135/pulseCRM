import { useContext, createContext, useState } from "react";

type ContactsGlobalFilterContextProps = {
    currentValue: string;
    setCurrentValue: (value: string) => void;
    clearValue: () => void;
};

export const ContactsGlobalFilterContext = createContext<ContactsGlobalFilterContextProps | null>(null);

export const ContactsGlobalFilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentValue, setCurrentValue] = useState<string>("");

    const clearValue = () => setCurrentValue("");

    return (
        <ContactsGlobalFilterContext.Provider
            value={{ currentValue, setCurrentValue, clearValue }}
        >
            {children}
        </ContactsGlobalFilterContext.Provider>
    );
};

export const useContactsGlobalFilterContext = () => {
    const context = useContext(ContactsGlobalFilterContext);
    if (!context) {
        throw new Error("useContactsGlobalFilterContext must be used within a ContactsGlobalFilterProvider");
    }
    return context;
}

