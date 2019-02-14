import React, { Component } from 'react';
import Navbar from './components/NavBar';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
import './style/style.css';

import VideoDetail from './components/video_detail'
import VideoList from './components/video_list';
import API_KEY from './apiKey';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      videos:[],
      selectedVideo: null,
    }

    this.videoSearch('Germans')
  }

  videoSearch(term) {
    YTSearch({key:API_KEY,term}, videos => {
      this.setState({videos, selectedVideo : videos[0]});
    })
  }

  render() {
    const videoSearch = _.debounce(term => {this.videoSearch(term)},300);

    return ( 
      <div>
       <Navbar />
      <SearchBar onSearchTermChange ={videoSearch}/>
      <VideoDetail video={this.state.selectedVideo}/>
      <VideoList
        onVideoSelect = {selectedVideo => this.setState({selectedVideo})} 
        videos={this.state.videos}
        />
      </div>
    );
  }
}

export default App;
