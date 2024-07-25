"use client"

import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'


function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { data: session } = useSession();
    if (session) router.replace("welcome");



    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                email, password, redirect: false
            })

            if (res?.error) {
                setError("Invalid credentials");
                return;
            }

            router.replace("welcome");

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Navbar />
            <div>
                <div className='container mx-auto py-5'>
                    <h3>LoginPage</h3>
                    <hr className='my-3' />
                    <form onSubmit={handleSubmit}>
                        {
                            error && (
                                <div className='bg-red-600 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                                    {error}
                                </div>
                            )
                        }
                        <input onChange={(e) => setEmail(e.target.value)} className='block bg-gray-200 p-2 my-2 rounded-md' type="email" placeholder='Enter your email' />
                        <input onChange={(e) => setPassword(e.target.value)} className='block bg-gray-200 p-2 my-2 rounded-md' type="password" placeholder='Enter your password' />
                        <button type='submit' className='bg-yellow-400 p-2 rounded-md'>Sign In</button>
                    </form>
                    <hr className='my-3' />
                    <p>Already have account? go to <Link className="text-blue-500 hover:underline" href="/register">Register</Link> Page</p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
