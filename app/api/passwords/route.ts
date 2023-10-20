import { NextRequest, NextResponse } from "next/server";
import { getXataClient } from "@/src/xata";
import { decodeJwt } from "jose"

//* CREATE PASSWORD
//* POST ROUTE

export async function POST(req: NextRequest) {
    const xata = getXataClient();
    const token = req.cookies.get("token")?.value
    const { password, passwordFor } = await req.json();

    if (!token) return NextResponse.json({ message: "User not Authenticated!" }, { status: 401 });
    const user = decodeJwt(token);

    try {
        const createPassword = await xata.db.Passwords.create({
            owner: String(user._id),
            password, passwordFor
        });

        return NextResponse.json({
            message: "Successfully created your Password!",
            createPassword
        }, { status: 201 })

    } catch (err) {
        console.log(err);
        return NextResponse.json({
            message: err,
            success: false
        }, { status: 401 })
    };
};