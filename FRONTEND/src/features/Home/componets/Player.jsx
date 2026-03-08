import { useRef, useState, useEffect, useCallback } from 'react';
import useSong from '../hooks/useSong';
import './Player.scss';

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const Player = () => {
    const { song, loading } = useSong();
    const audioRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const [isMuted, setIsMuted] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [showSpeedMenu, setShowSpeedMenu] = useState(false);
    const [isBuffering, setIsBuffering] = useState(false);

    // Format time in mm:ss
    const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Play / Pause
    const togglePlay = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    // Skip forward / backward
    const skip = useCallback((seconds) => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = Math.min(
            Math.max(audio.currentTime + seconds, 0),
            audio.duration || 0
        );
    }, []);

    // Speed change
    const changeSpeed = useCallback((rate) => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.playbackRate = rate;
        setPlaybackRate(rate);
        setShowSpeedMenu(false);
    }, []);

    // Volume change
    const handleVolumeChange = useCallback((e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
        setIsMuted(newVolume === 0);
    }, []);

    // Mute toggle
    const toggleMute = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isMuted) {
            audio.volume = volume || 0.8;
            setIsMuted(false);
        } else {
            audio.volume = 0;
            setIsMuted(true);
        }
    }, [isMuted, volume]);

    // Seek
    const handleSeek = useCallback((e) => {
        const audio = audioRef.current;
        if (!audio) return;
        const seekTime = parseFloat(e.target.value);
        audio.currentTime = seekTime;
        setCurrentTime(seekTime);
    }, []);

    // Audio event listeners
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onTimeUpdate = () => setCurrentTime(audio.currentTime);
        const onLoadedMetadata = () => setDuration(audio.duration);
        const onEnded = () => setIsPlaying(false);
        const onWaiting = () => setIsBuffering(true);
        const onCanPlay = () => setIsBuffering(false);

        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('loadedmetadata', onLoadedMetadata);
        audio.addEventListener('ended', onEnded);
        audio.addEventListener('waiting', onWaiting);
        audio.addEventListener('canplay', onCanPlay);

        return () => {
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('loadedmetadata', onLoadedMetadata);
            audio.removeEventListener('ended', onEnded);
            audio.removeEventListener('waiting', onWaiting);
            audio.removeEventListener('canplay', onCanPlay);
        };
    }, []);

    // Load and auto-play new song
    const isFirstLoad = useRef(true);
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !song?.url) return;

        audio.load();
        audio.playbackRate = playbackRate;
        setCurrentTime(0);

        // Auto-play when song changes (skip the very first mount)
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
            return;
        }

        const playWhenReady = () => {
            audio.play()
                .then(() => setIsPlaying(true))
                .catch((err) => console.warn('Auto-play blocked:', err));
            audio.removeEventListener('canplay', playWhenReady);
        };
        audio.addEventListener('canplay', playWhenReady);

        return () => audio.removeEventListener('canplay', playWhenReady);
    }, [song?.url]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT') return;
            switch (e.code) {
                case 'Space':
                    e.preventDefault();
                    togglePlay();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    skip(5);
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    skip(-5);
                    break;
                default:
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [togglePlay, skip]);

    // Close speed menu on outside click
    useEffect(() => {
        if (!showSpeedMenu) return;
        const handleClick = () => setShowSpeedMenu(false);
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [showSpeedMenu]);

    const progress = duration ? (currentTime / duration) * 100 : 0;

    // Volume icon
    const getVolumeIcon = () => {
        if (isMuted || volume === 0) return '🔇';
        if (volume < 0.5) return '🔉';
        return '🔊';
    };

    return (
        <div className="player-wrapper">
            <audio ref={audioRef} src={song?.url} preload="metadata" />

            {/* Loading Bar at Top */}
            {loading && <div className="player-loading">Loading new song...</div>}

            <div className="player-card">
                {/* LEFT: Album art + song info */}
                <div className="player-info-container">
                    <div className="player-poster">
                        <img
                            src={song?.postUrl || 'https://via.placeholder.com/60'}
                            alt={song?.title || 'Album Art'}
                            className={`poster-img ${isPlaying ? 'spinning' : ''}`}
                        />
                        <div className="poster-glow" />
                    </div>

                    <div className="player-info">
                        <div className="song-title" title={song?.title}>{song?.title || 'No Song Selected'}</div>
                        <div className="song-mood">{song?.mood || 'Unknown'}</div>
                    </div>
                </div>

                {/* CENTER: Controls + Progress bar */}
                <div className="player-center">
                    <div className="player-controls">
                        {/* Skip backward 5s */}
                        <button
                            className="control-btn skip-btn"
                            onClick={() => skip(-5)}
                            title="Rewind 5s (← key)"
                            id="btn-rewind"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                            </svg>
                        </button>

                        {/* Play / Pause */}
                        <button
                            className={`control-btn play-btn ${isBuffering ? 'buffering' : ''}`}
                            onClick={togglePlay}
                            title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
                            id="btn-play-pause"
                        >
                            {isBuffering ? (
                                <div className="spinner" />
                            ) : isPlaying ? (
                                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
                                    <path d="M8 5v14l11-7z" style={{ transform: 'translateX(2px)' }} />
                                </svg>
                            )}
                        </button>

                        {/* Skip forward 5s */}
                        <button
                            className="control-btn skip-btn"
                            onClick={() => skip(5)}
                            title="Forward 5s (→ key)"
                            id="btn-forward"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z" />
                            </svg>
                        </button>
                    </div>

                    <div className="player-progress">
                        <span className="time-label">{formatTime(currentTime)}</span>
                        <div className="progress-track">
                            <input
                                type="range"
                                id="player-seek"
                                min="0"
                                max={duration || 0}
                                step="0.1"
                                value={currentTime}
                                onChange={handleSeek}
                                className="progress-slider"
                                style={{ '--progress': `${progress}%` }}
                            />
                        </div>
                        <span className="time-label">{formatTime(duration)}</span>
                    </div>
                </div>

                {/* RIGHT: Volume + Speed */}
                <div className="player-extras">
                    <div className="volume-control">
                        <button
                            className="control-btn volume-btn"
                            onClick={toggleMute}
                            title={isMuted ? 'Unmute' : 'Mute'}
                            id="btn-mute"
                        >
                            {getVolumeIcon()}
                        </button>
                        <input
                            type="range"
                            id="volume-slider"
                            min="0"
                            max="1"
                            step="0.01"
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="volume-slider"
                            style={{ '--volume': `${(isMuted ? 0 : volume) * 100}%` }}
                        />
                    </div>

                    <div className="speed-control">
                        <button
                            className="control-btn speed-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowSpeedMenu(!showSpeedMenu);
                            }}
                            title="Playback Speed"
                            id="btn-speed"
                        >
                            {playbackRate}x
                        </button>
                        {showSpeedMenu && (
                            <div className="speed-menu" onClick={(e) => e.stopPropagation()}>
                                {SPEED_OPTIONS.map((rate) => (
                                    <button
                                        key={rate}
                                        className={`speed-option ${playbackRate === rate ? 'active' : ''}`}
                                        onClick={() => changeSpeed(rate)}
                                    >
                                        {rate}x
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Player;
