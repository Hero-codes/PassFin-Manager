import Link from "next/link";

export default function HowItWorks() {

    type Works = {
        id: number,
        title: string,
        description: string
        redirect_url?: string
    };

    const howItWorks: Works[] = [
        {
            id: 1,
            title: "Money Tracker",
            description: "You can manage your expenses in a single click. You can add and remove your expenses from our website from anywhere and anytime. This would help you to track your expenses. Easy and beginner friendly UI is built for this."
        },
        {
            id: 2,
            title: "Sign Up",
            description: "You can SignIn in our application using google or via passcode. Passworldess authentication is preferred. It helps us and as well as our users to keep their accounts safe in todays world."
        },
        {
            id: 3,
            title: "Password Manager",
            description: "Though we prefer passwordless authenticaton, but still if you want you can save your old important passwords here so that if you forget any one of them, you can restore them from here. Whenever you will view any password, you need to first type something to unlock the password"
        },
        {
            id: 4,
            title: "Support",
            description: "We are always there for your support. 24/7. Contact us at any time, we will try our best to reach you asap."
        },
    ]

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
                        <Link href="/working">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                            How It Works
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="text-center font-semibold text-2xl py-10">
                How It Works
            </div>

            <div className="flex flex-col md:flex-row gap-8 pb-7 flex-wrap justify-center">

                {howItWorks.map(({ id, description, title }: Works) => (
                    <div className="flex flex-col w-full md:max-w-md shadow-xl shadow-gray-400/10 bg-gray-700/40 py-7 px-5 md:px-10 gap-12 rounded-xl h-fit">

                        <div className="flex flex-col space-y-6">
                            <h4 className="font-semibold text-lg">{title}</h4>
                            <p>{description}</p>
                        </div>

                        <div className="text-gray-400/60 text-xl font-semibold">
                            {id}
                        </div>
                    </div>
                ))}

            </div>
        </section >
    )
}
