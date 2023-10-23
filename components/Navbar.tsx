"use client"
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { LogoutBtn } from "./LogOut";
import { useAuthContext } from "@/context/user";

export default function Navbar() {

    const { user } = useAuthContext();

    return (
        <nav className="container mx-auto">
            <div className="flex items-center gap-5 justify-evenly p-6">
                <Link href="/" className="flex items-center gap-1">
                    <h2 className="text-2xl font-bold">PassFin</h2>
                </Link>

                <div className="md:flex gap-5 text-lg hidden">
                    <Link href="/working" className="hover:underline transition hover:opacity-80">How It Works</Link>
                    <Link href="/faqs" className="hover:underline transition hover:opacity-80">FAQs</Link>
                </div>

                <div className="block md:hidden">
                    <div className="drawer z-10 bg-[#15191e]">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            <label htmlFor="my-drawer" className="text-2xl">
                                <GiHamburgerMenu />
                            </label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full bg-base-300 flex flex-col justify-center gap-8">
                                {/* Sidebar content here */}
                                <h1 className="font-semibold text-lg ml-3">MoneyByte</h1>
                                <li><Link href="/working">How It Works</Link></li>
                                <li><Link href="/faqs">FAQS</Link></li>

                                {user ? (
                                    <LogoutBtn />
                                ) : (
                                    <Link href={"/register"}>
                                        <button className="btn btn-outline btn-sm btn-success">Get Started</button>
                                    </Link>
                                )}

                            </ul>
                        </div>
                    </div>
                </div>

                <div className="hidden md:block">

                    {user ? (
                        <LogoutBtn />
                    ) : (
                        <Link href="/register">
                            <button className="btn btn-outline btn-sm btn-success">Get Started</button>
                        </Link>
                    )}

                </div>
            </div>
        </nav>
    )
};