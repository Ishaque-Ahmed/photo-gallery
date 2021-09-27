import React from "react";
import Loading from "./Loading";

const LoadFeedback = props => {
    //console.log(props);
    if (props.isFeedbackLoading) {
        return (
            <Loading />
        )
    } else {
        return (
            props.feedbacks.map(feedback => {
                return (
                    <div key={feedback.id}>
                        <h5>Author: {feedback.author}</h5>
                        <p>Rating: {feedback.rating}</p>
                        <p>{feedback.feedback}</p>
                    </div>
                )
            })
        )
    }
}

export default LoadFeedback;