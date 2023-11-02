import axios from "axios";

export async function getPasswords() {
    const result = await fetch("/api/passwords", { cache: "no-store" });
    if (!result.ok) {
        throw new Error('Failed to fetch data')
    }

    return result.json();
};

export async function addPassword(passwordInfo: any) {
    const result = axios.post("/api/passwords/", passwordInfo)
        .then(res => res.data);
    return result;
}

export async function deletePassword(id: string) {
    const result = axios.delete(`/api/passwords/${id}`)
        .then(res => res.data)
    return result;
};