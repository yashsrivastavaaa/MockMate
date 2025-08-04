import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

enum CallStatus {
    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE',
    CONNECTING = 'CONNECTING',
    FINISHED = 'FINISHED',
}



const Agent = ({ userName }: AgentProps) => {
    const isSpeaking = true;
    const callStatus = CallStatus.INACTIVE; // Replace with dynamic state if needed

    return (
        <div className='flex flex-col items-center gap-6 w-full'>
            {/* Main Content Section */}
            <div className='flex flex-col sm:flex-row gap-10 items-center justify-between w-full'>
                {/* AI Interviewer */}
                <div className='flex flex-col items-center justify-center p-4 sm:p-7 h-[360px] sm:h-[400px] bg-gradient-to-b from-[#171532] to-[#08090D] rounded-lg border-2 border-primary-200/50 flex-1 sm:basis-1/2 w-full'>
                    <div className='relative z-10 flex items-center justify-center bg-gradient-to-l from-[#FFFFFF] to-[#CAC5FE] rounded-full size-[140px] sm:size-[200px]'>
                        <Image src="/ai.png" alt="AI" width={200} height={200} />
                        {isSpeaking && (
                            <span className="absolute inline-flex size-[120px] sm:size-[180px] animate-ping rounded-full bg-primary-200 opacity-75" />
                        )}
                    </div>
                    <h3 className='text-center text-primary-100 mt-6 text-2xl sm:text-3xl font-semibold'>
                        AI Interviewer
                    </h3>
                </div>

                {/* User */}
                <div className='flex flex-col items-center justify-center p-4 sm:p-7 h-[360px] sm:h-[400px] bg-gradient-to-b from-[#171532] to-[#08090D] rounded-lg border-2 border-primary-200/50 flex-1 sm:basis-1/2 w-full'>
                    <div className='relative z-10 flex items-center justify-center bg-gradient-to-l from-[#FFFFFF] to-[#CAC5FE] rounded-full size-[140px] sm:size-[200px]'>
                        <Image src="/user.png" alt="user" width={110} height={110} />
                    </div>
                    <h3 className='text-center text-primary-100 mt-6 text-2xl sm:text-3xl font-semibold'>
                        {userName}
                    </h3>
                </div>
            </div>

            {/* Call Control Button at Bottom */}
            <div className='w-full flex justify-center mt-4'>
                {callStatus !== "ACTIVE" ? (
                    <button className="relative inline-block px-7 py-3 font-bold text-sm leading-5 text-white transition-colors duration-150 bg-success-100 border border-transparent rounded-full shadow-sm focus:outline-none focus:shadow-2xl active:bg-success-200 hover:bg-success-200 min-w-28 cursor-pointer items-center justify-center overflow-visible" >
                        <span
                            className={cn(
                                "absolute animate-ping rounded-full opacity-75",
                                callStatus !== "CONNECTING" && "hidden"
                            )}
                        />

                        <span className="relative">
                            {callStatus === "INACTIVE" || callStatus === "FINISHED"
                                ? "Call"
                                : ". . ."}
                        </span>
                    </button>
                ) : (
                    <button className="inline-block px-7 py-3 text-sm font-bold leading-5 text-white transition-colors duration-150 bg-destructive-100 border border-transparent rounded-full shadow-sm focus:outline-none focus:shadow-2xl active:bg-destructive-200 hover:bg-destructive-200 min-w-28" >
                        End
                    </button>
                )}
            </div>
        </div>
    );
};

export default Agent;
