import { FaPause, FaPlay } from "react-icons/fa6"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Progress } from "../ui/progress"
import { useState } from "react"
import { Rewind } from "lucide-react"
import { useSongPlayer } from "@/hooks/song-player/useSongPlayer"
import { GrClose } from "react-icons/gr"

const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)

    const formattedMinutes = String(minutes).padStart(2, '0')
    const formattedSeconds = String(seconds).padStart(2, '0')

    return `${formattedMinutes}:${formattedSeconds}`
}

export const MusicPlayer = () => {
    const player = useSongPlayer()
    const [currentPlaytime, setCurrentPlaytime] = useState<number>(0)

    setInterval(() => {
        setCurrentPlaytime(player.player!.getPosition())
    }, 500)

    return (
        <Card hidden={player.hidden}>
            <CardContent className="flex items-center p-2 gap-2">
                <img src={player.imgUrl} className="w-10 h-10 rounded-md" />
                <div className="min-w-fit flex-1 gap-2 overflow-hidden">
                    <p className="font-medium truncate">
                        {player.name}
                    </p>
                    <p>
                        {player.artist}
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

                <Button variant='ghost' onClick={() => { player.player!.stop(); player.setHidden(true) }} className="pr-[17px] rounded-full w-10 h-10">
                    <GrClose />
                </Button>
            </CardContent>
        </Card>
    )
}