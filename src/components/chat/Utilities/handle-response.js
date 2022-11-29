import { useSnackbar } from 'notistack';

import { authenticationService } from '../Services/authenticationService';

// handles the response by parsing JSON
const useHandleResponse = () => {
    const { enqueueSnackbar } = useSnackbar();

    const handleResponse = response => {
        return response.text().then(text => {
            const data = text && JSON.parse(text);

            return data;
        });
    };

    return handleResponse;
};

export default useHandleResponse;
