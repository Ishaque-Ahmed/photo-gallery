import React, { Component } from "react";
import { connect } from "react-redux";
import { CardColumns, Alert, Modal, ModalBody, Button, ModalFooter } from "reactstrap";
import { fetchPhotos, addFeedback, fetchFeedback } from "../../redux/actionCreators";
import Single from "./Single";
import Loading from "./Loading";
import ImageDetails from "./ImageDetails";

const mapStateToProps = state => {
    return {
        photos: state.photos,
        isLoading: state.isLoading,
        errMsg: state.errMsg,
        feedback: state.feedback,
        isFeedbackLoading: state.isFeedbackLoading,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchPhotos: () => dispatch(fetchPhotos()),
        fetchFeedback: () => dispatch(fetchFeedback()),
        addFeedback: (photId, rating, author, feedback) => dispatch(addFeedback(
            photId, rating, author, feedback
        )),
    }
}

class PhotoGallery extends Component {

    state = {
        selectedPhoto: null,
        modalOpen: false,
    }

    onImageSelect = photo => {
        this.setState({
            selectedPhoto: photo,
            modalOpen: !this.state.modalOpen,
        })
        this.props.fetchFeedback();
    }
    modalToggler = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    componentDidMount() {
        this.props.fetchPhotos();
    }

    render() {
        document.title = "Featured Photos";
        //console.log(this.props);

        if (this.props.isLoading) {
            return (
                <Loading />
            );
        } else if (this.props.errMsg !== null) {
            return (
                <Alert color="danger">{this.props.errMsg}, Make Sure The JSON SERVER IS ON
                </Alert>
            );
        } else {
            const photo = this.props.photos.map(item => {
                let single = null;
                if (item.featured) {
                    single = <Single key={item.photId} photo={item}
                        onImageSelect={() => this.onImageSelect(item)} />
                }
                return single;
            })

            let imageDetails = null;
            if (this.state.selectedPhoto !== null) {
                //console.log(this.state.selectedPhoto);
                const feedbacks = this.props.feedback.filter(item =>
                    item.photId === this.state.selectedPhoto.photId
                )

                imageDetails = <ImageDetails
                    photo={this.state.selectedPhoto}
                    addFeedback={this.props.addFeedback}
                    feedbacks={feedbacks}
                    isFeedbackLoading={this.props.isFeedbackLoading}
                />
            }

            return (
                <div className="container" >
                    <div className="">
                        <CardColumns>
                            {photo}
                        </CardColumns>
                        <Modal isOpen={this.state.modalOpen} >
                            <ModalBody>
                                {imageDetails}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary"
                                    onClick={this.modalToggler}>Close</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
            )

        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PhotoGallery);