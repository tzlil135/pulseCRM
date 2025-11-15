import { useContext, createContext, useState } from "react";

type EventsGlobalFilterContextProps = {
    currentValue: string;
    setCurrentValue: (value: string) => void;
    clearValue: () => void;
};

export const EventsGlobalFilterContext = createContext<EventsGlobalFilterContextProps | null>(null);

export const EventsGlobalFilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentValue, setCurrentValue] = useState<string>("");

    const clearValue = () => setCurrentValue("");

    return (
        <EventsGlobalFilterContext.Provider
            value={{ currentValue, setCurrentValue, clearValue }}
        >
            {children}
        </EventsGlobalFilterContext.Provider>
    );
};

export const useEventsGlobalFilterContext = () => {
    const context = useContext(EventsGlobalFilterContext);
    if (!context) {
        throw new Error("useEventsGlobalFilterContext must be used within a EventsGlobalFilterProvider");
    }
    return context;
}
