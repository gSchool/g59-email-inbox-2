import React, { Component } from "react";
import "./App.css";
import { FormGroup, FormControl, InputGroup, Glyphicon } from "react-bootstrap";
import Profile from './Profile.jsx'
import Gallery from './Gallery.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      artist: null,
      tracks: []
    };
  }

  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    var accessToken = 'BQA0G7GGrb7B2LztKmyMsTkj_s6Bas7tSjbakNUcv5SGAaXMeONxxhT46XkrL0HHL1cVStrs9ZXQ3YCtSFIjclL2lYG6vVNNjeL8Dzx0B_-L-KFEjczFOq5cQTm6w8bQMx8bEeeD-GLnBQxYmfvcRiYyCcj6FyBfIbM&refresh_token=AQBD5lmLsm-z-ZFpLk6tIkde2AVVd7zXRsbZzzHlwgNlygL2PmIbu9xXEjGd0JZWBdAOTJdC5uFpUJaG5v2jeoZkxy927ZoPPLPLmWK6UgiuE53P7iXfYHjn3mqklNHYqrM'

    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        // console.log('artist =', artist) - View API artist results
        this.setState({ artist });

        FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US`
        fetch(FETCH_URL, myOptions)
        .then(response => response.json())
        .then(json => {
          console.log('artist\'s top tracks:', json)
          const { tracks } = json;
          this.setState({tracks});
        })
      })
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an artist"
              value={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
              if (event.key === 'Enter'){
                this.search()
              }}}
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {this.state.artist !== null ?
        <div>
          <Profile
          artist={this.state.artist}
        />
        <Gallery
            tracks={this.state.tracks}
        />
        </div>
        : <div></div>}
      </div>
    )
  }
}

export default App;
