import { NextResponse } from "next/server";
import { getXataClient } from "@/src/xata";
import { SignJWT } from 'jose'

export async function POST(req: Request) {

    const xata = getXataClient();
    const { email } = await req.json();

    try {
        const registeredUser = await xata.db.Users.filter({ email }).getFirst();
        if (registeredUser) return NextResponse.json({ message: "User Already Registered!" }, { status: 401 });

        const registerUser = await xata.db.Users.create({ email });

        const token = await new SignJWT({ _id: registeredUser!.id })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("2h")
            .sign(new TextEncoder().encode(process.env.JWT_SECRET));

        const response = NextResponse.json({
            message: "Created User Successfully!",
        }, { status: 201 });

        response.cookies.set("token", token);
        return response;

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            message: error
        }, { status: 400 });
    };
};