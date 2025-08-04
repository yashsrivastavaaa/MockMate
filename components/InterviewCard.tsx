import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react'
import { Button } from './Button';
import Link from 'next/link';


const InterviewCard = ({ interviewId, role, userId, type, techstack, createdAt }: InterviewCardProps) => {

    const feedback = null as Feedback | null;
    const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY');

    return (
        <div className='bg-gradient-to-b from-[#4B4D4F] to-[#4B4D4F33]  p-0.5 rounded-2xl w-[340px] max-[1144px]:w-full min-h-96'>

            <div className="bg-gradient-to-b from-[#1A1C20] to-[#08090D] rounded-2xl min-h-full flex flex-col p-1 relative overflow-hidden gap-10 justify-between ">
                <div className="bg-black rounded-2xl p-5">
                    <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">

                        <p className="bg-light-600 text-sm font-semibold capitalize">{normalizedType}</p>

                    </div>
                    <Image src="/covers/adobe.png" alt="Cover" width={80} height={80} className="rounded-full object-fit size=[80px]" />


                    <h3 className="text-[22px] font-semibold mt-5 capitalize">{role} Interview</h3>
                    <div className="flex flex-row gap-5 mt-3">
                        <div className="flex  flex-row gap-2">
                            <Image src="/calender.svg" alt="Calendar" width={22} height={22} className='' />
                            <p className="text-light-100">{formattedDate}</p>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <Image src="/star.svg" alt="star" width={22} height={22} />
                            <p className="text-light-100">{feedback?.totalScore || '---'}/100</p>
                        </div>
                    </div>

                    <p className='text-light-100 line-clamp-2 mt-5'>
                        {feedback?.finalAssessment || "You haven't taken and Interview yet. Do it now!"}
                    </p>

                    <div className="flex flex-row justify-between mt-5">
                        <Button className="
    @apply w-fit !bg-primary-200 !text-dark-100 hover:!bg-primary-200/80 !rounded-full !font-bold px-5 cursor-pointer min-h-10">
                            <Link href={feedback ? `/interview/${interviewId}/feedback` : `/interview/${interviewId}`}>
                                {feedback ? 'View Feedback' : 'Start Interview'}
                            </Link>
                        </Button>
                    </div>

                </div>


            </div>

        </div>
    )
}

export default InterviewCard