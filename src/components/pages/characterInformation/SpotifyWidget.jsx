import React, { useState, useRef, useEffect } from 'react';

const rickAndMortySongs = [
  { 
    name: 'Live Forever (feat. Kotomi)', 
    artist: 'Rick and Morty', 
    album: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/bb/86/51/bb8651e7-35c2-af2e-641e-ada346e573c0/794043217166.jpg/100x100bb.jpg', 
    audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/4f/31/f0/4f31f09f-8dce-9f4a-2b57-bcb9de994d31/mzaf_12986292521988387586.plus.aac.p.m4a' 
  },
  { 
    name: "Don't Look Back", 
    artist: 'Rick and Morty', 
    album: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e1/5e/93/e15e9307-4001-b9c0-96ea-f604d778a46b/794043204661.jpg/100x100bb.jpg', 
    audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b2/e2/90/b2e29078-295f-1a9f-abfb-9039a6db4784/mzaf_3641341282001412823.plus.aac.p.m4a' 
  },
  { 
    name: 'Borrowed Time', 
    artist: 'Rick and Morty & Tennis', 
    album: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e0/b0/07/e0b007de-bd2d-6da1-0e22-01a5ab37aa14/794043208287.jpg/100x100bb.jpg', 
    audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/31/56/a5/3156a531-5e4e-ede3-4ea8-2fa45aba479b/mzaf_4826894608228313462.plus.aac.p.m4a' 
  }
];

const SpotifyWidget = () => {
  const [songIndex, setSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  const song = rickAndMortySongs[songIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, songIndex]);

  const togglePlay = (e) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const nextSong = (e) => {
    e.stopPropagation();
    setSongIndex((prev) => (prev + 1) % rickAndMortySongs.length);
    setIsPlaying(true);
  };

  const prevSong = (e) => {
    e.stopPropagation();
    setSongIndex((prev) => (prev - 1 + rickAndMortySongs.length) % rickAndMortySongs.length);
    setIsPlaying(true);
  };

  return (
    <div className="mt-6 p-4 bg-[#171717] rounded-2xl shadow-[inset_2px_5px_10px_rgb(5,5,5),0_0_16px_rgba(139,92,246,0.15)] border border-purple-500/20">
      <div className="flex items-center mb-4 pl-1">
        <svg className="w-6 h-6 mr-2 drop-shadow-[0_0_8px_rgba(30,215,96,0.5)]" viewBox="0 0 167.5 167.5">
          <path fill="#1ed760" d="M83.7 0C37.5 0 0 37.5 0 83.7c0 46.3 37.5 83.7 83.7 83.7 46.3 0 83.7-37.5 83.7-83.7C167.5 37.5 130 0 83.7 0zM122 120.8c-1.4 2.5-4.6 3.2-7 1.7-19.8-12-44.5-14.7-73.7-8-2.8.5-5.6-1.2-6.2-4-.2-2.8 1.5-5.6 4-6.2 32-7.3 59.6-4.2 81.6 9.3 2.5 1.5 3.1 4.7 1.3 7.2zm10.5-23.5c-1.9 3-5.7 4-8.8 2-23.6-14.5-59.5-18.7-87.3-10.3-3.4.8-7-1.3-7.8-4.7-.8-3.4 1.3-7 4.7-7.8 31.8-9.4 71.6-4.6 98.7 12 3 1.8 4 5.8 2.1 8.8zm1-24.8c-28.3-16.7-75-18.2-101.8-10-4.2 1.2-8.5-1.2-9.7-5.4-1.2-4.2 1.2-8.5 5.4-9.7 30.7-9.3 82.5-7.5 114.5 11.4 3.7 2.2 5 7.1 2.8 10.8-2 3.8-7 5-10.8 2.9z" />
        </svg>
        <p className="text-purple-400 font-bold text-[1.05em] drop-shadow-[0_0_10px_rgba(139,92,246,0.3)]">
          Rick and Morty Album
        </p>
        
        <div className="ml-auto flex items-center gap-2">
          <button 
            className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-200 transition-all hover:bg-purple-500/25 hover:shadow-[0_0_8px_rgba(139,92,246,0.4)] hover:scale-105"
            onClick={prevSong} title="Anterior"
          >
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>
          </button>
          <span className="text-[11px] font-bold text-purple-300/60 bg-black/30 px-2 py-0.5 rounded-lg">
            {songIndex + 1}/{rickAndMortySongs.length}
          </span>
          <button 
            className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-200 transition-all hover:bg-purple-500/25 hover:shadow-[0_0_8px_rgba(139,92,246,0.4)] hover:scale-105"
            onClick={nextSong} title="Siguiente"
          >
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
          </button>
          
          <div className="flex items-center gap-1.5 bg-black/30 px-2 py-1.5 rounded-lg border border-purple-500/10 hidden sm:flex">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-purple-300"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
            <input 
              type="range" min="0" max="1" step="0.05" 
              value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-16 h-1 bg-purple-500/30 rounded-full appearance-none outline-none accent-purple-400 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div 
        className="flex items-center gap-3 p-3 bg-white/5 border border-transparent rounded-xl cursor-pointer transition-all hover:bg-[#1c1929] hover:border-purple-500/30 hover:shadow-[0_0_12px_rgba(139,92,246,0.2)]"
        onClick={togglePlay}
      >
        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
          <img src={song.album} alt={song.name} className="w-full h-full object-cover" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-bold truncate">{song.name}</p>
          <p className="text-gray-400 text-xs truncate mt-0.5">{song.artist}</p>
        </div>

        <div className="flex items-center justify-center shrink-0 w-8 h-8 mr-2">
          {isPlaying ? (
            <div className="flex items-end justify-center gap-[3px] h-4 w-5">
              <div className="w-[3px] bg-green-400 rounded-sm animate-[pulse_0.8s_ease-in-out_infinite_alternate]" style={{height: '60%'}}></div>
              <div className="w-[3px] bg-green-400 rounded-sm animate-[pulse_0.5s_ease-in-out_infinite_alternate]" style={{height: '100%'}}></div>
              <div className="w-[3px] bg-green-400 rounded-sm animate-[pulse_0.7s_ease-in-out_infinite_alternate]" style={{height: '40%'}}></div>
            </div>
          ) : (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M8 5v14l11-7z"/></svg>
          )}
        </div>
      </div>

      <audio ref={audioRef} src={song.audio} onEnded={nextSong} />
    </div>
  );
};

export default SpotifyWidget;
