import { useCategory } from "@/store/useCategory";
import { useEffect, useRef, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import axios from "@/lib/http";
import { useNavigate } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import SearchVideo from "@/components/layouts/SearchVideo";
export default function VideoList() {
  const navigate = useNavigate();
  const type_id = useCategory((state) => state.type_id);
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(false);
  let page = useRef(1);
  useEffect(() => {
    getVideoList();
    return () => {};
  }, [type_id]);
  async function getVideoList(concat = false) {
    if (!type_id) return;
    try {
      setLoading(true);
      let res = await axios.get(
        `/api?ac=detail&t=${type_id}&pg=${page.current}`,
      );
      if (concat) {
        setVideoList(videoList.concat(res.data.list));
      } else {
        setVideoList(res.data.list);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  function toPlay(id: string) {
    navigate({
      to: `/play/$id`,
      params: {
        id,
      },
    });
  }
  function handleScroll(e: any) {
    if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
      page.current += 1;
      getVideoList(true);
    }
  }
  return (
    <div
      className="w-full h-full flex flex-col items-end p-4 box-border overflow-y-auto"
      onScroll={handleScroll}
    >
      <SearchVideo setData={setVideoList} setLoading={setLoading} />
      {loading ? (
        <div className="w-full h-full grid place-items-center">
          <InfinitySpin width="200" color="#84cc16" />
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-6 mt-4">
          {videoList.map((i: any) => {
            return (
              <div
                key={i.vod_id}
                className="flex-1 relative"
                onClick={() => toPlay(i.vod_id)}
              >
                <div className="w-full h-96 overflow-hidden relative">
                  <img
                    src={i.vod_pic}
                    alt={i.vod_name}
                    className="w-full h-full object-cover rounded hover:scale-120 transition-transform cursor-pointer duration-300"
                  />
                  <Badge className="absolute left-2 bottom-2">
                    评分: {i.vod_score}
                  </Badge>
                  <Badge
                    className="absolute right-2 bottom-2"
                    variant="secondary"
                  >
                    {i.vod_remarks}
                  </Badge>
                </div>
                <div className="flex flex-col gap-y-1 mt-2">
                  <div className="oneline">{i.vod_name || "--"}</div>
                  <div className="oneline text-black/35 text-sm">
                    {i.vod_actor || "--"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
