import { NextRequest, NextResponse } from "next/server";
import { getXataClient } from "@/src/xata";
import { decodeJwt } from "jose"

//* @GET EXPENSES OF A SINGLE USER
//* @GET ROUTE

export async function GET(req: NextRequest) {
    const xata = getXataClient();
    const token = req.cookies.get("token")?.value

    if (!token) return NextResponse.json({ message: "User not Authenticated!" }, { status: 401 });
    const user = decodeJwt(token);

    try {
        const getUserSpecificExpenses = await xata.db.Expenses.filter({
            "owner.id": String(user._id)
        }).getAll();

        return NextResponse.json({
            getUserSpecificExpenses
        }, { status: 201 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({
            message: err,
            success: false
        }, { status: 401 })
    };
}

//* @CREATE EXPENSE
//* @POST ROUTE

export async function POST(req: NextRequest) {
    const xata = getXataClient();
    const token = req.cookies.get("token")?.value
    const { details } = await req.json();

    if (!token) return NextResponse.json({ message: "User not Authenticated!" }, { status: 401 });
    const user = decodeJwt(token);

    try {
        const createExpense = await xata.db.Expenses.create({
            owner: String(user._id),
            details: {
                title: details.title,
                description: details.description,
                amount: details.amount,
                expense_type: details.expense_type
            }
        });

        return NextResponse.json({
            message: "Successfully created your Expense!",
            createExpense
        }, { status: 201 })

    } catch (err) {
        console.log(err);
        return NextResponse.json({
            message: err,
            success: false
        }, { status: 401 })
    };
};