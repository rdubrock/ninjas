// Fix local storage and fix delete comment. Both are broken (local storage does not save/retrieve. Deleting a comment deletes the wrong comment)

import React from "react";
import {Button, Grid} from "react-bootstrap";
import TextToAnalyze from "./textToAnalyze";
import Preview from "./preview";
// import watson from "watson-developer-cloud";
const username = "051111a8-6bc4-4e6e-a88d-8d340b69598b";
const password = "GdXQFWYlCQhz";
// const apiKey = "fPrw65OQb0mshVolXUIZ2TtZaQr2p1Md4c8jsn1lBPos0wcPXu";
const URL = "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19";

class TextList extends React.Component {
  constructor(props, context) {
    super(props, context);
    let parsedComments;
    if (window.localStorage.comments) {
      parsedComments = JSON.parse(window.localStorage.comments)
    }
    this.state = {
      preview: '',
      comments: parsedComments || []
    };
  }
  deleteComment(comment) {
    let nooStorage = JSON.parse(window.localStorage.comments);
    let index = this.state.comments.findIndex( (element) => comment === element.text);
    console.log(index);
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
    let sendTextToWatson = new Request('/watsonRequest', {
      headers: {
        'Content-Type': 'application/JSON',
        'Accept': 'application/JSON',
        // 'Access-Control-Allow-Origin': 'no-cors'
      }
    });
    fetch(sendTextToWatson, {
      method: 'POST',
      body: JSON.stringify({
        text: this.state.preview
      })
    }).then(
      (response) => response.json()
    ).then(
      (json) => {
        this.state.comments.push({
          text: this.state.preview,
          documentToneCategories: json.document_tone.tone_categories,
          sentencesTone: json.sentences_tone
        })
        this.setState({comments: this.state.comments});
        window.localStorage.setItem('comments', JSON.stringify(this.state.comments))
        // if (!window.localStorage.comments) {
        //   window.localStorage.setItem('comments', JSON.stringify([this.state.comments]))
        // } else {
        //   let oldLocalStorage = JSON.parse(localStorage.comments);
        //   let newLocalStorage = oldLocalStorage.push(this.state.preview);
        //   window.localStorage.setItem('comments', JSON.stringify(newLocalStorage))
        // }
      }
    )
  //   var tone_analyzer = watson.tone_analyzer({
  //     username,
  //     password,
  //     version: 'v3',
  //     version_date: '2016-05-19'
  //   });
  //   tone_analyzer.tone({
  //     text: this.state.preview
  //   },
  // function(err, tone) {
  //   if (err) console.log(err);
  //   else {
  //     console.log(JSON.stringify(tone, null, 2));
  //   }
  // })
    // fetch(sendTextToWatson).then(
    //   (response) => response.text()
    // ).then(
    //   (text) => {
    //     console.log(text);
    //   if (!window.localStorage.comments) {
    //     window.localStorage.setItem('comments', JSON.stringify([text]));
    //   } else if (window.localStorage.comments.length > 0) {
    //     let locoLocal = JSON.parse(window.localStorage.comments);
    //     locoLocal.push(text);
    //     // console.log(locoLocal);
    //     window.localStorage.setItem('comments', JSON.stringify(locoLocal));
    //   }
    //   this.setState({comments: this.state.comments.concat(text)});
    // })
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
        {this.state.preview ? <Preview preview={this.state.preview}/> : null}
        <ul className="list-group">
          {this.state.comments.map((comment, index) => <TextToAnalyze key={index} text={comment.text} documentToneCategories={comment.documentToneCategories} deleteComment={this.deleteComment.bind(this)}/>)}
        </ul>
      </Grid>
    );
  }
}

export default TextList;
