'use client';

import React, { useEffect, useState } from 'react';
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { feedbackSchema } from '@/config/feedbackSchema';
import { db } from '@/config/feedbackdb';

type Interview = {
    id: number;
    user_id: string;
    name: string;
    email: string;
    communication: string | null;
    technical: string | null;
    problem_solving: string | null;
    cultural_fit: string | null;
    confidence: string | null;
    summary: string | null;
    suggestions: string | null;
    created_at: string | null;
    role: string | null;
};

type FeedbackPageProps = {
    params: {
        id: string;
    };
};

const FeedbackPage = ({ params }: FeedbackPageProps) => {
    const router = useRouter();
    const [interview, setInterview] = useState<Interview | null>(null);
    const [loading, setLoading] = useState(false);

    const id = parseInt(params.id); // This is fine in current Next.js versions

    const getColor = (score: number) => {
        if (score >= 85) return 'text-green-500';
        if (score >= 60) return 'text-yellow-500';
        return 'text-red-500';
    };

    const parseScore = (value: string | null) =>
        value ? Math.round(parseFloat(value)) : 0;

    useEffect(() => {
        const fetchUserAndData = async () => {
            setLoading(true);
            try {
                const result = await db
                    .select()
                    .from(feedbackSchema)
                    .where(eq(feedbackSchema.id, id));

                setInterview(result[0] || null);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndData();
    }, [id]);

    if (loading) {
        return <p className="text-white text-center mt-10">Loading...</p>;
    }

    if (!interview) {
        return (
            <p className="text-red-500 text-center mt-10">Interview not found.</p>
        );
    }

    const parsedSuggestions =
        interview.suggestions?.split('\n').filter((s) => s.trim() !== '') || [];

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-3xl mx-auto p-6">
            {/* Back button aligned with container left edge */}
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-md font-semibold hover:bg-gray-800 cursor-pointer shadow-md self-start"
                aria-label="Go back"
            >
                <ArrowLeftIcon className="w-5 h-5" />
                Back
            </button>

            <h2 className="text-3xl sm:text-4xl font-bold text-center w-full">
                Interview Feedback for {interview.role}
            </h2>

            <p className="text-md text-gray-400 mt-2 text-center">
                Name: <span className="text-white font-medium">{interview.name}</span>
            </p>

            <p className="text-md text-gray-400 mt-0 text-center">
                Email: <span className="text-white font-medium">{interview.email}</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <FeedbackItem
                    label="Communication Skills"
                    score={parseScore(interview.communication)}
                    color={getColor(parseScore(interview.communication))}
                />
                <FeedbackItem
                    label="Technical Knowledge"
                    score={parseScore(interview.technical)}
                    color={getColor(parseScore(interview.technical))}
                />
                <FeedbackItem
                    label="Problem-Solving"
                    score={parseScore(interview.problem_solving)}
                    color={getColor(parseScore(interview.problem_solving))}
                />
                <FeedbackItem
                    label="Cultural & Role Fit"
                    score={parseScore(interview.cultural_fit)}
                    color={getColor(parseScore(interview.cultural_fit))}
                />
                <FeedbackItem
                    label="Confidence & Clarity"
                    score={parseScore(interview.confidence)}
                    color={getColor(parseScore(interview.confidence))}
                />
            </div>

            <div className="w-full bg-gray-800 p-6 rounded-lg border border-gray-600 text-white">
                <h3 className="text-xl font-semibold mb-2">Overall Feedback</h3>
                <p className="text-gray-300">{interview.summary || 'No summary available.'}</p>

                {parsedSuggestions.length > 0 && (
                    <>
                        <h4 className="mt-4 text-lg font-semibold">Suggestions for Improvement</h4>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
                            {parsedSuggestions.map((s, idx) => (
                                <li key={idx}>{s}</li>
                            ))}
                        </ul>
                    </>
                )}
            </div>

            <button
                onClick={() => router.push('/')}
                className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-full font-semibold hover:bg-gray-800 cursor-pointer"
            >
                <HomeIcon className="w-5 h-5" />
                Go to Home
            </button>
        </div>
    );
};

const FeedbackItem = ({
    label,
    score,
    color,
}: {
    label: string;
    score: number;
    color: string;
}) => (
    <div className="bg-gray-900 p-5 rounded-md border border-gray-700">
        <div className="text-gray-400 text-sm mb-1">{label}</div>
        <div className={`text-3xl font-bold ${color}`}>{score}/100</div>
    </div>
);

export default FeedbackPage;
