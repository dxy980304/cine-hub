import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import axios from "@/lib/http";
export default function SearchVideo({
  setData,
  setLoading,
}: {
  setData: Function;
  setLoading: Function;
}) {
  const [searchText, setSearchText] = useState("");
  async function searchVideo() {
    try {
      setLoading(true);
      let res = await axios.get(`/api?ac=detail&wd=${searchText}`);
      setData(res.data.list);
      if (!res.data.list.length) {
        toast.warning("暂未找到该影片~");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  return (
    <Input
      defaultValue={searchText}
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      placeholder="按名称搜索..."
      className="w-72"
      btnClick={searchVideo}
    />
  );
}
