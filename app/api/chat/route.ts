import { NextRequest, NextResponse } from 'next/server';
// import { parsePDF } from '@/utils/parsePdf';
// import { checkChatRateLimit } from '@/utils/arcjet';

// interface RateLimitResult {
//   remaining?: number;
//   resetTime?: number;
// }

// function rateLimitHeaders({ remaining, resetTime }: RateLimitResult) {
//   return {
//     ...(remaining !== undefined && { 'X-RateLimit-Remaining': remaining.toString() }),
//     ...(resetTime !== undefined && { 'X-RateLimit-Reset': resetTime.toString() }),
//   };
// }

export const runtime = 'nodejs';
export const maxDuration = 60; // TODO: increase when fluid compute turns on
export const dynamic = 'force-dynamic'; // always run dynamically

export async function POST(req: NextRequest) {
  try {

    // const rateLimitResult = await checkChatRateLimit(req);

    // if (!rateLimitResult.allowed) {
    //   return new NextResponse(
    //     JSON.stringify({
    //       error: 'Rate limit exceeded',
    //       message: rateLimitResult.reason || 'Too many requests. Please wait before trying again.',
    //       details: 'You can make up to 8 chat requests per minute. Please wait a moment before sending another message.'
    //     }),
    //     {
    //       status: 429,
    //       headers: {
    //         'Content-Type': 'application/json',
    //         ...rateLimitHeaders(rateLimitResult)
    //       }
    //     }
    //   );
    // }

    const formData = await req.formData();
    const message = formData.get('message') as string;
    const conversationId = formData.get('conversationId') as string;
    const file = formData.get('file') as File | null;

    if (!message || !conversationId) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    let fileContent: Promise<string[]> | undefined;
    if (file) {
      // Check file size before reading content
      const fileSizeLimit = 5 * 1024 * 1024; // 5MB
      if (file.size > fileSizeLimit) {
        return new NextResponse('File size exceeds the 5MB limit', {
          status: 413,
        }); // 413 Payload Too Large
      }

      // Read file content
      const buffer = await file.arrayBuffer();

      // Process based on file type
      if (file.type === 'application/pdf') {
        console.log('PDF file uploaded');
        // fileContent = parsePDF(buffer, file.name);
      } else if (file.type === 'text/plain') {
        fileContent = Promise.resolve([new TextDecoder().decode(buffer)]);
      } else {
        return new NextResponse('Unsupported file type', { status: 400 });
      }
    }


    return ;
  } catch (error) {
    console.error('Error processing chat request:', error);

    // Check if the error is related to rate limiting
    if (error instanceof Error && error.message.includes('rate limit')) {
      return new NextResponse(
        JSON.stringify({
          error: 'Rate limit service error',
          message: 'Unable to verify rate limit. Please try again.',
        }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
