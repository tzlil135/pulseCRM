import { Routes, Route } from "react-router-dom";
import AvailableEvents from "../Pages/AvailableEvents/AvailableEvents";
import ClosedEvents from "../Pages/ClosedEvents/ClosedEvents";
import AllEvents from "../Pages/AllEvents/AllEvents";
import Contacts from "../Pages/Contacts/Contacts";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AddEventForm from "../forms/AddEventForm/AddEventForm";
import AddContactForm from "../forms/AddContactForm/AddContactForm";

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<AvailableEvents />} />
                <Route path="/closed-events" element={<ClosedEvents />} />
                <Route path="/all-events" element={<AllEvents />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-event" element={<AddEventForm />} />
                <Route path="/add-contact" element={<AddContactForm />} />
            </Routes>
        </>
    )
}

export default AppRoutes;