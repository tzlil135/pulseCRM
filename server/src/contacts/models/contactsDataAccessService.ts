const db = process.env.DB || "DATABASE";

export const find = async () => {
    if (db === "DATABASE") {
        try {
            return Promise.resolve([]);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    return Promise.resolve("No DB selected");
};

export const findById = async (id: string) => {
    if (db === "DATABASE") {
        try {
            return Promise.resolve({ id, name: "John Doe" });
        } catch (error) {
            return Promise.reject(error);
        }
    }
    return Promise.resolve("No DB selected");
};

export const create = async (contact: any) => {
    if (db === "DATABASE") {
        try {
            return Promise.resolve({ id: "123", ...contact });
        } catch (error) {
            return Promise.reject(error);
        }
    }
    return Promise.resolve("No DB selected");
};

export const update = async (id: string, contact: any) => {
    if (db === "DATABASE") {
        try {
            return Promise.resolve({ id, ...contact });
        } catch (error) {
            return Promise.reject(error);
        }
    }
    return Promise.resolve("No DB selected");
};

export const remove = async (id: string) => {
    if (db === "DATABASE") {
        try {
            return Promise.resolve({ id });
        } catch (error) {
            return Promise.reject(error);
        }
    }
    return Promise.resolve("No DB selected");
};
