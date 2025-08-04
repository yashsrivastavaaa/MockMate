"use server"

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

export async function signUp(parms: SignUpParams) {
    const { uid, name, email, password } = parms;
    try {
        const userRecord = await db.collection('users').doc(uid).get();

        if (userRecord.exists) {
            return {
                success: false,
                message: 'User already exists.Please sign in.'
            };
        }

        await db.collection('users').doc(uid).set({
            name, email, password
        });

        return {
            success: true,
            message: 'User created successfully.Please sign in.',
        }

    } catch (error: any) {
        if (error.code === 'auth/email-already-exists') {
            return {
                success: false,
                message: 'This email is already registered.'
            }
        }


        return {
            success: false,
            message: error.message
        }
    }
}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params;

    try {
        const userRecord = await auth.getUserByEmail(email);
        if (!userRecord) {
            return {
                success: false,
                message: 'User not found. Please sign up.'
            };
        }

        await setSessionCookie(idToken);

    } catch (error) {
        console.log("Error signing in:", error);
        return {
            success: false,
            message: "Failed to sign in."
        };
    }
}

const oneWeek = 60 * 60 * 24 * 7 * 1000; // 7 days in milliseconds

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();
    try {
        const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn: oneWeek });

        cookieStore.set('session', sessionCookie, {
            maxAge: oneWeek, // 7 days
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            path: '/',
            sameSite: 'lax' // Adjust as necessary for your application
        })
        return {
            success: true,
            sessionCookie
        };
    } catch (error: any) {
        return {
            success: false,
            message: "Failed to set session cookie."
        };
    }
}

export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
        return null;
    }

    try {
        const decodedToken = await auth.verifySessionCookie(sessionCookie, true);
        const userRecord = await db.collection('users').doc(decodedToken.uid).get();

        if (!userRecord.exists) {
            return null;
        }

        return {
            ...userRecord.data(),
            id: userRecord.id
        } as User;
    } catch (error) {
        console.error("Error getting current user:", error);
        return null;
    }
}

export async function isAuthenticated() {
    const user = await getCurrentUser();
    return !!user;
}