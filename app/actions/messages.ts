'use server';
import { createClient } from '@/utils/supabase/server';
import { Message } from '@/utils/types';
// import * as Sentry from '@sentry/nextjs';

export async function getMessages(conversationId: string): Promise<Message[]> {
  // return Sentry.startSpan(
  //   { name: 'server-action.getMessages', op: 'server.action' },
  //   async () => {
      const supabase = await createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Unauthorized');
      }

      const rawMessages = [
        {
          id: 'm1',
          conversationId: conversationId,
          sender: 'user',
          text: 'Hello!',
          timestamp: '2025-09-01T12:00:00Z',
        },
        {
          id: 'm2',
          conversationId: conversationId,
          sender: 'ai',
          text: 'Hi there! How can I help you today?',
          timestamp: '2025-09-01T12:00:05Z',
        },
      ];

      // Build final message array with thinking data properly attached
      const messages: Message[] = [];

      rawMessages.forEach((message: any) => {
        if (message.is_user) {
          // User message - no thinking data
          messages.push({
            id: message.id,
            content: message.content,
            isUser: true,
            metadata: message.metadata,
          });
        } else {
          // AI message - get thinking data from map
          // const thinking = thinkingDataMap.get(message.id);

          messages.push({
            id: message.id,
            content: message.content,
            isUser: false,
            metadata: message.metadata,
            // thinking,
          });
        }
      });
      return messages;
  //   }
  // );
}

export async function getThought(conversationId: string, messageId: string) {
  // return Sentry.startSpan(
  //   { name: 'server-action.getThought', op: 'server.action' },
  //   async () => {
      const supabase = await createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Unauthorized');
      }

      try {
        // Hardcoded metamessages
  const allMetamessages = [
    {
      id: 'mm1',
      conversationId: conversationId,
      message_id: messageId,
      type: 'thought',
      content: 'I think this is important.',
    },
    {
      id: 'mm2',
      conversationId: conversationId,
      message_id: messageId,
      type: 'note',
      content: 'Remember to check this later.',
    },
    {
      id: 'mm3',
      conversationId: conversationId,
      message_id: messageId,
      type: 'thought',
      content: 'Maybe rephrase this sentence.',
    },
  ];

        // Filter in-memory for each type
        const thoughts = allMetamessages.filter(
          (m: any) =>
            m.conversationId === conversationId &&
            m.message_id === messageId &&
            m.type === 'thought'
        );
        const dialectic = allMetamessages.filter(
          (m: any) =>
            m.conversationId === conversationId &&
            m.message_id === messageId 
            // m.type === 'honcho'
        );
        const pdf = allMetamessages.filter(
          (m: any) =>
            m.conversationId === conversationId &&
            m.message_id === messageId &&
            m.type === 'pdf'
        );

        const thoughtText = thoughts[0]?.content;
        const dialecticText = dialectic[0]?.content;
        const pdfText = pdf[0]?.content;

        if (!thoughtText && !dialecticText && !pdfText) {
          return null;
        }

        let completeThought = thoughtText ?? '';

        if (dialecticText) {
          completeThought += '\n\nDialectic Response:\n\n' + dialecticText;
        }

        if (pdfText) {
          completeThought += '\n\nPDF Agent Response:\n\n' + pdfText;
        }

        return completeThought;
      } catch (error) {
        console.error('Error in getThought:', error);
        throw new Error('Internal server error');
      }
  //   }
  // );
}

export async function addOrRemoveReaction(
  conversationId: string,
  messageId: string,
  reaction: 'thumbs_up' | 'thumbs_down' | null
) {
  // return Sentry.startSpan(
  //   { name: 'server-action.addOrRemoveReaction', op: 'server.action' },
  //   async () => {
      const supabase = await createClient();

      // const honchoApp = await getHonchoApp();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Unauthorized');
      }

      if (reaction && !['thumbs_up', 'thumbs_down'].includes(reaction)) {
        throw new Error('Invalid reaction type');
      }

      // Hardcoded message
      const message = {
        id: messageId,
        conversationId: 'conv1',
        text: 'Hello world!',
        sender: 'user',
        metadata: {
      reaction: 'like', // existing reaction, can be overwritten
    },
  };

      if (!message) {
        throw new Error('Message not found');
      }

      const metadata = message.metadata || {};
  //   }
  // );
}
