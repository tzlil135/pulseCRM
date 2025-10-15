import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";

type BackBtnProps = {
    lastListURL: string | null;
    setLastListURL: (url: string | null) => void;
};

const BackBtnContext = createContext<BackBtnProps | null>(null);

const BackBtnProvider = ({ children }: PropsWithChildren) => {
    const [lastListURL, setLastListURL] = useState<string | null>(null);
    return <BackBtnContext.Provider value={{ lastListURL, setLastListURL }}>
        {children}
    </BackBtnContext.Provider>;
}

const useBackBtn = () => {
    const context = useContext(BackBtnContext);
    if (!context) {
        throw new Error("useBackBtn must be used within a BackBtnProvider");
    }
    return context;
};

export { BackBtnProvider, useBackBtn };
