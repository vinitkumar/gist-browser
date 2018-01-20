import React, { Component } from 'react';
import Moment from 'moment';
import {Link} from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

class Gist extends Component {
  constructor(props) {
    super(props);
    this.gist = this.props.gist;
    this.state = {
      allRawFiles: null,
    };
  }

  componentDidMount() {
    if (!this.gist) {
      return;
    }
    const self = this;
    const allFiles = Object.values(this.gist.files);
    let allRawFilesArray = [];
    allFiles.forEach((file, key) => {
      const raw_url = file.raw_url;
      const fileName = file.raw_url.split('/')[file.raw_url.split('/').length - 1];
      fetch(raw_url)
        .then((response) => response.text())
        .then((content) => {
          allRawFilesArray.push({
            content: content,
            language: file.language,
            fileName: fileName,
          });
          self.setState({
            content: content,
            language: file.language
          });
        });
    });
    this.setState({allRawFiles: allRawFilesArray});
  }

  render() {
    if (!this.gist) {
      return (
        <div className="alert alert-danger">
          This gist is not available anymore. <Link to="/">Go home</Link>.
        </div>
      );
    }
    const allFiles = this.state.allRawFiles;
    let allFilesContainer = null;
    if (allFiles !== null) {
      allFilesContainer = [];
      allFiles.forEach((fileObject, key) => {
        allFilesContainer.push(
          <div key={key}>
            <pre>{fileObject.fileName}</pre>
            <SyntaxHighlighter language={fileObject.language} style={docco}>{fileObject.content}</SyntaxHighlighter>
          </div>
        );
      });
    }

    return(
        <div className="gistResultContainer">
          <h1>{this.gist.id}</h1>
          <pre>Created on {Moment(this.gist.created_at).format('LLL')}</pre>
          <pre>{this.gist.description}</pre>
          {allFilesContainer}
          </div>
    );
  }

}


export default Gist;