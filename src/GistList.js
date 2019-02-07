import React from 'react';
import {Link} from 'react-router-dom';

function GistList(props) {
  return(
      <div>
        <ul className="gistList">
          {props.gists && props.gists.map((gist, key) => (
            <li className="gist-item" key={key}>
              <Link to={`/gist/${gist.id}`}>
                <img className="avatarImg" src={gist.owner.avatar_url + '&s=20'} height="20" width="20" alt="avatar-img" /><span>{gist.owner.login}'s gist</span>
              </Link>
            </li>
          )
          )}
        </ul>
      </div>
    );
}


export default GistList;
