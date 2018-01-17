import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

class Gist extends Component {
  constructor(props) {
    super(props);
    this.gist = this.props.gist;
    this.state = {
      fileContent: null,
      language: null,
    };
  }

  componentDidMount() {
    if (!this.gist) {
      return;
    }
    const self = this;
    const allFiles = Object.values(this.gist.files);
    allFiles.forEach((file, key) => {
      const raw_url = file.raw_url;
      fetch(raw_url)
        .then((response) => response.text())
        .then((content) => {
          self.setState({
            fileContent: content, 
            language: file.language
          });
        });
    });
  }

  render() {
    if (!this.gist) {
      return (
        <div className="alert alert-danger">
          This gist is not available anymore. <Link to="/">Go home</Link>.
        </div>
      );
    }
    return(
        <div className="gistResultContainer">
          <h1>{this.gist.id}</h1>
          <pre>Created on {this.gist.created_at}</pre>
          <pre>{this.gist.description}</pre>
          { this.state.language &&
          <SyntaxHighlighter language={this.state.language} style={docco}>{this.state.fileContent}</SyntaxHighlighter> }
          {!this.state.language && <pre>
              <code lang={this.state.language}>
              {this.state.fileContent}
              </code>
            </pre>
          }
        </div>
    );
  }

}


export default Gist;