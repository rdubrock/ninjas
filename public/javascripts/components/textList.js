import React from "react";
import {Button, Grid} from "react-bootstrap";
import TextToAnalyze from "./textToAnalyze";
import Preview from "./preview";
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
    this.state.comments.splice(index, 1);
    this.setState({comments: this.state.comments});
    nooStorage.splice(index, 1);
    window.localStorage.setItem('comments', JSON.stringify(nooStorage));
}
  textChange(e) {
    this.setState({preview: e.target.value})
  }
  submitComment(e) {
    let sendTextToWatson = new Request('/watsonRequest', {
      headers: {
        'Content-Type': 'application/JSON',
        'Accept': 'application/JSON',
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
      }
    )
  }
  render() {
    return (
      <Grid>
        <label for="speakToWatsonInput">Enter Your Message for Watson Here:</label>
        <div className="input-group">
        <input type='text' className="form-control" id="speakToWatsonInput" placeholder='Enter a message for the Watson tone analyzer' onChange={(e) => this.textChange(e)}/>
        <span className="input-group-btn">
        <button type='button' className="btn btn-success" id="speakToWatsonInput" onClick={
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
