'use client';

import Link from 'next/link';
import { signOut } from '@/lib/actions/auth.action';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push('/sign-in');
    };

    return (
        <nav className="flex justify-between items-center py-6 px-8 max-sm:px-4">
            <Link href="/" className="font-bold text-4xl text-white">
                MockMate
            </Link>

            <button
                onClick={handleSignOut}
                className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition-colors cursor-pointer"
            >
                Sign Out
            </button>
        </nav>
    );
};

export default Navbar;
