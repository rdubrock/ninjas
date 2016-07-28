import React, {Component} from "react";
import {Modal, Button, Table} from "react-bootstrap";

class TextToAnalyze extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.clickToggle = this.clickToggle.bind(this)
  }
  clickToggle() {
    this.setState({clicked: !this.state.clicked})
  }
  deleteComment(text) {
    this.props.deleteComment(text);
  }
  render() {
    const {text, documentToneCategories} = this.props;
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
              this.deleteComment(text);
              this.setState({modal: false})
          }
        }>Delete the suckah!</Button>
          </Modal.Footer>

        </Modal.Dialog>
      </div>
    );
    console.log("Comments Ninjas rendered");
    console.log(documentToneCategories);
    return (
      <li className="list-group-item list-group-item-warning">
        {clicked ?
          <span onClick={this.clickToggle}><s>{text}</s></span>
        : <span onClick={this.clickToggle}>{text}</span>}
        {modal ?
        modalInstance
        : null}
        <Button type="button" bsStyle="primary" style={{float: "right"}} onClick={() =>
          this.setState({modal: true})
        }>Delete Comment</Button>
        <div><i><b>Most prevalent tone:&nbsp;
        {documentToneCategories[0].tones.sort(function(a, b) {
          return b.score - a.score;
        })[0].tone_name}
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Emotion Tone</th>
              <th>Score</th>
              <th>Intensity</th>
            </tr>
          </thead>
          <tbody>
          {documentToneCategories[0].tones.sort(function(a, b) {
            return b.score - a.score;
          }).map(function (toneCategory, index) {
            return (
            <tr key={index}>
              <td>{toneCategory.tone_name}</td>
              <td>{toneCategory.score}</td>
              <td>{ (toneCategory.score > .75) ? "Highly Likely" : ((toneCategory.score < .5) ? "Not Likely" : "Somewhat Likely" )}</td>
            </tr>
          )
          })}
          </tbody>
        </Table>
        </b></i>
      </div>
      </li>
    );
  }
}

export default TextToAnalyze;
