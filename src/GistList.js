import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class GistList extends Component {
  render() {
    const gists = this.props.gists;
    const gistArray = [];
    let errorMSGBox = [];
    if (gists !== null && gists.length > 0) {
      gists.forEach((gist, key) => {
        const linkName = gist.description || gist.id;
        gistArray.push(<li className="gist-item" key={key}><Link to={`/gist/${gist.id}`}>{linkName}</Link></li>);
      });
    }
    if (gists !== undefined && Array.isArray(gists) === false) {
      console.log('I am gists', gists);
    }
    return(
      <div>
        <ul className="gistList">
          {gistArray}
          {errorMSGBox}
        </ul>
      </div>
    );
  }
}

export default GistList;