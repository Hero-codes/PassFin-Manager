import { NextRequest, NextResponse } from "next/server";
import { getXataClient } from "@/src/xata";

type Params = {
    params: {
        passwordId: string
    }
};

//* DELETE PASSWORD
//* DELETE ROUTE

export async function DELETE(req: NextRequest, { params }: Params) {
    try {
        const xata = getXataClient();
        const token = req.cookies.get("token")?.value;
        const { passwordId } = params;

        if (!token) return NextResponse.json({ message: "User not Authenticated!" }, { status: 401 });

        const deletedTask = await xata.db.Passwords.delete(passwordId);

        if (!deletedTask) return NextResponse.json({
            message: "Can't find the password!"
        }, { status: 404 });

        return NextResponse.json({
            message: "Successfully deleted your password!",
            deletedTask
        }, { status: 201 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({
            message: err
        }, { status: 401 });
    };
};