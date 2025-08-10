import dayjs from 'dayjs';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import Link from 'next/link';
import InterviewDetails from '@/app/(root)/feedback/ViewFeedback';

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
type completeData = {
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
};

const InterviewCard = (data: any, cd: completeData) => {
    const [totalScore, setTotalScore] = useState<number>(0);

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
        <div className="bg-gradient-to-b from-[#4B4D4F] to-[#4B4D4F33] p-0.5 rounded-2xl w-[340px] max-[1144px]:w-full min-h-96">
            <div className="bg-gradient-to-b from-[#1A1C20] to-[#08090D] rounded-2xl min-h-full flex flex-col p-1 relative overflow-hidden gap-10 justify-between">
                <div className="bg-black rounded-2xl p-5">
                    <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
                        <p className="bg-light-600 text-sm font-semibold capitalize">Technical</p>
                    </div>

                    <Image src="/covers/adobe.png" alt="Cover" width={80} height={80} className="rounded-full object-fit" />

                    <h3 className="text-[22px] font-semibold mt-5 capitalize">{data.role || 'Job'} Interview</h3>

                    <div className="flex flex-row gap-5 mt-3">
                        <div className="flex flex-row gap-2">
                            <Image src="/calender.svg" alt="Calendar" width={22} height={22} />
                            <p className="text-light-100">{formattedDate}</p>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <Image src="/star.svg" alt="star" width={22} height={22} />
                            <p className="text-light-100">{totalScore}/100</p>
                        </div>
                    </div>

                    <p className="text-light-100 line-clamp-2 mt-5">
                        Want to view the complete feedback? Click on View Feedback.
                    </p>

                    <div className="flex flex-row justify-between mt-5">
                        <Button className="!bg-primary-200 !text-dark-100 hover:!bg-primary-200/80 !rounded-full !font-bold px-5 cursor-pointer min-h-10" onClick={() => {
                            <InterviewDetails interview={cd} />
                        }}>

                            View Feedback

                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewCard;
