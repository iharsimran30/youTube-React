import _ from 'lodash';
import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/search_bar.js';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list.js';
import VideoDetail from './components/video_detail.js';


const API_KEY = "AIzaSyDO3JSMwstib8nXiZJUvioeK8ZDy1uGYS8";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      videos : [],
      selectedVideo: null
    };
      this.videoSearch("Elon Musk")
  }

      //we can write videos:videos to only videos coz keya nd value have same name
      videoSearch (term) {
        YTSearch ({key: API_KEY, term: term}, (videos) => { 
          this.setState({
            videos: videos,
            selectedVideo:videos[0]
          });
        })
      };

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300)
    return (
      <div className="App">
       <SearchBar onSearchTermChange= {videoSearch} />
       <VideoDetail video={this.state.selectedVideo} />
       <VideoList 
        onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
        videos = {this.state.videos} />
      </div>
    );
  }
}

export default App;
