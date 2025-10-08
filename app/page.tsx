// import { getChatAccessWithUser } from '@/utils/supabase/actions';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Chat from './Chat';
import { getConversations } from './actions/conversations';
import { getMessages } from './actions/messages';
import { type Message } from '@/utils/types';

export default async function Home() {
  console.log('START Home page rendering');

  const supabase = await createClient();

  // Get user session on server
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    console.log('No user or error, redirecting to /auth');
    redirect('/auth');
  }

  // Get initial subscription state
  //const isDevMode = process.env.NEXT_PUBLIC_STRIPE_ENABLED === 'false';
  const isDevMode = true; //process.env.NEXT_PUBLIC_STRIPE_ENABLED === 'false';
  
  const realChatAccess = { isSubscribed: true, freeMessages: 100 } 

  const chatAccess = {
    isSubscribed: realChatAccess.isSubscribed,
    freeMessages: realChatAccess.freeMessages,
    canChat: realChatAccess.isSubscribed || realChatAccess.freeMessages > 0,
  };

  // Get initial conversations
  const conversations = await getConversations();

  // Get messages for the first conversation if it exists
  let initialMessages: Message[] = [];
  let initialConversationId: string | undefined = undefined;

  console.log('initialConversationId:', initialConversationId);
  if (conversations.length > 0) {
    initialConversationId = conversations[0].conversationId;
    initialMessages = await getMessages(initialConversationId!);
  }
  console.log("👉 conversations:", conversations);
   console.log("👉 conversations1234:", conversations);
  return (
    <>
      <Chat
        initialUserId={user.id}
        initialEmail={user.email}
        initialConversations={conversations}
        initialMessages={initialMessages}
        initialConversationId={initialConversationId}
        initialChatAccess={chatAccess}
      />
    </>
  );
}
