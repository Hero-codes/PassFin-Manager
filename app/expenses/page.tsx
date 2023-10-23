"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import img from "@/public/images/safe.png"
import Image from 'next/image'
import axios from 'axios'

export default function Expenses() {

    const [expenseInfo, setExpenseInfo] = useState({
        title: "",
        amount: 0,
        description: "",
    });

    const [expenses, setExpenses] = useState([]);
    const [selectedType, setSelectedType] = useState("");

    const handleChange = (e: any) => {
        setExpenseInfo(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        });
    };

    const addExpense = async () => {

        try {
            const { data } = await axios.post("/api/expenses", {
                title: expenseInfo.title,
                amount: expenseInfo.amount,
                description: expenseInfo.description,
                expense_type: selectedType
            });

            setExpenseInfo({
                title: "",
                amount: 0,
                description: "",
            });

            setExpenses(data);
            return data;
        } catch (err) {
            console.log(err);
        }
    };

    const getExpenses = async () => {
        try {
            const res = await fetch("/api/expenses", {
                next: {
                    revalidate: 3
                }
            });
            const data = await res.json();
            setExpenses(data);
            return data;
        } catch (err) {
            console.log(err);
        };
    };

    const deleteExpense = async (id: string) => {
        try {
            const { data } = await axios.delete(`/api/expenses/${id}`)
        } catch (err) {
            console.log(err);
        };
    };

    useEffect(() => {
        getExpenses();
    }, []);

    return (
        <div className='mx-auto container px-3'>
            <h2 className='text-3xl font-semibold py-3'>Expenses</h2>

            <div className='text-center pt-4 font-semibold text-lg'>
                Current Balance
            </div>

            <div className="text-sm breadcrumbs mt-10">
                <ul>
                    <li>
                        <Link href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/expenses">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                            Expenses
                        </Link>
                    </li>
                </ul>
            </div>

            <div className='flex flex-col space-y-6 py-7'>
                <div className='flex flex-col gap-6'>
                    <input
                        onChange={handleChange}
                        value={expenseInfo.title}
                        name='title'
                        placeholder="Type Your Expense Title..."
                        type="text"
                        className="px-4 py-3 rounded-lg focus:outline-none bg-slate-700/50" />

                    <input
                        onChange={handleChange}
                        value={expenseInfo.description}
                        name='description'
                        placeholder="Short Description..."
                        type="text"
                        className="px-4 py-3 rounded-lg focus:outline-none bg-slate-700/50" />

                    <input
                        onChange={handleChange}
                        value={expenseInfo.amount}
                        name='amount'
                        placeholder="Amount"
                        type="number"
                        className="px-4 py-3 rounded-lg focus:outline-none bg-slate-700/50" />

                    <select
                        value={selectedType}
                        onChange={e => setSelectedType(e.target.value)}
                        className="select select-bordered w-full max-w-xs">
                        <option disabled selected>Expense Type</option>
                        <option value="Earned">Earned</option>
                        <option value="Spent">Spent</option>
                    </select>

                    <button
                        onClick={addExpense}
                        className="btn btn-success hover:opacity-80">Add Expense</button>
                </div>

                <div className='flex flex-wrap gap-6 md:gap-10 justify-center'>

                    {
                        expenses.map((expense: any) => (

                            <div className="card w-96 bg-base-100 shadow-xl image-full">
                                <figure><Image src={img} alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{expense.details.title}</h2>
                                    <p>{expense.details.description}</p>
                                    <span>{expense.details.amount}</span>
                                    <div className="card-actions justify-end mt-4">
                                        <button
                                            onClick={() => deleteExpense(expense.id)}
                                            className="btn btn-error">Remove Item</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}