import {api} from "./api.ts";
import type {Conversation, Message} from '../../models/profile';

export const conversationsEndpoints = api.injectEndpoints({
    endpoints: (builder) => ({
        createConversation: builder.mutation<Conversation, { profileId: string; participantId: string }>({
            query: ({profileId, participantId}) => ({
                url: `conversations`,
                method: 'POST',
                body: {profileId, participantId},
            }),
            transformResponse: (response: { conversation: Conversation }) => response.conversation,
        }),
        getConversation: builder.query<Conversation, string>({
            query: (conversationId) => `conversations/${conversationId}`,
            transformResponse: (response: { conversation: Conversation }) => response.conversation,
        }),
        getConversationMessages: builder.query <Message[], string>({
            query: (conversationId) => `conversations/${conversationId}/messages`,
            transformResponse: (response: { messages: Message[] }) => response.messages,
            providesTags: ['Messages']
        }),
        sendMessage: builder.mutation<Message, { conversationId: string; profileId: string; content: string }>({
            query: ({conversationId, profileId, content}) => ({
                url: `conversations/${conversationId}/messages`,
                method: 'POST',
                body: {profileId, content},
            }),
            transformResponse: (response: { message: Message }) => response.message,
            invalidatesTags: ['Messages'],
        }),
        getProfileConversations: builder.query<Conversation[], string>({
            query: (profileId) => `conversations/GetByProfile/${profileId}`,
            transformResponse: (response: { conversations: Conversation[] }) => response.conversations,
        }),
        getLatestProfileConversation: builder.query<Conversation | null, string>({
            query: (profileId) => `conversations/GetLatestByProfile/${profileId}`,
            transformResponse: (response: { conversation: Conversation | null }) => response.conversation,
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateConversationMutation,
    useGetConversationQuery,
    useGetConversationMessagesQuery,
    useSendMessageMutation,
    useGetProfileConversationsQuery,
    useGetLatestProfileConversationQuery,
} = conversationsEndpoints;