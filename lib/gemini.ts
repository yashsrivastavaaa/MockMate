import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

interface Msg {
    role: string;
    content: string;
    timestamp: string;
}

export async function evaluateConversation(conversation: Msg[]): Promise<string> {
    if (conversation.length === 0) {
        return JSON.stringify({
            communication: 0,
            technical: 0,
            problemSolving: 0,
            culturalFit: 0,
            confidence: 0,
            summary: 'No transcript was provided.',
            suggestions: ['Provide interview transcript for evaluation.'],
        });
    }

    const chatLogs = conversation.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n');
    const prompt = `
You are an expert interviewer. Evaluate the transcript below and return JSON with:
- communication, technical, problemSolving, culturalFit, confidence: each 0-100
- summary: string
- suggestions: string[]

Transcript:
${chatLogs}
`;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const resp = await model.generateContent(prompt);
    const text = await resp.response.text();
    return text.trim();
}
