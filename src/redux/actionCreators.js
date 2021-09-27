import * as actionTypes from './actionTypes';
import axios from 'axios';
import { baseUrl } from './BaseUrl';

export const loadPhotos = photos => ({
    type: actionTypes.LOAD_PHOTOS,
    payload: photos,
})

export const photosLoading = () => ({
    type: actionTypes.PHOTOS_LOADING,
})

export const photosFailed = errMsg => ({
    type: actionTypes.PHOTOS_FAILED,
    payload: errMsg,
})

export const fetchPhotos = () => dispatch => {
    dispatch(photosLoading());
    axios.get(baseUrl + "photos")
        .then(response => response.data)
        .then(photos => dispatch(loadPhotos(photos)))
        .catch(error => dispatch(photosFailed(error.message)));
}

export const feedbackLoading = () => ({
    type: actionTypes.FEEDBACK_LOADING,
})

export const loadFeedback = feedback => ({
    type: actionTypes.LOAD_FEEDBACK,
    payload: feedback,
})

export const fetchFeedback = () => dispatch => {
    dispatch(feedbackLoading());

    axios.get(baseUrl + "feedback")
        .then(response => response.data)
        .then(feedback => dispatch(loadFeedback(feedback)));
}

export const addFeedback = (photoId, rating, author, feedback) => dispatch => {
    const newFeedback = {
        photId: photoId,
        author: author,
        rating: rating,
        feedback: feedback,
    }

    axios.post(baseUrl + 'feedback', newFeedback)
        .then(response => response.data)
        .then(feedback => dispatch(feedbackConcat(feedback)))
}

export const feedbackConcat = feedback => ({
    type: actionTypes.ADD_FEEDBACK,
    payload: feedback,
})



