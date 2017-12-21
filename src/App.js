import React, { Component } from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gistList: null,
    };
  }

  componentDidMount() {
      fetch('https://api.github.com/gists?client_id=2ee21061ca9ec6085e38&&client_secret=f0f906d1f5f02623a010884370655da4595d301d`')
        .then(res => res.json())
        .then(gists => {
          this.setState({gistList: gists})
        });
  }

  render() {
    const gists = this.state.gistList;
    return (
      <Router>
        <div className="App">
          <div className="App-intro">
              <GistList gists={this.state.gistList} />
          </div>
          <div>
            <Route exact path="/"  render={() => <div>Welcome</div>} />
            { gists && (
              <Route path="/gist/:gistId" render={({match})=> (
                <Gist gist={gists.find(g=> g.id === match.params.gistId )} />
              )} /> 
            )}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;


const Gist = ({ gist}) => {
  console.log(typeof(gist.files));
  let filesContainer = [];
  // gist.files.map((file) => {
  //   filesContainer.push(
  //     <div>
  //       {file.filename}
  //       {file.language}
  //     </div>
  //   );
  // });
  const description = gist.description || 'No description Sorry!';
  
  return (
    <div> 
      <h1>{gist.id}</h1>
      <pre>Created on {gist.created_at}</pre>
      <pre>{description}</pre>
      <p>
        {filesContainer}
      </p>
    </div>
  )
};

class GistList extends Component {
  render() {
    const gists = this.props.gists;
    const gistArray = [];
    if (gists) {
      gists.forEach((gist, key) => {
        const linkName = gist.description || gist.id;
        gistArray.push(<li key={key}><Link to={`/gist/${gist.id}`}>{linkName}</Link></li>);
      });
    }

    return(
      <div>
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" height="50" width="50"/>
        </Link>
        <ul className="gistList">
          {gistArray}
        </ul>
      </div>
    );
  }
}