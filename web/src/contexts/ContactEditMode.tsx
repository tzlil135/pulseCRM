import { createContext, useRef, useState, useCallback, useContext } from "react";

export type SaveHandler = (() => boolean | Promise<boolean>) | null;

type Ctx = {
    isEditing: boolean;
    setIsEditing: (v: boolean) => void;
    registerOnSave: (h: SaveHandler) => void;
    callOnSave: () => Promise<boolean>;
};

export const ContactEditModeContext = createContext<Ctx | null>(null);

export const ContactEditModeProvider = ({ children }: { children: React.ReactNode }) => {
    const [isEditing, setIsEditing] = useState(false);
    const onSaveRef = useRef<SaveHandler>(null);

    const registerOnSave = useCallback((h: SaveHandler) => {
        onSaveRef.current = h;
    }, []);

    const callOnSave = useCallback(async (): Promise<boolean> => {
        const fn = onSaveRef.current;
        if (!fn) return true;
        try {
            const res = fn();
            return typeof (res as any)?.then === "function"
                ? !!(await (res as Promise<boolean>))
                : !!(res as boolean);
        } catch {
            return false;
        }
    }, []);

    return (
        <ContactEditModeContext.Provider
            value={{ isEditing, setIsEditing, registerOnSave, callOnSave }}
        >
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
