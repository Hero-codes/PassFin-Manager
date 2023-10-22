import { NextResponse } from "next/server"

export function GET() {
    const response = NextResponse.json({
        success: true,
        message: "Successfull Logout!"
    }, { status: 201 });

    response.cookies.set("token", "");

    return response;
};
