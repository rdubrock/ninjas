import React, {Component} from "react";
import {Jumbotron, PageHeader} from "react-bootstrap";

class TextExplanation extends Component {
  render() {
    return (
      <div>
      <PageHeader>
        Welcome to the Amazing Tone Analyzer!
      </PageHeader>
      <Jumbotron>
        <p>This analyzer interfaces with the IBM Watson<sup>TM</sup> Tone Analyzer API. Type a message below, and Watson will respond with information about the tone of your message.</p>
      </Jumbotron>
      </div>
    );
  }
}

export default TextExplanation
