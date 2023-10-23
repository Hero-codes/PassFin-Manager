import { NextResponse } from "next/server";
import { getXataClient } from "@/src/xata";

export async function POST(req: Request) {

    const xata = getXataClient();
    const { email } = await req.json();

    try {
        const registeredUser = await xata.db.Users.filter({ email }).getFirst();
        if (registeredUser) return NextResponse.json({ message: "User Already Registered!" }, { status: 401 });

        const registerUser = await xata.db.Users.create({ email });

        return NextResponse.json({
            message: "Created User Successfully!",
            registerUser
        }, { status: 201 });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            message: error
        }, { status: 400 });
    };
};