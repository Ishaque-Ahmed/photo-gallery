import React, { Component } from "react";
import { connect } from "react-redux";
import { CardColumns, Alert, Modal, ModalBody, Button, ModalFooter } from "reactstrap";
import { fetchPhotos, addFeedback, fetchFeedback } from "../../redux/actionCreators";
import Loading from "./Loading";
import Single from "./Single";
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


class Education extends Component {
    state = {
        selectedPhoto: null,
        modalOpen: false,
    }
    onImageSelect = photo => {
        this.setState({
            selectedPhoto: photo,
            modalOpen: !this.state.modalOpen,
        })
    }
    modalToggler = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    componentDidMount() {
        this.props.fetchPhotos();
        this.props.fetchFeedback();
    }
    render() {
        document.title = "Education";
        if (this.props.isLoading) {
            return (
                <Loading />
            );
        } else if (this.props.errMsg !== null) {
            return (
                <Alert color="danger" style={{ marginTop: "80px" }}>
                    {this.props.errMsg}, Make Sure The JSON SERVER IS ON
                </Alert>
            );
        } else {
            const photo = this.props.photos.map(item => {
                let single = null;
                if (item.categoryId === 0) {
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
                    <div style={{ marginTop: "80px" }}>
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
export default connect(mapStateToProps, mapDispatchToProps)(Education);
