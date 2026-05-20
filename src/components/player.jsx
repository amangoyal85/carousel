import { useEffect, useRef, useState } from "react";
import { Heart, Share2, Volume2, VolumeX, Pause, Play, MessageCircle, Copy } from "lucide-react";
import axios from "axios";
import Loader from "./loader";
import ProgressBar from "./progress";
import useVideoObserver from "../hooks/videoObserver";

const VideoPlayer = ({ video }) => {
  const videoRef = useRef(null);
  const { ref, isVisible } = useVideoObserver(0.25);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [likes, setLikes] = useState(video.likes ?? 0);
  const [comments, setComments] = useState(video.comments ?? []);
  const [commentText, setCommentText] = useState("");
  const [commentOpen, setCommentOpen] = useState(false);
  const [loadedSrc, setLoadedSrc] = useState("");

  useEffect(() => {
    if (isVisible && !loadedSrc) {
      setLoadedSrc(video.videoUrl);
    }
  }, [isVisible, loadedSrc, video.videoUrl]);

  useEffect(() => {
    const current = videoRef.current;
    if (!current) return;

    current.muted = muted;
  }, [muted]);

  useEffect(() => {
    const current = videoRef.current;
    if (!current) return;

    if (isVisible) {
      const playPromise = current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setPlaying(true))
          .catch((error) => {
            console.warn("Play failed:", error);
            setPlaying(false);
          });
      }
    } else {
      current.pause();
      setPlaying(false);
    }
  }, [isVisible]);

  const togglePlay = () => {
    const current = videoRef.current;
    if (!current) return;

    if (playing) {
      current.pause();
      setPlaying(false);
    } else {
      const playPromise = current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setPlaying(true))
          .catch((error) => {
            console.warn("Play failed:", error);
            setPlaying(false);
          });
      }
    }
  };

  const toggleMute = () => {
    setMuted((prev) => !prev);
  };

  const handleTimeUpdate = () => {
    const current = videoRef.current;
    if (!current?.duration) return;
    setProgress((current.currentTime / current.duration) * 100);
  };

  const handleLike = async () => {
  setLikes((prev) => prev + 1);

  try {
    const browser = navigator.userAgent;

    await axios.post("http://localhost:5000/like", {
      videoId: video.id,
      platform: "",
      browser,
    });
  } catch (error) {
    console.warn("Like request failed", error);
  }
};

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/video/${video.id}`;
    const shareData = {
      title: video.title,
      text: video.description || "Check out this video",
      url: shareUrl
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.warn("Share canceled or failed", error);
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard");
    }

    try {
      const browser = navigator.userAgent;

      await axios.post("http://localhost:5000/share", {
      videoId: video.id,
      platform: "",
      browser,
    });
    } catch (error) {
      console.warn("Share tracking failed", error);
    }
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (!commentText.trim()) return;

    setComments((prev) => [{ id: Date.now(), text: commentText.trim() }, ...prev]);
    setCommentText("");
    setCommentOpen(true);
  };

  return (
    <div ref={ref} className="video-player">
      <div className="player-stage">
        {/* {loading && <Loader />} */}

        <video
          ref={videoRef}
          src={loadedSrc}
          muted={muted}
          loop
          playsInline
          preload="none"
          poster={video.thumbnail}
          onCanPlay={() => setLoading(false)}
          onWaiting={() => setLoading(true)}
          onTimeUpdate={handleTimeUpdate}
          onLoadedData={() => setLoading(false)}
        />

        {!playing && !loading && (
          <button className="video-play-overlay" onClick={togglePlay} aria-label="Play video">
            <Play size={36} />
          </button>
        )}

        <div className="video-badge">{video.category || "Featured"}</div>
      </div>

      <div className="video-controls">
        <div className="video-meta">
          <div>
            <h3>{video.title || video.name}</h3>
            <p>{video.description || "A socially-approved clip ready to share."}</p>
          </div>
          <button type="button" className="btn btn-secondary share-button" onClick={handleShare}>
            <Share2 size={18} /> Share
          </button>
        </div>

        <ProgressBar progress={progress} />

        <div className="controls-row">
          <button type="button" onClick={togglePlay} className="control-button">
            {playing ? <Pause size={18} /> : <Play size={18} />}
            <span>{playing ? "Pause" : "Play"}</span>
          </button>
          <button type="button" onClick={toggleMute} className="control-button">
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            <span>{muted ? "Unmute" : "Mute"}</span>
          </button>
          <button type="button" onClick={handleLike} className="control-button like-button">
            <Heart size={18} />
            <span>{likes}</span>
          </button>
          <button type="button" onClick={() => setCommentOpen((prev) => !prev)} className="control-button">
            <MessageCircle size={18} />
            <span>{comments.length}</span>
          </button>
        </div>

        <div className={`comment-panel ${commentOpen ? "open" : ""}`}>
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              placeholder="Leave a comment"
              aria-label="Leave a comment"
            />
            <button type="submit" className="btn btn-primary">
              <Copy size={16} /> Post
            </button>
          </form>

          <div className="comment-list">
            {comments.length === 0 ? (
              <div className="comment-empty">No comments yet. Be first!</div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <span>{comment.text}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
