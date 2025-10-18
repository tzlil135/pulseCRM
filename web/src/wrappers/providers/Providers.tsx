import { FormSubmitContext } from "../../contexts/FormSubmitContext";
import { ContactsGlobalFilterProvider } from "../../contexts/ContactsGlobalFilter";
import { BackBtnProvider } from "../../contexts/BackBtn";
import { useRef } from "react";
import type { PropsWithChildren } from "react";
import { ContactEditModeProvider } from "../../contexts/ContactEditMode";


const Providers = ({ children }: PropsWithChildren) => {
    const submitFormRef = useRef<(() => void) | null>(null);

    const setSubmitFormFn = (fn: () => void) => {
        submitFormRef.current = fn;
    };

    const submitForm = () => {
        if (submitFormRef.current) {
            console.log("Calling submitFormRef.current");
            submitFormRef.current();
        } else {
            console.log("submitFormRef.current is null or undefined");
        }
    };
    return <>
        <FormSubmitContext.Provider value={{ submitForm, setSubmitFormFn }}>
            <ContactsGlobalFilterProvider>
                <ContactEditModeProvider>
                    <BackBtnProvider>
                        {children}
                    </BackBtnProvider>
                </ContactEditModeProvider>
            </ContactsGlobalFilterProvider>
        </FormSubmitContext.Provider>
    </>;
}

export default Providers;