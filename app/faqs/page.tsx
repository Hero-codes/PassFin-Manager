import Link from "next/link"
export default function FAQS() {

    type FAQS = {
        id: number,
        question: string,
        answer: string
    };

    const faqs: FAQS[] = [
        {
            id: 1,
            question: "Is this safe?",
            answer: "100%! We save your data in the most safest way"
        },
        {
            id: 2,
            question: "Do you share our data to any third party apps?",
            answer: "No!, We don't share our users data to any other third party services",
        }
    ]

    return (
        <div className="md:px-10 px-4 container mx-auto">
            <div className="text-sm breadcrumbs mt-10">
                <ul>
                    <li>
                        <Link href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/faqs">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                            FAQS
                        </Link>
                    </li>
                </ul>
            </div>

            <h3 className="text-center text-xl font-semibold my-14">FAQS</h3>
            <div className="flex space-y-10 flex-col items-center justify-center">
                {faqs.map(faq => (
                    <div key={faq.id} className="collapse collapse-plus bg-slate-600/50">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-xl font-medium">
                            {faq.question}
                        </div>
                        <div className="collapse-content">
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}