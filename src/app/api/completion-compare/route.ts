import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  if (!prompt || typeof prompt !== "string") {
    return new Response("Missing prompt", { status: 400 });
  }

  const anthropic = new Anthropic();

  const stream = anthropic.messages.stream({
    model: "claude-sonnet-4-20250514",
    max_tokens: 200,
    messages: [{ role: "user", content: prompt }],
  });

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ text: event.delta.text })}\n\n`
              )
            );
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: message })}\n\n`)
        );
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
