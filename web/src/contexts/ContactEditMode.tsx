
import { createContext, useRef, useState, useCallback, useContext } from "react";

type SaveHandler = (() => boolean) | null;
type Ctx = {
    isEditing: boolean;
    setIsEditing: (v: boolean) => void;
    registerOnSave: (h: SaveHandler) => void;
    callOnSave: () => boolean;
};

export const ContactEditModeContext = createContext<Ctx | null>(null);

export const ContactEditModeProvider = ({ children }: { children: React.ReactNode }) => {
    const [isEditing, setIsEditing] = useState(false);
    const onSaveRef = useRef<SaveHandler>(null);

    const registerOnSave = useCallback((h: SaveHandler) => {
        onSaveRef.current = h;
    }, []);

    const callOnSave = useCallback(() => {
        return onSaveRef.current ? onSaveRef.current() : true;
    }, []);

    return (
        <ContactEditModeContext.Provider value={{ isEditing, setIsEditing, registerOnSave, callOnSave }}>
            {children}
        </ContactEditModeContext.Provider>
    );
};

export const useContactEditMode = () => {
    const context = useContext(ContactEditModeContext);
    if (!context) {
        throw new Error("useContactEditMode must be used within a ContactEditModeProvider");
    }
    return context;
};