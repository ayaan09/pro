import { useSnackbar } from 'notistack';

import useHandleResponse from '../Utilities/handle-response';
import authHeader from '../Utilities/auth-header';

// get list of users from the backend using 'fetch'
export function useGetUsers() {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    const getUsers = () => {
        return fetch(
            `${process.env.REACT_APP_API_URL}/api/auth/user`,
            requestOptions
        )
            .then(handleResponse)
            .catch(() =>
                enqueueSnackbar('Could not load Users', {
                    variant: 'error',
                })
            );
    };

    return getUsers;
}
