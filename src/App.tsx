import React from "react";
import Header from "./components/Header";
import VideoPlayer from "./components/VideoPlayer";
import WatchPage from "./pages/WatchPage";
import "./styles/App.css";

function App() {
  return (
    <div className="container">
      <Header />
      <WatchPage />

      <script src="//cdn.jsdelivr.net/npm/hls.js@latest"></script>
    </div>
  );
}

export default App;
