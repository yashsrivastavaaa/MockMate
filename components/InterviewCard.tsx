'use client';

import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import { useRouter } from 'next/navigation';

type InterviewCardProps = {
    id: number;
    role?: string;
    created_at?: string;
    communication: string | null;
    technical: string | null;
    problem_solving: string | null;
    cultural_fit: string | null;
    confidence: string | null;
};

const InterviewCard = (data: InterviewCardProps) => {
    const [totalScore, setTotalScore] = useState<number>(0);
    const router = useRouter();

    const formattedDate = dayjs(data.created_at || Date.now()).format('MMM D, YYYY');

    useEffect(() => {
        const scores = [
            data.communication,
            data.technical,
            data.problem_solving,
            data.cultural_fit,
            data.confidence,
        ]
            .map((score) => parseInt(score || '0'))
            .filter((s) => !isNaN(s));

        const average = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
        setTotalScore(average);
    }, [data]);

    return (
        <div className="bg-gradient-to-b from-[#4B4D4F] to-[#4B4D4F33] p-0.5 rounded-2xl w-[340px] max-[1144px]:w-full h-[480px]">
            <div className="bg-gradient-to-b from-[#1A1C20] to-[#08090D] rounded-2xl h-full flex flex-col p-5 relative overflow-hidden gap-5 justify-between">
                <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
                    <p className="text-sm font-semibold capitalize text-light-900">Technical</p>
                </div>

                {/* Replace image with an icon */}
                <div className="flex justify-center mt-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-20 w-20 text-primary-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 17L15 12l-5.25-5"
                        />
                    </svg>
                </div>

                <h3 className="text-[22px] font-semibold mt-2 capitalize text-center">{data.role || 'Job'} Interview</h3>

                <div className="flex flex-row gap-5 mt-2 justify-center">
                    <div className="flex flex-row gap-2 items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-light-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-7 4h4m-6 4h8" />
                        </svg>
                        <p className="text-light-100">{formattedDate}</p>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            stroke="none"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.96a1 1 0 00-.364-1.118L3.623 9.387c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.96z" />
                        </svg>
                        <p className="text-light-100">{totalScore}/100</p>
                    </div>
                </div>

                <p className="text-light-100 line-clamp-3 mt-4 text-center flex-grow px-2">
                    Want to view the complete feedback? Click on View Feedback.
                </p>

                <div className="flex justify-center mt-0">
                    <Button
                        className="!bg-primary-200 !text-dark-100 hover:!bg-primary-200/80 !rounded-full !font-bold px-8 cursor-pointer min-h-10"
                        onClick={() => {
                            router.push(`/feedback/${data.id}`);
                        }}
                    >
                        View Feedback
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InterviewCard;
