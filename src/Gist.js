import React, {Fragment, useState, useEffect, useTransition} from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import {Link} from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Loader from './Loader';

function Gist(props) {
  const [allRawFiles, setallRawFiles] = useState(null);
  const [language, setlanguage] = useState(null);
  const [content, setcontent] = useState(null);
  const [ispending, startTransition] = useTransition();

  const gist = props.gist;

  useEffect(() => {
     if (!gist) {
      return;
    }
    console.log(content);
     startTransition(() => {
         const allFiles = Object.values(gist.files);
        let allRawFilesArray = [];
        allFiles.forEach((file, key) => {
        console.log(key);
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

     });
  }, []);

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
          <SyntaxHighlighter language={fileObject.language} style={dark}>
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
        {ispending && (
          <Fragment>
            <p> Please wait, loading gist</p> <Loader />{' '}
          </Fragment>
        )}
        {!ispending && allFilesContainer}
      </div>
  );
}

Gist.propTypes = {
  gist: PropTypes.object,
  files: PropTypes.array,
  owner: PropTypes.object,
  created_at: PropTypes.string,
  description: PropTypes.string,
};


export default Gist;
