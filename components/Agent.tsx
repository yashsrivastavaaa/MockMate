'use client';

import Image from 'next/image';
import React, { useState, useCallback } from 'react';
import { useConversation } from '@11labs/react';
import { evaluateConversation } from '@/lib/gemini';
import FeedbackDisplay from '@/app/(root)/feedback/feedbackInteview';

enum CallStatus {
    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE',
    CONNECTING = 'CONNECTING',
    FINISHED = 'FINISHED',
}

interface Message {
    role: string;
    content: string;
    timestamp?: string;
}

interface AgentProps {
    userName: string;
}

const Agent = ({ userName }: AgentProps) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [conversationHistory, setConversationHistory] = useState<Message[]>([]);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedbackResult, setFeedbackResult] = useState<any>(null);

    const conversation = useConversation({
        onConnect: () => console.log('✅ Connected to ElevenLabs agent'),
        onDisconnect: () => console.log('🛑 Disconnected from agent'),
        onMessage: (incoming: any) => {
            console.log('📩 Message received:', incoming);

            if (incoming?.message) {
                const transformedMessage: Message = {
                    role: incoming.source === 'ai' ? 'ai' : 'user',
                    content: incoming.message,
                    timestamp: new Date().toISOString(),
                };

                setConversationHistory((prev) => [...prev, transformedMessage]);
            }
        },
        onError: (error: any) => {
            console.error('❌ Error from ElevenLabs:', error);
        },
    });

    const { isSpeaking, status } = conversation;

    const handleStartCall = useCallback(async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });

            setConversationHistory([]);
            setCallStatus(CallStatus.ACTIVE);
            setShowFeedback(false);
            setFeedbackResult(null);

            const sessionId = await conversation.startSession({
                agentId: process.env.NEXT_PUBLIC_AI_AGENT_ID2!,
            });

            console.log('🎤 Conversation started with ID:', sessionId);
        } catch (error) {
            console.error('🚫 Failed to start conversation:', error);
            setCallStatus(CallStatus.INACTIVE);
        }
    }, [conversation]);

    const handleEndCall = useCallback(async () => {
        try {
            await conversation.endSession();
            setCallStatus(CallStatus.INACTIVE);

            console.log('\n📝 === Full Conversation History ===');
            console.log(conversationHistory);

            // Avoid empty evaluations
            let historyToEvaluate = conversationHistory;
            if (conversationHistory.length === 0) {
                historyToEvaluate = [
                    {
                        role: 'user',
                        content: 'No conversation captured.',
                        timestamp: new Date().toISOString(),
                    },
                ];
            }

            const evaluationRaw = await evaluateConversation(historyToEvaluate);
            console.log('📊 Gemini Evaluation Raw:\n', evaluationRaw);

            let evaluationJSON = null;
            try {
                const jsonMatch = evaluationRaw.match(/```json([\s\S]*?)```/);
                const jsonString = jsonMatch ? jsonMatch[1].trim() : evaluationRaw.trim();

                evaluationJSON = JSON.parse(jsonString);
            } catch (parseError) {
                console.error('Error parsing evaluation JSON:', parseError);
                evaluationJSON = {
                    summary: evaluationRaw,
                    communication: 0,
                    technical: 0,
                    problemSolving: 0,
                    culturalFit: 0,
                    confidence: 0,
                    suggestions: [],
                };
            }

            setFeedbackResult(evaluationJSON);
            setShowFeedback(true);
        } catch (error) {
            console.error('Error ending call or evaluating:', error);
        }
    }, [conversation, conversationHistory]);

    if (showFeedback && feedbackResult) {
        return (
            <FeedbackDisplay
                feedback={feedbackResult}
                userName={userName}
                onRetry={() => {
                    setFeedbackResult(null);
                    setShowFeedback(false);
                    setCallStatus(CallStatus.INACTIVE);
                    setConversationHistory([]);
                }}
            />
        );
    }

    return (
        <div className="flex flex-col items-center gap-6 w-full">
            <div className="flex flex-col sm:flex-row gap-10 items-center justify-between w-full">
                {/* AI Interviewer */}
                <div className="flex flex-col items-center justify-center p-4 sm:p-7 h-[360px] sm:h-[400px] bg-gradient-to-b from-[#171532] to-[#08090D] rounded-lg border-2 border-primary-200/50 flex-1 sm:basis-1/2 w-full">
                    <div className="relative z-10 flex items-center justify-center bg-gradient-to-l from-[#FFFFFF] to-[#CAC5FE] rounded-full size-[140px] sm:size-[200px]">
                        <Image src="/ai.png" alt="AI" width={200} height={200} />
                        {callStatus !== CallStatus.INACTIVE && isSpeaking && (
                            <span className="absolute inline-flex size-[120px] sm:size-[180px] animate-ping rounded-full bg-primary-200 opacity-75" />
                        )}
                    </div>
                    <h3 className="text-center text-primary-100 mt-6 text-2xl sm:text-3xl font-semibold">
                        AI Interviewer
                    </h3>
                </div>

                {/* User */}
                <div className="flex flex-col items-center justify-center p-4 sm:p-7 h-[360px] sm:h-[400px] bg-gradient-to-b from-[#171532] to-[#08090D] rounded-lg border-2 border-primary-200/50 flex-1 sm:basis-1/2 w-full">
                    <div className="relative z-10 flex items-center justify-center bg-gradient-to-l from-[#FFFFFF] to-[#CAC5FE] rounded-full size-[140px] sm:size-[200px]">
                        <Image src="/user.png" alt="User" width={110} height={110} />
                        {callStatus !== CallStatus.INACTIVE && !isSpeaking && (
                            <span className="absolute inline-flex size-[120px] sm:size-[180px] animate-ping rounded-full bg-primary-200 opacity-75" />
                        )}
                    </div>
                    <h3 className="text-center text-primary-100 mt-6 text-2xl sm:text-3xl font-semibold">{userName}</h3>
                </div>
            </div>

            {/* Call Button */}
            <div className="w-full flex justify-center mt-4">
                {callStatus !== CallStatus.ACTIVE ? (
                    <button
                        onClick={handleStartCall}
                        disabled={status === 'connected'}
                        className="relative inline-block px-7 py-3 font-bold text-sm leading-5 text-white transition-colors duration-150 bg-success-100 border border-transparent rounded-full shadow-sm focus:outline-none focus:shadow-2xl active:bg-success-200 hover:bg-success-200 min-w-28 cursor-pointer"
                    >
                        <span className="relative">Call</span>
                    </button>
                ) : (
                    <button
                        onClick={handleEndCall}
                        className="inline-block px-7 py-3 text-sm font-bold leading-5 text-white transition-colors duration-150 bg-destructive-100 border border-transparent rounded-full shadow-sm focus:outline-none focus:shadow-2xl active:bg-destructive-200 hover:bg-destructive-200 min-w-28"
                    >
                        End
                    </button>
                )}
            </div>
        </div>
    );
};

export default Agent;
