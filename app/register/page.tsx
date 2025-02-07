"use client"
import React, { use, useState } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

function RegisterPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { data: session } = useSession();
    if (session) redirect("/welcome");

    console.log(name, email, password, confirmPassword)

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (password != confirmPassword) {
            setError("Password do not match!");
            return;
        }

        if (!name || !email || !password || !confirmPassword) {
            setError("Please complete all inputs!");
            return;
        }

        try {

            const resCheckUser = await fetch("http://localhost:3000/api/checkUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            })

            const res = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password
                })
            })

            const { user } = await resCheckUser.json();

            if (user) {
                setError("User already exists!");
                return;
            }

            if (res.ok) {
                const form = e.target;
                setError("");
                setSuccess("User registration successfully!");
                form.reset();
            } else {
                console.log("User registration failed.")
            }
        } catch (error) {
            console.log("Error during registration: ", error);
        }
    }

    return (
        <div>
            <Navbar />
            <div>
                <div className='container mx-auto py-5'>
                    <h3>Register Page</h3>
                    <hr className='my-3' />
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className='bg-red-600 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className='bg-green-600 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                                {success}
                            </div>
                        )}
                        <input onChange={(e) => setName(e.target.value)} className='block bg-gray-200 p-2 my-2 rounded-md' type="text" placeholder='Enter your name' />
                        <input onChange={(e) => setEmail(e.target.value)} className='block bg-gray-200 p-2 my-2 rounded-md' type="email" placeholder='Enter your email' />
                        <input onChange={(e) => setPassword(e.target.value)} className='block bg-gray-200 p-2 my-2 rounded-md' type="password" placeholder='Enter your password' />
                        <input onChange={(e) => setconfirmPassword(e.target.value)} className='block bg-gray-200 p-2 my-2 rounded-md' type="password" placeholder='Confirm your password' />
                        <button type='submit' className='bg-yellow-400 p-2 rounded-md'>Sign Up</button>
                    </form>
                    <hr className='my-3' />
                    <p>Do not have account? go to <Link className="text-blue-500 hover:underline" href="/login">Login</Link> Page</p>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
