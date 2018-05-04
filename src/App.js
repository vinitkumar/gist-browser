import React, { Component } from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router} from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Gist from './Gist';
import GistList from './GistList';
import fetchData from './services/api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gistList: [],
      error: null,
    };
  }

  componentDidMount() {
      const data = fetchData();
      data.then((result) => console.log(result));
      debugger;
      // fetch('https://api.github.com/gists?client_id=6396a71f53863e556b11&&client_secret=098d29751f484f46307027baf674d072ae97050a`')
      //   .then(res => res.json())
      //   .then(gists => {
      //     this.setState({gistList: gists})
      //   }).catch((error) => {
      //     this.setState({
      //       error: error.message
      //     })
      //     console.log(error);
      //   });
  }
  
  // fetchData = async () => {
  //   return await fetch('https://api.github.com/gists?client_id=6396a71f53863e556b11&&client_secret=098d29751f484f46307027baf674d072ae97050a`')
  //       .then(res => res.json())
  //       .then(gists => {
  //         console.log('data coming from fetchData');
  //         return gists
  //       }).catch((error) => { 
  //         console.log(error);
  //       });
  // };

  render() {
    const { gistList, error } = this.state;
    const gists = gistList;
    return (
      <Router>
        <div className="container-fluid">
          <h1> Realtime Gist Monitor <img src={logo} className="App-logo" alt="logo" height="50" width="50"/></h1>
          { error && <div className="alert alert-danger" role="alert">error: {error} </div>}
          <div className="row">
            <div className="col-4 sidebar">
              { !error && <GistList gists={gistList} /> }
            </div>
            <div className="col-8 main-content">
              <Route exact path="/"  render={() => <div>Welcome</div>} />
              { gists && (
                <Route path="/gist/:gistId" render={({match})=> (
                  <Gist key={match.params.gistId} gist={gists.find(g=> g.id === match.params.gistId )} />
                )} />
              )}
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
