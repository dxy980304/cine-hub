import { useEffect, useState } from "react";
import axios from "@/lib/http";
import { useCategory } from "@/store/useCategory";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { InfinitySpin } from "react-loader-spinner";
interface List {
  type_id: string;
  type_name: string;
}
export default function SideBar() {
  const navigate = useNavigate();
  const [list, setList] = useState<List[]>([]);
  const { type_id, setTypeId } = useCategory();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getList();
  }, []);
  async function getList() {
    try {
      setLoading(true);
      let res = await axios.get("/api");
      let filter = res.data.class.slice(4);
      setList(filter);
      if (filter.length) {
        setTypeId(filter[0].type_id);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  if (loading) {
    return (
      <div className="w-48 h-full grid place-items-center">
        <InfinitySpin width="200" color="#84cc16" />
      </div>
    );
  }
  return (
    <div className="w-48 h-full overflow-y-auto [direction:rtl] flex flex-col gap-y-4">
      {list.map((i) => {
        return (
          <div
            key={i.type_id}
            className={cn(
              "pl-6 py-3 box-border text-left cursor-pointer hover:text-2xl hover:text-[#1899ff] transition-all",
              {
                "text-[#1899ff]": i.type_id === type_id,
                "text-2xl": i.type_id === type_id,
              },
            )}
            onClick={() => {
              setTypeId(i.type_id);
              navigate({ to: "/" });
            }}
          >
            {i.type_name}
          </div>
        );
      })}
    </div>
  );
}
