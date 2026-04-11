import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const { question, context } = await req.json();

    console.log("=== QUESTION ===", question);
    console.log("=== CONTEXT ===", context?.slice(0, 200));

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You MUST answer using the document content. Even if partial, try to answer.",
        },
        {
          role: "user",
          content: `DOCUMENT:\n${context}\n\nQUESTION:\n${question}`,
        },
      ],
    });

    return NextResponse.json({
      answer: response.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Chat failed" });
  }
}