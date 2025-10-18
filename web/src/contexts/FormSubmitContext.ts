import { useContext, createContext } from "react";

type FormSubmitContextProps = {
    submitForm: () => void;
    setSubmitFormFn: (fn: () => void) => void;
}

export const FormSubmitContext = createContext<FormSubmitContextProps | undefined>(undefined);

export const useFormSubmitContext = () => {
    const context = useContext(FormSubmitContext);
    if (!context) {
        throw new Error("useFormSubmitContext must be used within a FormSubmitProvider");
    }
    return context;
}