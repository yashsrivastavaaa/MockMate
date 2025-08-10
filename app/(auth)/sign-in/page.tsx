"use client";
import Link from 'next/link';
import InputBox from '@/components/InputBox';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/client';

import { signIn } from '@/lib/actions/auth.action';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function SignIn() {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const togglePassword = () => setShowPassword((prev) => !prev);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const clickSignIn = async () => {
        try {
            setIsLoading(true);
            const result = await signInWithEmailAndPassword(auth, form.email, form.password);
            const idToken = await result.user.getIdToken();

            if (!idToken) {
                toast.error("Sign in failed. Please try again.");
                return;
            }

            await signIn({
                email: form.email,
                idToken: idToken,
            });

            toast.success("Signed in successfully.");
            router.push('/');
        } catch (error: any) {
            const errorMsg = error?.message || "Sign in failed. Please check your credentials.";
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading) return;
        clickSignIn();
    };

    return (
        <div className="min-h-screen bg-[#0f0f11] text-white flex items-center justify-center px-6 sm:px-4 font-inter">
            <div className="w-full max-w-lg bg-[#1c1c1f] rounded-3xl shadow-xl p-10 sm:p-8 border border-[#2a2a2e]">
                <h1 className="text-4xl font-bold mb-3 text-center text-white tracking-tight">
                    MockMate
                </h1>
                <p className="text-base text-center text-gray-400 mb-8 leading-relaxed">
                    Practice real-world interviews. Improve your confidence and skills.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <InputBox
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <div className="relative">
                        <InputBox
                            label="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePassword}
                            className="absolute right-3 top-[42px] text-gray-400  cursor-pointer"
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex items-center justify-center ${isLoading
                            ? 'bg-blue-100 cursor-not-allowed'
                            : 'bg-blue-200 hover:bg-blue-300'
                            } text-black transition-colors py-3 rounded-full text-base font-semibold focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer focus:ring-offset-2`}
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-t-transparent border-blue-600 rounded-full animate-spin" />
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <p className="text-center mt-8 text-sm text-gray-400">
                    Don't have an account?{' '}
                    <Link href="/sign-up" className="text-white font-semibold">
                        Create Now
                    </Link>
                </p>
            </div>
        </div>
    );
}
