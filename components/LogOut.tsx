"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Hanko } from "@teamhanko/hanko-elements";
import { useAuthContext } from "@/context/user";
import axios from "axios";

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL;

export function LogoutBtn() {
    const router = useRouter();
    const [hanko, setHanko] = useState<Hanko>();
    const { setUser, setUserData } = useAuthContext();

    useEffect(() => {
        import("@teamhanko/hanko-elements").then(({ Hanko }) =>
            setHanko(new Hanko(hankoApi ?? ""))
        );
    }, []);

    const logout = async () => {
        try {

            const logOut = await axios.get("/api/auth/logout");

            await hanko?.user.logout();
            setUser(false);
            setUserData({
                id: "",
                email: ""
            })
            router.refresh();
            router.push("/login");
            return;
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return <button className="btn btn-error btn-outline btn-sm" onClick={logout}>Logout</button>;
}