import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv'
dotenv.config();
// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Start a chat session
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{
            text: 'You are a helpful assistant specialized in competitor analysis and market research. Provide concise, accurate, and actionable insights.'
          }],
        },
        {
          role: 'model',
          parts: [{
            text: 'I understand. I will help you analyze competitors and provide market research insights. I will be concise, accurate, and focus on actionable information.'
          }],
        },
      ],
    });

    // Send the message and get the response
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 