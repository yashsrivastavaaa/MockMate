// app/layout.tsx or wherever your root layout is
import Navbar from '@/components/SignOutButton';
import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';
// <-- New client component

const RootLayout = async ({ children }: { children: ReactNode }) => {
    const isUserAuthenticated = await isAuthenticated();

    if (!isUserAuthenticated) {
        redirect('/sign-in');
    }

    return (
        <div className="flex flex-col min-h-screen bg-black">
            <div className="bg-black min-h-screen text-white mx-40 max-lg:mx-4 max-sm:mx-4">
                <div className="flex max-w-7xl flex-col gap-12 max-sm:mx-4">
                    <Navbar /> {/* Client-side sign-out */}
                </div>
                {children}
            </div>
        </div>
    );
};

export default RootLayout;
