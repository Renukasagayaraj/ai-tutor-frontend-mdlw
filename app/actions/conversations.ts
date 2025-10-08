'use server';

import { createClient } from '@/utils/supabase/server';
// import { honcho, getHonchoApp, getHonchoUser } from '@/utils/honcho';
// import * as Sentry from '@sentry/nextjs';
import { Conversation } from '@/utils/types';

// TODO add proper authorization check

export async function getConversations() {
  // return Sentry.startSpan(
  //   { name: 'server-action.getConversations', op: 'server.action' },
  //   async () => {
      const supabase = await createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Unauthorized');
      }

      // Fetch all conversations for this user from the mock API
      try {
        const conversations = [
          { id: '1', name: null }, // Will fallback to 'Untitled'
        ];
        // Map to Conversation type if needed
        return conversations.map((convo: any) => ({
          conversationId: convo.id,
          name: convo.name ?? 'Untitled',
        })) as Conversation[];
      } catch (error) {
        console.error('Error fetching conversations from mock API:', error);
        throw error;
      }
  //   }
  // );
}

export async function createConversation(userId: string) {
   // Simulate a newly created conversation
   const newConversation = {
    conversationId: `mock-convo-${Date.now()}`, // unique ID
    name: 'Untitled',
    userId, // optional, keep if needed
  };

  console.log('✅ Created conversation (mocked):', newConversation);

  // Return the conversation as if the API responded
  return newConversation;

}

export async function deleteConversation(conversationId: string) {
  // return Sentry.startSpan(
  //   { name: 'server-action.deleteConversation', op: 'server.action' },
  //   async () => {
      const supabase = await createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Unauthorized');
      }
      return true;
  //   }
  // );
}

export async function updateConversation(conversationId: string, name: string) {
  // return Sentry.startSpan(
  //   { name: 'server-action.updateConversation', op: 'server.action' },
  //   async () => {
      const supabase = await createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Unauthorized');
      }

      return true;
  //   }
  // );
}
