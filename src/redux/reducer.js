import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
    photos: [],
    isLoading: false,
    errMsg: null,
    isFeedbackLoading: true,
    feedback: [],
    token: null,
    userId: null,
    authLoading: false,
    authFailedMsg: null,
}

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.PHOTOS_LOADING:
            return {
                ...state,
                photos: [],
                isLoading: true,
                errMsg: null,
            }
        case actionTypes.LOAD_PHOTOS:
            let photos = [];
            for (let key in action.payload) {
                photos.push({
                    ...action.payload[key],
                    id: key,
                })
            }
            return {
                ...state,
                photos: photos,
                isLoading: false,
            }
        case actionTypes.PHOTOS_FAILED:
            return {
                ...state,
                photos: [],
                isLoading: false,
                errMsg: action.payload,
            }

        case actionTypes.ADD_FEEDBACK:
            let feedback = action.payload;
            return ({
                ...state,
                isFeedbackLoading: false,
                feedback: state.feedback.concat(feedback),
            })

        case actionTypes.FEEDBACK_LOADING:
            return {
                ...state,
                isFeedbackLoading: true,
                feedback: [],
            }

        case actionTypes.LOAD_FEEDBACK:
            return {
                ...state,
                isFeedbackLoading: false,
                feedback: action.payload,
            }

        //Auth
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
            }

        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
                authFailedMsg: null,
            }
        case actionTypes.AUTH_LOADING:
            return {
                ...state,
                authLoading: action.payload,
            }
        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                authFailedMsg: action.payload,
            }
        default:
            return state;
    }
}
