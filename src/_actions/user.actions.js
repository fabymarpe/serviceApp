import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    createService,
    logout
};

/**
 * Login action
 *
 * @param username
 * @param password
 * @returns {function(*)}
 */
function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

/***
 * Create service action
 *
 * @param addressOne
 * @param addressTwo
 * @returns {function(*)}
 */
function createService(addressOne, addressTwo){
    return dispatch => {

        userService.createService(addressOne, addressTwo)
            .then(
                data => {
                    dispatch({ type: userConstants.SERVICE_REQUEST, data });
                },
                error => {
                    dispatch({ type: userConstants.LOGIN_FAILURE, error });
                    dispatch(alertActions.error(error));
                }
            );
    };

}

/**
 * Logout action
 *
 * @returns {{type: string}}
 */
function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}