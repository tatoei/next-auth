"use client"

import Navbar from '@/components/Navbar'
import React from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

function WelcomePage() {
    const { data: session } = useSession();
    console.log(session)

    if (!session) redirect("/login")
    return (
        <div>
            <Navbar session={session} />
            <div className='container mx-auto'>
                <h3 className='text-xl mt-3'>Welcome User {session?.user?.name}</h3>
                <p>Email: {session?.user?.email}</p>
                <hr className='my-3' />
                <p>เข้ามาแย้วว</p>
                <div className="flex flex-wrap justify-between mt-4 space-x-3">
                    <img
                        className="w-1/4 h-auto rounded-md"
                        src="https://i.pinimg.com/564x/32/c4/ff/32c4ff0da53960a58b5c3affd0b47bf3.jpg"
                        alt="Beautiful Scenery 1"
                    />
                    <img
                        className="w-1/4 h-auto rounded-md"
                        src="https://i.pinimg.com/564x/47/f2/b6/47f2b6f76868449e38fbb7a0cb770166.jpg"
                        alt="Beautiful Scenery 2"
                    />
                    <img
                        className="w-1/4 h-auto rounded-md"
                        src="https://i.pinimg.com/564x/7b/86/53/7b8653f99bb46b2abdc984bd9f29b77d.jpg"
                        alt="Beautiful Scenery 3"
                    />
                </div>
            </div>
        </div>
    )
}

export default WelcomePage
