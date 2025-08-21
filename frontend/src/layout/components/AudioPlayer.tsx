import { usePlayerStore } from "@/stores/usePlayerStore"
import { useEffect, useRef } from "react"

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);

  const {currentSong, isPlaying, playNext} = usePlayerStore()

  //handles song pause/play
  useEffect(()=> {
    if(isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying])

  //handle when song ends
  useEffect(()=>{
    const audio = audioRef.current

    const handleEnded = () => {
        playNext()
    }

    audio?.addEventListener("ended", handleEnded)
    return () =>audio?.removeEventListener("ended", handleEnded)
  }, [playNext]);

  useEffect(()=>{
    if(!audioRef.current || !currentSong) return;
    const audio = audioRef.current;
    //chcek if this is actually a new song
    const isSongChange = prevSongRef.current !== currentSong?.audioUrl;
    if(isSongChange){
        audio.src = currentSong?.audioUrl
        audio.currentTime=0;

        prevSongRef.current=currentSong?.audioUrl
        if(isPlaying) audio.play();
    }
  }, [currentSong, isPlaying])
  return <audio ref={audioRef} />
}

export default AudioPlayer