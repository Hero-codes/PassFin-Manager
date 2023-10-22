import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    if (!token) {
        return NextResponse.json({
            message: "Unauthorized! Login needed",
            success: false
        }, { status: 401 })
    }

    try {
        const verifyToken = await jwtVerify(token, secret);
        if (verifyToken) return NextResponse.next();

    } catch (err) {
        console.log(err);
        return NextResponse.json({
            message: "Middleware error",
            err
        })
    }
};

export const config = {
    matcher: [
        "/expenses",
        "/passwords",
        "/passwords/:path*",
        "/expenses/:path*",
    ]
};