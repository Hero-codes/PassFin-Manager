"use client";
import Link from "next/link";
import Image from "next/image";
import { Hanko } from "@teamhanko/hanko-frontend-sdk";
import { FcGoogle, FcKey } from "react-icons/fc"
import { useEffect, useState } from "react";
import authImg from "@/public/images/auth.png"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/user";

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL;

export default function Login() {

    const [hanko, setHanko] = useState<Hanko>();
    const [email, setEmail] = useState<string>("");
    const { push } = useRouter();
    const { setUser, setUserData } = useAuthContext();

    const signInWithGoogle = async () => {

        const hankoMail = new Hanko(hankoApi!);
        const { email } = await hankoMail.user.getCurrent();

        try {
            await hanko?.thirdParty.auth("google", "http://localhost:3000/");
            const { data } = await axios.post("/api/auth/login", {
                email
            });
            setUser(true);
            push("/");
        } catch (err) {
            console.log(err);
        };
    };

    const signInWithEmail = async () => {
        try {
            const { data } = await axios.post("/api/auth/login", {
                email
            });
            setUser(true);
            setUserData({
                id: data.registerUser.id,
                email: data.registerUser.email
            });
            push("/");
        } catch (err) {
            console.log(err);
        };
    };

    useEffect(() => {
        import("@teamhanko/hanko-frontend-sdk").then(({ Hanko }) => {
            setHanko(new Hanko(hankoApi!));
        });
    }, []);

    return (
        <section className="container mx-auto px-3">

            <div className="text-sm breadcrumbs mt-10">
                <ul>
                    <li>
                        <Link href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/login">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                            Login
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="mt-5 flex justify-center md:justify-start">
                {/* LOGO */}
                <span className="font-semibold text-2xl">Log In To Your Account</span>
            </div>

            <div className="flex flex-col lg:flex-row justify-center items-center">

                <Image src={authImg} alt="" />

                <div className="md:px-7 px-3 py-12 w-full lg:w-1/2 flex flex-col space-y-7">
                    <input
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Type Your Email..."
                        type="email"
                        className="px-4 py-3 rounded-lg focus:outline-none bg-slate-700/50" />

                    <button
                        onClick={signInWithEmail}
                        className="py-4 rounded-md font-semibold bg-slate-700/30 hover:bg-slate-800/25 active:bg-slate-900">Log In</button>
                    <div className="divider">Or Sign In With</div>

                    <div className="flex justify-evenly gap-4">
                        <button onClick={signInWithGoogle} className="flex items-center gap-1 px-6 py-4 bg-slate-700/30 hover:bg-slate-800/25 active:bg-slate-900 rounded-md">
                            <FcGoogle />
                            Sign In With Google
                        </button>
                        {/* <button className="px-6 py-4 bg-slate-700/30 hover:bg-slate-800/25 active:bg-slate-900 rounded-md flex items-center gap-1">
                            <FcKey />
                            Sign In Using Passkey
                        </button> */}
                    </div>
                </div>

            </div>
        </section>
    );
};