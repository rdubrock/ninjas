import React, {Component} from "react";

class TextWrittenInStoneNinjas extends Component {
  render() {
    return (
      <div className="well well-sm">
      <i>{this.props.preview}</i>
      </div>
    );
  }
}

export default TextWrittenInStoneNinjas
