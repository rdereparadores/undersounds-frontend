import { FaPause, FaPlay } from "react-icons/fa6"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Progress } from "../ui/progress"
import { useState } from "react"
import { Rewind } from "lucide-react"
import { useMusicPlayer } from "@/hooks/music-player/useMusicPlayer"
import { GrClose } from "react-icons/gr"
import { formatTime } from "@/lib/formatTime"

export const MusicPlayer = () => {
    const player = useMusicPlayer()
    const [currentPlaytime, setCurrentPlaytime] = useState<number>(0)

    setInterval(() => {
        setCurrentPlaytime(player.player!.getPosition())
    }, 1)

    return (
        <Card hidden={player.playerProps?.hidden}>
            <CardContent className="flex items-center p-2 gap-2">
                <img src={player.playerProps?.imgUrl} className="w-10 h-10 rounded-md" />
                <div className="min-w-fit flex-1 gap-2 overflow-hidden">
                    <p className="font-medium truncate">
                        {player.playerProps?.title}
                    </p>
                    <p>
                        {player.playerProps?.author.artistName}
                    </p>
                </div>
                <Button variant='outline' onClick={() => { player.player!.seek(0) }} className="pr-[18px] rounded-full w-10 h-10">
                    <Rewind />
                </Button>
                <Button onClick={player.player!.togglePlayPause} className="rounded-full w-10 h-10">
                    {player.player!.isPlaying ? <FaPause /> : <FaPlay />}
                </Button>
                <p>{formatTime(currentPlaytime)}</p>
                <Progress value={currentPlaytime / player.player!.duration * 100}></Progress>
                <p>{formatTime(player.player!.duration)}</p>

                <Button variant='ghost' onClick={() => { player.quit() }} className="pr-[17px] rounded-full w-10 h-10">
                    <GrClose />
                </Button>
            </CardContent>
        </Card>
    )
}