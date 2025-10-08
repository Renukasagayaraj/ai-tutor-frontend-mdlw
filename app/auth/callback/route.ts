import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') ?? '/';
  const origin = url.origin;

  console.log('[OAuth Callback] Received code:', code);
  console.log('[OAuth Callback] Next redirect target:', next);
  console.log('[OAuth Callback] Origin:', origin);

  if (code) {
    const supabase = await createClient();
    console.log('[OAuth Callback] Supabase client created');

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    console.log('[OAuth Callback] Exchange result:', { error });

    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';
      console.log('[OAuth Callback] Env:', {
        isLocalEnv,
        forwardedHost,
      });

      let redirectUrl;

      if (isLocalEnv) {
        redirectUrl = `${origin}${next}`;
      } else if (forwardedHost) {
        redirectUrl = `https://${forwardedHost}${next}`;
      } else {
        redirectUrl = `${origin}${next}`;
      }

      console.log('[OAuth Callback] Redirecting to:', redirectUrl);

      return NextResponse.redirect(`${redirectUrl}?auth=success`);
    } else {
      console.error('[OAuth Callback] Error exchanging code:', error);
      return NextResponse.redirect(
        `${origin}/auth?error=Authentication failed: ${error.message}`
      );
    }
  }

  console.warn('[OAuth Callback] No code provided in URL');
  return NextResponse.redirect(
    `${origin}/auth?error=No authentication code provided`
  );
}
