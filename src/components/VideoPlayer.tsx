import React, { useRef, useState } from "react";
import ReactPlayer, { Config } from "react-player";
import { FileConfig } from "react-player/file";
import { IVideoState } from "../models/IVideoState";
import {
  MdPause,
  MdPlayArrow,
  MdFullscreen,
  MdVolumeUp,
  MdVolumeDown,
  MdFullscreenExit,
  MdVolumeOff,
  MdSettings,
} from "react-icons/md";
import { SecondsToHoursMinutesSeconts } from "../Helpers/utils";
import { SliderType } from "../models/Enums/SliderType";
import Hls, { Level } from "hls.js";
import CSS from "csstype";

import "../styles/VideoPlayer.css";
import "rc-slider/assets/index.css";
import TooltipSlider from "./ToolTipSlider";

function VideoPlayer() {
  const player = useRef<ReactPlayer>(null);
  const [videoState, setVideoState] = useState<IVideoState>();
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [draggingTimeline, setDraggingTimeline] = useState<boolean>(false);
  const [dragValue, setDragValue] = useState<number>(0);
  const [volume, setVolume] = useState<number>(50);
  const [playing, setPlaying] = useState<boolean>(false);
  const [mute, setMuted] = useState<boolean>(false);
  const [playerLevels, setPlayerLevels] = useState<Level[]>([]);
  const [hlsOptions, setHlsOptions] = useState<Hls>({} as Hls);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const url =
    "http://amssamples.streaming.mediaservices.windows.net/634cd01c-6822-4630-8444-8dd6279f94c6/CaminandesLlamaDrama4K.ism/manifest(format=m3u8-aapl)";

  const config: Config = {
    file: {
      forceHLS: true,
      hlsOptions: hlsOptions,
    } as FileConfig,
  };

  const railStyle: CSS.Properties = {
    background: "var(--primary)",
  };

  const trackStyle: CSS.Properties = {
    background: "var(--secondary)",
  };

  function OnSlideChangeHandler(value: number) {
    if (player.current != null) {
      player.current?.seekTo(value);
    }
    setDraggingTimeline(false);
  }

  function OnPlayPressHandler() {
    setPlaying(!playing);
  }

  function OnMutePressHandler() {
    setMuted(!mute);
  }

  function OnFullscreenPressHandler(
    event:
      | React.MouseEvent<SVGElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
    clicks: number
  ) {
    let video = document.getElementsByClassName("videoContainer")[0];

    if (event.detail === clicks) {
      setFullscreen(!fullscreen);

      if (fullscreen) {
        document.exitFullscreen();
      } else {
        video.requestFullscreen();
      }
    }
  }

  function MiddleControlsClickHandler(
    event:
      | React.MouseEvent<SVGElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    if (event.detail === 1) {
      OnPlayPressHandler();
    }

    if (event.detail === 2) {
      OnPlayPressHandler();
      OnFullscreenPressHandler(event, 2);
    }
  }

  function OnVolumeChangeHandler(value: number) {
    setVolume(value as number);
    setMuted(false);
  }

  function RenderLevels() {
    let levels: JSX.Element[] = [];

    playerLevels.map((item, i) => {
      let classname = hlsOptions.currentLevel === i ? "level active" : "level";

      levels.push(
        <div
          className={classname}
          key={i}
          onClick={() => OnLevelClickHandler(item, i)}
        >
          <p className="level-text">{item.height}</p>
        </div>
      );
    });
    return levels.sort().reverse();
  }

  function OnLevelClickHandler(level: Level, index: number) {
    hlsOptions.currentLevel = index;
    hlsOptions.loadLevel = index;
    setHlsOptions(hlsOptions);
  }

  function OnReady(initPlayer: ReactPlayer) {
    let player = initPlayer.getInternalPlayer("hls") as Hls;
    setHlsOptions(player);

    //Removes duplicate resolutions but keeps the duplicate with the highest bitrate
    const duplicates = player.levels
      .map((el, i) => {
        return player.levels.find((element, index) => {
          if (element.height === el.height && element.bitrate > el.bitrate) {
            return el;
          }
        });
      })
      .filter((x) => x);

    setPlayerLevels(
      player.levels.filter((x) => !duplicates.includes(x)).sort()
    );
  }

  return (
    <div className="videoContainer">
      <ReactPlayer
        ref={player}
        config={config}
        className="player"
        playing={playing}
        url={url}
        muted={mute}
        loop={false}
        volume={volume / 100}
        progressInterval={250}
        onReady={OnReady}
        onDuration={setVideoDuration}
        onProgress={(data) => setVideoState(data)}
      />
      <div className="controls">
        <div className="video-overlay video-top-controls"></div>
        <div
          className="video-overlay video-middle-controls"
          onClick={MiddleControlsClickHandler}
        >
          {/* <div className="levels-container">{RenderLevels()}</div> */}
        </div>
        <div className="video-overlay video-bottom-controls">
          <TooltipSlider
            className="video-timeline"
            min={0}
            value={draggingTimeline ? dragValue : videoState?.playedSeconds}
            max={videoDuration}
            railStyle={railStyle}
            trackStyle={trackStyle}
            onBeforeChange={() => setDraggingTimeline(true)}
            onChange={(value) => setDragValue(value as number)}
            onAfterChange={(value) => OnSlideChangeHandler(value as number)}
            type={SliderType.Time}
            tipProps={undefined}
          />
          <div className="iconContainer">
            <div className="splitLeft">
              {playing ? (
                <MdPause className="icon" onClick={OnPlayPressHandler} />
              ) : (
                <MdPlayArrow className="icon" onClick={OnPlayPressHandler} />
              )}

              <div className="volumeContainer">
                {mute || volume === 0 ? (
                  <MdVolumeOff
                    className="icon volume"
                    onClick={OnMutePressHandler}
                  />
                ) : (
                  <MdVolumeUp
                    className="icon volume"
                    onClick={OnMutePressHandler}
                  />
                )}

                <div className="video-volume-container">
                  <TooltipSlider
                    className="video-volume"
                    min={0}
                    value={volume}
                    max={100}
                    railStyle={railStyle}
                    trackStyle={trackStyle}
                    tipProps={undefined}
                    type={SliderType.Percentage}
                    onChange={(value) => OnVolumeChangeHandler(value as number)}
                  />
                </div>
              </div>

              <div className="timeContainer">
                <p className="time">
                  {SecondsToHoursMinutesSeconts(
                    videoState?.playedSeconds as number
                  ) +
                    " / " +
                    SecondsToHoursMinutesSeconts(videoDuration)}
                </p>
              </div>
            </div>
            <div className="splitRight">
              <div className="settings">
                <MdSettings className="icon" />
                <div className="levels-container">{RenderLevels()}</div>
              </div>
              {fullscreen ? (
                <MdFullscreenExit
                  className="iconFullscreen"
                  onClick={(e) => OnFullscreenPressHandler(e, 1)}
                />
              ) : (
                <MdFullscreen
                  className="iconFullscreen"
                  onClick={(e) => OnFullscreenPressHandler(e, 1)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
