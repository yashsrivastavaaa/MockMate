import React, { useEffect } from 'react';
import { ArrowPathIcon, HomeIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { db } from '@/config/feedbackdb';
import { feedbackSchema } from '@/config/feedbackSchema';
import { getCurrentUser } from '@/lib/actions/auth.action';

interface FeedbackScores {
    communication: number;
    technical: number;
    problemSolving: number;
    culturalFit: number;
    confidence: number;
    summary: string;
    suggestions: string[];
    role: string; // Add role here
}

interface FeedbackProps {
    feedback: FeedbackScores;
    userName: string;
    onRetry?: () => void;
}

const FeedbackDisplay = ({ feedback, userName, onRetry }: FeedbackProps) => {
    const router = useRouter();

    useEffect(() => {
        let isMounted = true;

        const addToDB = async () => {
            try {
                const userid = await getCurrentUser();

                if (!userid || !isMounted) return;

                await db.insert(feedbackSchema).values({
                    user_id: userid.id,
                    name: userid.name,
                    email: userid.email,
                    communication: feedback.communication.toString(),
                    technical: feedback.technical.toString(),
                    problem_solving: feedback.problemSolving.toString(),
                    cultural_fit: feedback.culturalFit.toString(),
                    confidence: feedback.confidence.toString(),
                    summary: feedback.summary,
                    suggestions: feedback.suggestions.join(', '),
                    role: feedback.role.toString(), // Save role here
                });
            } catch (error) {
                console.error('Error adding feedback to DB:', error);
            }
        };

        addToDB();

        return () => {
            isMounted = false;
        };
    }, [feedback]);

    const getColor = (score: number) => {
        if (score >= 85) return 'text-green-500';
        if (score >= 60) return 'text-yellow-500';
        return 'text-red-500';
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-3xl mx-auto p-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-center">
                Interview Feedback for {userName}
            </h2>

            <p className="text-lg text-gray-400 mt-2 text-center">
                Detected Role: <span className="text-white font-semibold">{feedback.role}</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <FeedbackItem label="Communication Skills" score={feedback.communication} color={getColor(feedback.communication)} />
                <FeedbackItem label="Technical Knowledge" score={feedback.technical} color={getColor(feedback.technical)} />
                <FeedbackItem label="Problem-Solving" score={feedback.problemSolving} color={getColor(feedback.problemSolving)} />
                <FeedbackItem label="Cultural & Role Fit" score={feedback.culturalFit} color={getColor(feedback.culturalFit)} />
                <FeedbackItem label="Confidence & Clarity" score={feedback.confidence} color={getColor(feedback.confidence)} />
            </div>

            <div className="w-full bg-gray-800 p-6 rounded-lg border border-gray-600 text-white">
                <h3 className="text-xl font-semibold mb-2">Overall Feedback</h3>
                <p>{feedback.summary}</p>

                {feedback.suggestions?.length > 0 && (
                    <>
                        <h4 className="mt-4 text-lg font-semibold">Suggestions for Improvement</h4>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            {feedback.suggestions.map((s, idx) => (
                                <li key={idx}>{s}</li>
                            ))}
                        </ul>
                    </>
                )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 cursor-pointer"
                    >
                        <ArrowPathIcon className="w-5 h-5" />
                        Retry Interview
                    </button>
                )}

                <button
                    onClick={() => router.push('/')}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-full font-semibold hover:bg-gray-800 cursor-pointer"
                >
                    <HomeIcon className="w-5 h-5" />
                    Go to Home
                </button>
            </div>
        </div>
    );
};

const FeedbackItem = ({ label, score, color }: { label: string; score: number; color: string }) => (
    <div className="bg-gray-900 p-5 rounded-md border border-gray-700">
        <div className="text-gray-400 text-sm mb-1">{label}</div>
        <div className={`text-3xl font-bold ${color}`}>{score}/100</div>
    </div>
);

export default FeedbackDisplay;
