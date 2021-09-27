import React, { Component } from "react";
import { Card, CardImg, CardBody } from 'reactstrap';
import { baseUrl } from "../../redux/BaseUrl";

class Single extends Component {


    render() {
        //console.log(this.props);
        return (
            <div style={{ float: "left" }}>
                <Card className="m-2" >
                    <CardBody className="">
                        <CardImg
                            alt="picture"
                            src={baseUrl + this.props.photo.image}
                            style={{ width: "310px", height: "260px", cursor: "pointer" }}
                            onClick={this.props.onImageSelect}
                        />
                    </CardBody>
                </Card>
            </div>
        )
    }

}

export default Single;