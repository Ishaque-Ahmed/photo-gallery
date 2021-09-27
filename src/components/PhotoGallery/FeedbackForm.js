import React, { Component } from "react";
import { Form, Input, Button } from 'reactstrap';

class FeedbackFrom extends Component {

    state = {
        author: "",
        feedback: "",
        rating: "",
    }


    handleSubmit = event => {
        this.props.addFeedback(this.props.photId, this.state.rating, this.state.author,
            this.state.feedback)
        this.setState({
            author: "",
            feedback: "",
            rating: "",
        })
        event.preventDefault();
    }
    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        //console.log(this.props);
        return (
            <div>
                <Form onSubmit={event => this.handleSubmit(event)}>
                    <Input
                        type="text"
                        name="author"
                        value={this.state.author}
                        placeholder="Your Name"
                        onChange={event => this.handleInputChange(event)}
                        required /><br />
                    <Input
                        type="select"
                        name="rating"
                        value={this.state.rating}
                        onChange={event => this.handleInputChange(event)}
                    >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input><br />
                    <Input
                        type="textarea"
                        name="feedback"
                        value={this.state.feedback}
                        placeholder="Your Feedback"
                        onChange={event => this.handleInputChange(event)}
                        required
                    /><br /><br />
                    <Button type="submit">Submit Feedback</Button>
                </Form>

            </div>
        )
    }
}
export default FeedbackFrom;