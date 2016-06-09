"use strict"

import React from "react";
import ReactDOM from "react-dom";
import {Modal, Button, Grid} from "react-bootstrap";
import SubmitNinjas from './components/submitNinjas';

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
// When getting stuff out of local storage, use JSON.parse(). When putting stuff in, use JSON.stringify().
// Focus on how to get all of comments into local storage
// Then strategize on how to get them out. Right now they are being set with setState, but will need a different strategy to get thme out.
// Then how do you want to pass it to render

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
