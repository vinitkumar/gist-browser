import React, {Fragment, useState, useEffect} from 'react';
import Moment from 'moment';
import {Link} from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {docco} from 'react-syntax-highlighter/styles/hljs';
import Loader from './Loader';

function Gist(props) {
  const [allRawFiles, setallRawFiles] = useState(null);
  const [language, setlanguage] = useState(null);
  const [content, setcontent] = useState(null);
  const [loading, setloading] = useState(true);

  const gist = props.gist;

  useEffect(() => {
     if (!gist) {
      return;
    }
    const allFiles = Object.values(gist.files);
    let allRawFilesArray = [];
    allFiles.forEach((file, key) => {
      const raw_url = file.raw_url;
      const fileName = file.raw_url.split('/')[
        file.raw_url.split('/').length - 1
      ];
      fetch(raw_url)
        .then(response => response.text())
        .then(content => {
          allRawFilesArray.push({
            content: content,
            language: file.language,
            fileName: decodeURIComponent(fileName),
          });
          setcontent(content);
          setlanguage(language);
        });
    });
    setallRawFiles(allRawFilesArray);
    setloading(false)
  }, {})

  if (!gist) {
      return (
        <div className="alert alert-danger">
          This gist is not available anymore. <Link to="/">Go home</Link>.
        </div>
      );
  }

  const allFiles = allRawFiles;
  let allFilesContainer = null;
  if (allFiles !== null) {
    allFilesContainer = [];
    allFiles.forEach((fileObject, key) => {
      allFilesContainer.push(
        <div key={key}>
          <pre>{fileObject.fileName}</pre>
          <SyntaxHighlighter language={fileObject.language} style={docco}>
            {fileObject.content}
          </SyntaxHighlighter>
        </div>,
      );
    });
  }

  return(
      <div className="gistResultContainer">
        <h3>{gist.owner.login} shared the gist:</h3>
        <small>
          <pre>Created on {Moment(gist.created_at).format('LLL')}</pre>
        </small>
        <pre>{gist.description}</pre>
        {loading && (
          <Fragment>
            <p> Please wait, loading gist</p> <Loader />{' '}
          </Fragment>
        )}
        {!loading && allFilesContainer}
      </div>
  );
}


export default Gist;
