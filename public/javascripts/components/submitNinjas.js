import React from "react";
import {Button, Grid} from "react-bootstrap";
import CommentsNinjas from "./commentsNinjas";
import TextWrittenInStoneNinjas from "./textWrittenInStoneNinjas";
const apiKey = "fPrw65OQb0mshVolXUIZ2TtZaQr2p1Md4c8jsn1lBPos0wcPXu";
const URL = "https://yoda.p.mashape.com/yoda?sentence=";

class SubmitNinjas extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      preview: '',
      comments: JSON.parse(window.localStorage.comments) || []
    };
  }
  deleteComment(comment) {
    let nooStorage = JSON.parse(window.localStorage.comments);
    let index = this.state.comments.findIndex( (element) => comment === element);
    this.state.comments.splice(index, 1);
    this.setState({comments: this.state.comments});
    nooStorage.splice(index, 1);
    window.localStorage.setItem('comments', JSON.stringify(nooStorage));
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
      if (!window.localStorage.comments) {
        window.localStorage.setItem('comments', JSON.stringify([text]));
      } else if (window.localStorage.comments.length > 0) {
        let locoLocal = JSON.parse(window.localStorage.comments);
        locoLocal.push(text);
        // console.log(locoLocal);
        window.localStorage.setItem('comments', JSON.stringify(locoLocal));
      }
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

export default SubmitNinjas;
