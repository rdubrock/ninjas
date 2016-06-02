"use strict"

import React from "react";
import ReactDOM from "react-dom";
import {Modal, Button, Grid} from "react-bootstrap";
const apiKey = "fPrw65OQb0mshVolXUIZ2TtZaQr2p1Md4c8jsn1lBPos0wcPXu";
const URL = "https://yoda.p.mashape.com/yoda?sentence=";

class TextWrittenInStoneNinjas extends React.Component {
  render() {
    return (
      <div className="well well-sm">
      <i>{this.props.preview}</i>
      </div>
    );
  }
}

class CommentsNinjas extends React.Component {
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
          // ReactDOM.render(modalInstance, mountNode);
          // this.deleteComment(comment)
        }>Delete Comment</Button>
      </li>
    );
  }
}

class SubmitNinjas extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      preview: '',
      comments: []
    };
  }
  deleteComment(comment) {
    let index = this.state.comments.findIndex( (element) => comment === element);
    this.state.comments.splice(index, 1);
    this.setState({comments: this.state.comments})
}
  textChange(e) {
    console.log(e.target.value);
    this.setState({preview: e.target.value})
  }
  submitComment(e) {
    let requestYodaSpeak = new Request(URL + this.state.preview, {
      headers: {
        'X-Mashape-Key': apiKey,
        'Accept': "text/plain"
      }
    });
    fetch(requestYodaSpeak).then(
      (response) => response.text()
    ).then(
      (text) => {
        console.log(text);
      this.setState({comments: this.state.comments.concat(text)});
    })
  }
  render() {
    console.log("Submit Ninjas Rendered");
    return (
      <Grid>
        <label for="speakToYodaInput">Enter Your Yoda Message Here:</label>
        <div className="input-group">
        <input type='text' className="form-control" id="speakToYodaInput" placeholder='Enter some ninjas kicking text here' onChange={(e) => this.textChange(e)}/>
        <span className="input-group-btn">
        <button type='button' className="btn btn-success" id="speakToYodaInput" onClick={
          this.submitComment.bind(this)
        }>Click this dang thing now!</button>
        </span>
        </div>
        <br></br>
        {this.state.preview ? <TextWrittenInStoneNinjas preview={this.state.preview}/> : null}
        <ul className="list-group">
          {this.state.comments.map((comment, index) => <CommentsNinjas key={index} comment={comment} deleteComment={this.deleteComment.bind(this)}/>)}
        </ul>
      </Grid>
    );
  }
}

ReactDOM.render(
  <SubmitNinjas />,
  document.getElementById('content')
);

// 1) When you click the button, it needs to save the current value of the input into setState
// 2) Then, it needs to clear the value of the input.
// 3) Then, you have to make a component that shows all of the submitted comments. Hint: this should be a li. There should be a ul in the parent component (within SubmitNinjas)
// 4) Then, you have to render all of your submitted comments
// **BONUS** If you click on a comment (once it's already there), it changes the text color (toggles between black and blue).
// **BONUS 2** ES 6-ify it all. Will want to declare all functions and components differently (and variables, if declaring)
// **BONUS 3** Go through Udacity course (as much as possible) https://www.udacity.com/course/object-oriented-javascript--ud015
// Make a modal to confirm whether you should delete the comment.
// Make the page persist with a page refresh. Hint: use local storage for making it persist Hint 2: put comments array into local storage.

// The OLD JS way:

// var apiKey = "fPrw65OQb0mshVolXUIZ2TtZaQr2p1Md4c8jsn1lBPos0wcPXu";
// var URL = "https://yoda.p.mashape.com/yoda?sentence=";
//
// var TextWrittenInStoneNinjas = React.createClass({
//   render: function() {
//     return (
//       <h1>
//       {this.props.preview}
//       </h1>
//     );
//   }
// });

// var CommentsNinjas = React.createClass({
//   getInitialState: function() {
//     return {
//       clicked: false
//     }
//   },
//   clickToggle: function() {
//     this.setState({clicked: !this.state.clicked})
//   },
//   render: function() {
//     console.log("Comments Ninjas rendered")
//     return (
//       <li onClick={this.clickToggle}>
//         {this.state.clicked ?
//           <s>{this.props.comment}</s>
//         : this.props.comment}
//       </li>
//     )
//   }
// })
// var SubmitNinjas = React.createClass({
//   getInitialState: function() {
//     return {
//       preview: '',
//       comments: []
//     }
//   },
//   textChange: function(e) {
//     console.log(e.target.value);
//     this.setState({preview: e.target.value})
//   },
//   submitComment: function(e) {
//     var self = this;
//     var requestYodaSpeak = new Request(URL + this.state.preview, {
//       headers: {
//         'X-Mashape-Key': apiKey,
//         'Accept': "text/plain"
//       }
//     });
//     fetch(requestYodaSpeak).then(function(response) {
//       return response.text()
//     }).then(function(text) {
//       console.log(text);
//       self.setState({comments: self.state.comments.concat(text)});
//     })
//   },
//   render: function() {
//     console.log("Submit Ninjas Rendered");
//     return (
//       <div>
//         <input type='text' placeholder='Enter some ninjas kicking text here' onChange={this.textChange}/>
//         <button type='button' onClick={
//           this.submitComment
//         }>Click this dang thing now!</button>
//         <TextWrittenInStoneNinjas preview={this.state.preview}/>
//         <ul>
//           {this.state.comments.map(function(comment, index) {
//             return <CommentsNinjas key={index} comment={comment}/>
//           })}
//         </ul>
//       </div>
//     );
//   }
// });
