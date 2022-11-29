import { useSnackbar } from 'notistack';

import useHandleResponse from '../Utilities/handle-response';
import authHeader from '../Utilities/auth-header';

// Receive global messages
export function useGetGlobalMessages() {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
        credentials: 'include'
    };

    const getGlobalMessages = () => {
        return fetch(
            'https://sunnysocial.herokuapp.com/api/message/global',
            requestOptions
        )
            .then(handleResponse)
            .catch(() =>
                enqueueSnackbar('Could not load Global Chat', {
                    variant: 'error',
                })
            );
    };

    return getGlobalMessages;
}

// Send a global message
export function useSendGlobalMessage() {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();

    const sendGlobalMessage = body => {
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({ body: body, global: true }),
            credentials: 'include'
        };

        return fetch(
            'https://sunnysocial.herokuapp.com/api/message/global',
            requestOptions
        )
            .then(handleResponse)
            .catch(err => {
                console.log(err);
                enqueueSnackbar('Could not send message', {
                    variant: 'error',
                });
            });
    };

    return sendGlobalMessage;
}

// Get list of users conversations
export function useGetConversations() {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
        credentials: 'include'
    };

    const getConversations = () => {
        return fetch(
            'https://sunnysocial.herokuapp.com/api/message/conversation',
            requestOptions
        )
            .then(handleResponse)
            .catch(() =>
                enqueueSnackbar('Could not load chats', {
                    variant: 'error',
                })
            );
    };

    return getConversations;
}

// get conversation messages based on to and from id's
export function useGetConversationMessages() {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
        credentials: 'include'
    };

    const getConversationMessages = id => {
        return fetch(
            'https://sunnysocial.herokuapp.com/api/message/conversation/query?userId=${id}',
            requestOptions
        )
            .then(handleResponse)
            .catch(() =>
                enqueueSnackbar('Could not load chats', {
                    variant: 'error',
                })
            );
    };

    return getConversationMessages;
}

// send conversation messages
export function useSendConversationMessage() {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();

    const sendConversationMessage = (id, body) => {
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({ to: id, body: body }),
            credentials: 'include'
        };

        return fetch(
            'https://sunnysocial.herokuapp.com/api/message/',
            requestOptions
        )
            .then(handleResponse)
            .catch(err => {
                console.log(err);
                enqueueSnackbar('Could not send message', {
                    variant: 'error',
                });
            });
    };

    return sendConversationMessage;
}
