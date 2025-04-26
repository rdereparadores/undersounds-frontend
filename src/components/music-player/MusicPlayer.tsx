import { FaPause, FaPlay } from "react-icons/fa6"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { useEffect, useState } from "react"
import { Rewind, Volume, VolumeOff } from "lucide-react"
import { useMusicPlayer } from "@/hooks/music-player/useMusicPlayer"
import { GrClose } from "react-icons/gr"
import { formatTime } from "@/lib/formatTime"
import { Slider } from "../ui/slider"

export const MusicPlayer = () => {
    const player = useMusicPlayer()
    const [currentPlaytime, setCurrentPlaytime] = useState<number>(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPlaytime(player.player!.getPosition())
        }, 500)
        return () => clearInterval(interval)
    }, [player])

    const timelineChangeHandle = (newValue: number[]) => {
        player.player!.seek(player.player!.duration / 100 * newValue[0])
        setCurrentPlaytime(player.player!.duration / 100 * newValue[0])
    }
    const volumeChangeHandle = (newValue: number[]) => {
        player.player!.setVolume(newValue[0])
    }

    return (
        <Card hidden={player.playerProps?.hidden}>
            <CardContent className="flex items-center justify-center p-2 gap-2 flex-wrap">
                <div className="flex gap-2 justify-between w-fit">
                    <img src={player.playerProps?.imgUrl} className="w-10 h-10 rounded-md mt-1" />
                    <div className="min-w-fit flex-1 gap-2 overflow-hidden">
                        <p className="font-medium truncate">
                            {player.playerProps?.title}
                        </p>
                        <p className="text-ellipsis max-w-32 whitespace-nowrap overflow-hidden">
                            {player.playerProps?.author.artistName} {player.playerProps && player.playerProps.collaborators.length > 0 && `, ${player.playerProps.collaborators.map(c => c.artistName).join(', ')}`}
                        </p>
                    </div>
                    <Button variant='outline' onClick={() => { player.player!.seek(0) }} className="pr-[18px] mt-1 rounded-full w-10 h-10">
                        <Rewind />
                    </Button>
                    <Button onClick={player.player!.togglePlayPause} className="rounded-full mt-1 w-10 h-10">
                        {player.player!.isPlaying ? <FaPause /> : <FaPlay />}
                    </Button>
                </div>
                <div className="flex grow gap-2">
                    <p>{formatTime(currentPlaytime)}</p>
                    <Slider
                        className="min-w-24"
                        defaultValue={[0]}
                        max={100}
                        step={1}
                        value={[currentPlaytime / player.player!.duration * 100]}
                        onValueChange={timelineChangeHandle}
                    />
                    <p>{formatTime(player.player!.duration)}</p>
                </div>
                <div className="flex gap-2 grow sm:grow-0">
                    <Button onClick={() => { player.player!.toggleMute() }} variant='ghost' className="w-10 h-10 rounded-full">
                        {player.player!.isMuted ? <VolumeOff /> : <Volume />}
                    </Button>
                    <Slider
                        className="w-24 grow"
                        defaultValue={[player.player!.volume]}
                        max={1}
                        step={0.1}
                        value={[player.player!.volume]}
                        onValueChange={volumeChangeHandle}
                    />

                    <Button variant='ghost' onClick={() => { player.quit() }} className="pr-[17px] rounded-full w-10 h-10">
                        <GrClose />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}