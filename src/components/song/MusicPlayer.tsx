import { Shuffle, SkipBack, Play, SkipForward, Repeat } from "lucide-react"
import {Progress} from "@/components/ui/progress.tsx";

export function MusicPlayer (){
  return (
    <div className="md:w-2/3 flex flex-col justify-center">
      <div className="my-6">
        <div className="flex justify-center items-center gap-6 mb-4">
          <button className="p-2 text-black/80 hover:text-black/20">
            <Shuffle size={24} />
          </button>
          <button className="p-2 text-black/80 hover:text-black/20">
            <SkipBack size={24} />
          </button>
          <button className="bg-black/80 text-white/90 rounded-full p-3 hover:bg-black/20">
            <Play size={24} fill="currentColor" />
          </button>
          <button className="p-2 text-black/80 hover:text-black/20">
            <SkipForward size={24} />
          </button>
          <button className="p-2 text-black/80 hover:text-black/20">
            <Repeat size={24} />
          </button>
        </div>

        <Progress value={35}/>
      </div>
    </div>
  );
}

