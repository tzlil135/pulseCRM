import axios from 'axios';

const BASE = (import.meta as any).env?.VITE_API_URL ?? "http://localhost:9191";
console.log("[api] baseURL =", BASE);

export const api = axios.create({
    baseURL: BASE,
    timeout: 15000,
    headers: { "Content-Type": "application/json" },
});