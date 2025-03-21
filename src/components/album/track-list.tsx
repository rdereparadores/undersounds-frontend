import { Play } from "lucide-react"

interface Track {
  title: string
  artists: string
}

function TrackItem({ title, artists }: {title: string, artists: string}) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <button className="bg-[#16a34a] rounded-full p-1.5 flex items-center justify-center hover:bg-green-800">
        <Play size={12} className="text-black" />
      </button>
      <div className="text-sm md:text-sm truncate">
        <span className="text-black font-bold size-1">{title}</span>
        {artists && <span className="text-black-400"> - {artists}</span>}
      </div>
    </div>
  )
}

export function TrackList(){
  const leftTracks: Track[] = [
    { title: "So Far Away", artists: "Martin Garrix & David Guetta" },
    { title: "There For You", artists: "Martin Garrix & Troye Sivan" },
    { title: "Scared To Be Lonely", artists: "Martin Garrix & Dua Lipa" },
    { title: "In The Name Of Love", artists: "Martin Garrix & Bebe Rexha" },
    { title: "Don't Look Down", artists: "Martin Garrix & Usher" },
    { title: "Pizza", artists: "Martin Garrix" },
    { title: "Byte", artists: "Martin Garrix" },
    { title: "Forever", artists: "Martin Garrix" },
    { title: "Together", artists: "Martin Garrix feat Matisse & Sadko" },
    { title: "Hold On & Believe", artists: "Martin Garrix & The Federal Empire" },
  ]

  const rightTracks: Track[] = [
    { title: "Wise", artists: "Martin Garrix & Mesto" },
    { title: "Sun Is Never Going Down", artists: "Martin Garrix & Dawn Golden" },
    { title: "Spotless", artists: "Martin Garrix & Jay Hardway" },
    { title: "Welcome", artists: "Martin Garrix & Julian Jordan" },
    { title: "Make Up Your Mind", artists: "Martin Garrix & Florian Picasso" },
    { title: "Scared To Be Lonely (Brooks Remix)", artists: "" },
    { title: "Scared To Be Lonely (Acoustic Version)", artists: "" },
    { title: "There For You (Bali Bandits Remix)", artists: "" },
    { title: "So Far Away (OSRIN Remix)", artists: "" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
      <div>
        {leftTracks.map((track, i) => (
          <TrackItem key={i} {...track} />
        ))}
      </div>
      <div>
        {rightTracks.map((track, i) => (
          <TrackItem key={i} {...track} />
        ))}
      </div>
    </div>
  )
}

