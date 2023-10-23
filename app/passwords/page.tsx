"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import img from "@/public/images/safe.png"
import Image from 'next/image'
import axios from 'axios'

export default function Passwords() {

    const [passwordInfo, setPasswordInfo] = useState({
        passwordFor: "",
        password: "",
        confirmPassword: ""
    });
    const [passwords, setPasswords] = useState([]);

    const handleChange = (e: any) => {
        setPasswordInfo(prev => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const addPassword = async () => {

        if (passwordInfo.password !== passwordInfo.confirmPassword) {
            console.log("Wrong Passwords")
            return; // Toast message saying passwords are inccorect
        }

        try {
            const { data } = await axios.post("/api/passwords", {
                password: passwordInfo.password,
                passwordFor: passwordInfo.passwordFor
            });

            setPasswordInfo({
                password: "",
                confirmPassword: "",
                passwordFor: ""
            });
            return data;
        } catch (err) {
            console.log('There was an error in adding your password')
        }
    };

    const getPasswords = async () => {
        try {
            const res = await fetch("/api/passwords", {
                next: {
                    revalidate: 3
                }
            });
            const data = await res.json();
            setPasswords(data);
            return data;
        } catch (err) {
            console.log(err);
        };
    };

    const deletePassword = async (id: string) => {
        try {
            const { data } = await axios.delete(`/api/passwords/${id}`)
        } catch (err) {
            console.log(err);
        };
    };

    useEffect(() => {
        getPasswords();
    }, []);

    return (
        <div className='mx-auto container px-3'>
            <h2 className='text-3xl font-semibold py-3'>Passwords</h2>

            <div className="text-sm breadcrumbs mt-10">
                <ul>
                    <li>
                        <Link href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/passwords">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                            Passwords
                        </Link>
                    </li>
                </ul>
            </div>

            <div className='flex flex-col space-y-6 py-7'>
                <div className='flex flex-col gap-6'>
                    <input
                        value={passwordInfo.passwordFor}
                        onChange={handleChange}
                        name='passwordFor'
                        placeholder="Password (for)..."
                        type="text"
                        className="px-4 py-3 rounded-lg focus:outline-none bg-slate-700/50" />

                    <input
                        value={passwordInfo.password}
                        onChange={handleChange}
                        name='password'
                        placeholder="Type Your Password..."
                        type="password"
                        className="px-4 py-3 rounded-lg focus:outline-none bg-slate-700/50" />

                    <input
                        value={passwordInfo.confirmPassword}
                        onChange={handleChange}
                        name='confirmPassword'
                        placeholder="Confirm Password..."
                        type="password"
                        className="px-4 py-3 rounded-lg focus:outline-none bg-slate-700/50" />

                    <button
                        onClick={addPassword}
                        className="btn btn-success hover:opacity-80">Add Password</button>
                </div>

                <div className='flex flex-wrap gap-6 md:gap-10 justify-center'>

                    {passwords.map((password: any) => (
                        <div key={password.id} className="card w-96 bg-base-100 shadow-xl image-full">
                            <figure><Image src={img} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{password.passwordFor}</h2>
                                <p className='font-semibold'>Your Passwords Are Safe 🔐</p>
                                <span>Password: {password.password}</span>
                                <div className="card-actions justify-end mt-4">
                                    <button
                                        onClick={() => deletePassword(password.id)}
                                        className="btn btn-error">Remove Password</button>
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