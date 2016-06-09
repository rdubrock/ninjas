import React, {Component} from "react";
import {Modal, Button} from "react-bootstrap";

class CommentsNinjas extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.clickToggle = this.clickToggle.bind(this)
  }
  clickToggle() {
    this.setState({clicked: !this.state.clicked})
  }
  deleteComment(comment) {
    this.props.deleteComment(comment);
  }
  render() {
    const {comment} = this.props;
    const {clicked, modal} = this.state;
    const modalInstance = (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Delete a Ninja</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Are you sure you want to delete this ninja?
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => this.setState({modal: false})}>No! Save the ninja!</Button>
            <Button bsStyle="danger" onClick={() => {
              this.deleteComment(comment);
              this.setState({modal: false})
          }
        }>Delete the suckah!</Button>
          </Modal.Footer>

        </Modal.Dialog>
      </div>
    );
    console.log("Comments Ninjas rendered")
    return (
      <li className="list-group-item list-group-item-warning">
        {clicked ?
          <span onClick={this.clickToggle}><s>{comment}</s></span>
        : <span onClick={this.clickToggle}>{comment}</span>}
        {modal ?
        modalInstance
        : null}
        <Button type="button" bsStyle="primary" style={{float: "right"}} onClick={() =>
          this.setState({modal: true})
        }>Delete Comment</Button>
      </li>
    );
  }
}

export default CommentsNinjas;
