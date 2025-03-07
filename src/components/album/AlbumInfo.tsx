import {LikeButton} from "../like-button.tsx";

const SongInfo = () => {
  return (
    <div className="md:w-1/3">
      <div className="relative">
        <img
          src="../../assets/Whatever_Kygo_y_AvaMax.png"
          alt="WHATEVER by KYGO & AVA MAX"
          className="rounded-lg w-full"
        />
        <LikeButton/>
      </div>
      <div className="mt-4 text-white">
        <h1 className="text-5xl font-bold mb-2">WHATEVER</h1>
        <h2 className="text-2xl">KYGO & AVA MAX</h2>
      </div>
      <p className="text-white/90 mt-4">
        "Whatever" de Kygo y Ava Max es una canción pop-electrónica con una melodía pegajosa y un ritmo bailable. La voz
        distintiva de Ava Max se complementa con la producción atmosférica de Kygo, y la letra transmite un mensaje de
        empoderamiento y vivir el momento. Perfecta para animar cualquier fiesta.😎
      </p>
    </div>
  )
}

export default SongInfo

