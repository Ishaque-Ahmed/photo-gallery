import React from "react";
import { Card, CardBody, CardImg } from 'reactstrap';
import { baseUrl } from "../../redux/BaseUrl";
import FeedbackFrom from "./FeedbackForm";
import LoadFeedback from "./LoadFeedback";

const ImageDetails = props => {
    //console.log(props);
    // console.log(props.addFeedback);
    return (
        <div>
            <Card className="m-3">
                <CardImg
                    top
                    src={baseUrl + props.photo.image}
                    alt="Demo Img"
                />
                <CardBody>
                    <hr />
                    <h5 className="text-center">Feedbacks</h5>
                    <LoadFeedback feedbacks={props.feedbacks}
                        isFeedbackLoading={props.isFeedbackLoading} />
                    <FeedbackFrom photId={props.photo.photId}
                        addFeedback={props.addFeedback}
                    />
                </CardBody>
            </Card>
        </div>
    )
}
export default ImageDetails;