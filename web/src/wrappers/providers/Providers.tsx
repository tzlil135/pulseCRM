import { FormSubmitContext } from "../../contexts/FormSubmitContext";
import { ContactsGlobalFilterProvider } from "../../contexts/ContactsGlobalFilter";
import { BackBtnProvider } from "../../contexts/BackBtn";
import { useRef, useState } from "react";
import type { PropsWithChildren } from "react";
import { ContactEditModeProvider } from "../../contexts/ContactEditMode";
import { EventsGlobalFilterProvider } from "../../contexts/EventsGlobalFilter";


const Providers = ({ children }: PropsWithChildren) => {

    const submitFormRef = useRef<(() => void) | null>(null);
    const resolveEventRef = useRef<(() => void) | null>(null);
    const createChildEventRef = useRef<(() => void) | null>(null);

    const [isEventReadOnly, setIsEventReadOnly] = useState(false);

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

    const setResolveEventFn = (fn: () => void) => {
        resolveEventRef.current = fn;
    };

    const resolveEventFn = () => {
        if (resolveEventRef.current) {
            console.log("Calling resolveEventRef.current");
            resolveEventRef.current();
        } else {
            console.log("resolveEventRef.current is null or undefined");
        }
    };

    const setCreateChildEventFn = (fn: () => void) => {
        createChildEventRef.current = fn;
    };

    const createChildEventFn = () => {
        createChildEventRef.current?.();
    };


    return <>
        <FormSubmitContext.Provider value={{ submitForm, setSubmitFormFn, resolveEventFn, setResolveEventFn, isEventReadOnly, setIsEventReadOnly, createChildEventFn, setCreateChildEventFn }}>
            <EventsGlobalFilterProvider>
                <ContactsGlobalFilterProvider>
                    <ContactEditModeProvider>
                        <BackBtnProvider>
                            {children}
                        </BackBtnProvider>
                    </ContactEditModeProvider>
                </ContactsGlobalFilterProvider>
            </EventsGlobalFilterProvider>
        </FormSubmitContext.Provider>
    </>;
}

export default Providers;