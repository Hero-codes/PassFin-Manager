import axios from "axios";

export async function getExpense() {
    const result = await axios.get("/api/expenses")
        .then(res => res.data);

    return result;
};

export async function addExpense(expenseInfo: any) {
    const result = await axios.post("/api/expenses", expenseInfo)
        .then(res => res.data);

    return result;
};

export async function deleteExpense(id: string) {
    const result = axios.delete(`/api/expenses/${id}`)
        .then(res => res.data);

    return result;
}