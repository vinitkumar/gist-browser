import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class GistList extends Component {
  render() {
    return(
      <div>
        <ul className="gistList">
          {this.props.gists && this.props.gists.map((gist, key) => (
            <li className="gist-item" key={key}>
              <Link to={`/gist/${gist.id}`}>
                <img className="avatarImg" src={gist.owner.avatar_url + '&s=20'} height="20" width="20" /><span>{gist.owner.login}'s gist</span>
              </Link>
            </li>
          )
          )}
        </ul>
      </div>
    );
  }
}

export default GistList;
