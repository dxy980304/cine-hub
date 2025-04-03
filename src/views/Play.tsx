import { Route } from "@/routes/_home/play.$id";
import { useEffect, useState } from "react";
import Video from "./VideoCard";
import axios from "@/lib/http";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
export default function Play() {
  const { id } = Route.useParams();
  const [episodes, setEpisodes] = useState([]);
  const [videoInfo, setVideoInfo] = useState<any>(null);
  const [url, setUrl] = useState("");
  useEffect(() => {
    getVideoDetail();
  }, []);
  async function getVideoDetail() {
    try {
      let res = await axios.get(`/api?ac=detail&ids=${id}`);
      if (res.data.list.length) {
        let videoInfo = res.data.list[0];
        setVideoInfo(videoInfo);
        let allEpisodes = videoInfo.vod_play_url.split("#");
        setEpisodes(allEpisodes);
      }
    } catch (error) {}
  }
  function nextEpisode() {
    let idx = episodes.findIndex((i) => i === url);
    if (idx < episodes.length) {
      setUrl(episodes[idx + 1]);
    }
  }
  return (
    <div className="w-full h-full flex flex-col p-4 box-border overflow-x-hidden overflow-y-auto">
      {videoInfo && (
        <div className="flex bg-[#f1f1f1] p-4 box-border mt-4 gap-x-4 max-h-128">
          <img
            src={videoInfo.vod_pic}
            alt={videoInfo.vod_name}
            className="object-cover rounded"
          />
          <div className="flex-1 flex flex-col gap-y-4 overflow-hidden overflow-y-auto">
            <div className="text-2xl font-extrabold">{videoInfo.vod_name}</div>
            <div className="flex gap-x-6">
              <span>类型：{videoInfo.type_name}</span>
              <span>地区：{videoInfo.vod_area}</span>
              <span>年份：{videoInfo.vod_year}</span>
            </div>
            <div>导演：{videoInfo.vod_director}</div>
            <div className="flex">
              <div className="w-12">主演：</div>
              <div className="flex-1">{videoInfo.vod_actor}</div>
            </div>
            <div>更新：{format(videoInfo.vod_time, "yyyy-MM-dd")}</div>
            <div className="flex">
              <div className="w-12">简介：</div>
              <div
                className="flex-1"
                dangerouslySetInnerHTML={{
                  __html: videoInfo.vod_content.trim().replace("<br />", ""),
                }}
              />
            </div>
          </div>
        </div>
      )}
      <Video url={url} nextEpisode={nextEpisode} />
      <h1 className="text-xl my-4">播放地址：</h1>
      <div className="w-full grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
        {episodes.map((i: string, idx: number) => {
          return (
            <Button
              key={idx}
              className="cursor-pointer"
              variant={i === url ? "default" : "secondary"}
              onClick={() => {
                setUrl(i);
              }}
            >
              {i.split("$")[0]}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
