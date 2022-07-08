import VideoPlayer from "../components/VideoPlayer";
import "../styles/WatchPage.css";

function WatchPage() {
  return (
    <div>
      <div className="video-container">
        <div className="video-player">
          <VideoPlayer />
        </div>
      </div>
      <div className="content">
        <h1 className="title">Hello world</h1>
      </div>
    </div>
  );
}

export default WatchPage;
