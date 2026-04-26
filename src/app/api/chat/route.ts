import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { query } = body;

  // Simulate RAG processing time
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock RAG retrieval response
  let reply = `I found some information in the knowledge base.\n`;
  reply += `You asked: "${query}".\n`;
  reply += `Manideep has a strong focus on JS/Python full-stack development with AI integration. For instance, he built 'Ingreedy' using React, FastAPI, and Google Generative AI, and 'healbuddy' using an Ollama local LLM runtime.`;

  return NextResponse.json({ reply });
}
