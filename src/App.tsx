import React from "react";
import Header from "./components/Header";
import VideoPlayer from "./components/VideoPlayer";
import "./styles/App.css";

function App() {
  return (
    <div className="container">
      <Header />
      <div className="video-player">
        <VideoPlayer />
      </div>

      <script src="//cdn.jsdelivr.net/npm/hls.js@latest"></script>
    </div>
  );
}

export default App;
