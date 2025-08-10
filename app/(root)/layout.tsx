import { isAuthenticated } from '@/lib/actions/auth.action'
import { redirect } from 'next/navigation';
import Link from 'next/link'
import React, { ReactNode } from 'react'

const RootLayout = async ({ children }: { children: ReactNode }) => {
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect('/sign-in');
    }

    return (
        <div className="flex flex-col min-h-screen bg-black ">
            <div className='bg-black min-h-screen text-white mx-40 max-lg:mx-4 max-sm:mx-4'>
                <div className="flex max-w-7xl flex-col gap-12  max-sm:mx-4 ">
                    <nav>
                        <Link href="/" className='flex items-center gap-6 font-bold text-5xl mx-16 mt-[20] max-sm:mx-4'>MockMate</Link>
                    </nav>
                </div>

                {children}

            </div>
        </div>
    )
}

export default RootLayout