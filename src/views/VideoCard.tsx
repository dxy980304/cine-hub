import { useEffect, useRef } from "react";
import VideoJS from "video.js";
import "video.js/dist/video-js.min.css";
import zh_CN from "video.js/dist/lang/zh-CN.json";
VideoJS.addLanguage("zh-CN", zh_CN);
export default function VideoCard({
  url,
  nextEpisode,
}: {
  url: string;
  nextEpisode: Function;
}) {
  const videoRef: any = useRef(null);
  const playerRef: any = useRef(null);
  const options = {
    autoplay: false,
    controls: true,
    preload: "auto",
    aspectRatio: "16:9",
    enableSmoothSeeking: true,
    language: "zh-CN",
    playbackRates: [0.5, 1, 1.5, 2],
    controlBar: {
      remainingTimeDisplay: {
        displayNegative: false,
      },
      skipButtons: {
        forward: 30,
        backward: 30,
      },
    },
  };
  useEffect(() => {
    if (url && playerRef.current) {
      playerRef.current.src(url.split("$")[1]);
      playerRef.current.currentTime(0);
      playerRef.current.play();
      playerRef.current.on("ended", nextEpisode);
    }
  }, [url]);

  useEffect(() => {
    if (!playerRef.current) {
      playerRef.current = VideoJS(videoRef.current, options);
    }
    return () => {
      playerRef.current?.dispose();
      playerRef.current = null;
    };
  }, [playerRef]);
  return (
    <div>
      <video ref={videoRef} className="video-js vjs-fluid" />
    </div>
  );
}
