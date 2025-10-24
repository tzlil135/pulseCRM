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


