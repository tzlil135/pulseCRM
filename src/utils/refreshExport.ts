import type { ContactTableType } from "../types/client";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const handleRefresh = () => {
    window.location.reload();
};

const exportContactsToExcel = (contacts: ContactTableType[]) => {
    if (!contacts || contacts.length === 0) {
        alert("אין נתונים לייצוא");
        return;
    }

    const data = contacts.map(contact => ({
        "First Name": contact.name.firstName,
        "Middle Name": contact.name.middleName ?? "",
        "Last Name": contact.name.lastName ?? "",
        "Street": contact.address.street,
        "City": contact.address.city,
        "House Number": contact.address.houseNumber,
        "Email": contact.email,
        "Phone": contact.phone,
        "Company": contact.company,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    const fileName = `contacts_${new Date().toISOString().slice(0, 10)}.xlsx`;
    saveAs(blob, fileName);
};

export const handleExport = (contacts: ContactTableType[]) => {
    exportContactsToExcel(contacts);
};
