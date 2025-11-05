import type { NewClientType, ClientType } from "../types/client";
import { api } from "./api";

export const getContacts = async (): Promise<ClientType[]> => {
    const res = await api.get<ClientType[]>("/contacts");
    return res.data;
};

export const addContact = async (contact: NewClientType): Promise<ClientType> => {
    const res = await api.post<ClientType>("/contacts", contact);
    return res.data;
};

export const deleteContact = async (id: string): Promise<{ message: string; id: string }> => {
    const res = await api.delete(`/contacts/${id}`);
    return res.data;
};

export const deleteAllContacts = async (): Promise<{ deletedCount: number }> => {
    const res = await api.delete("/contacts", { params: { confirm: true } });
    return res.data;
};

export const getContactById = async (id: string): Promise<ClientType> => {
    const res = await api.get<ClientType>(`/contacts/${id}`);
    return res.data;
};


type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

export type ContactPut = DeepPartial<Omit<ClientType, "_id">>;

export const updateContact = async (id: string, put: ContactPut): Promise<ClientType> => {
    const res = await api.put<ClientType>(`/contacts/${id}`, put);
    return res.data;
};


