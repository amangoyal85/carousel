import { useEffect, useState } from "react";
import axios from "axios";

import VideoCarousel from "../components/crousel";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/videos");
      setVideos(res?.data?.data ?? []);
    } catch (error) {
      console.warn("Failed to load videos", error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Welcome to Socially Approved</span>
          <h2>Your modern video carousel for discovery, sharing, and engagement.</h2>
          <p>Swipe through trending clips, open the immersive player, and enjoy a performant mobile-first streaming experience.</p>
        </div>

        <div className="hero-stats">
          <div>
            <strong>30+</strong>
            <span>Curated Videos</span>
          </div>
          <div>
            <strong>Live</strong>
            <span>Like & Share</span>
          </div>
          <div>
            <strong>Smart</strong>
            <span>Lazy Loading</span>
          </div>
        </div>
      </section>

      <section className="carousel-section">
        <div className="section-head">
          <div>
            <span>Trending now</span>
            <h3>Swipe through the latest curated clips</h3>
          </div>
          <p>Click any card to open the full-screen carousel player with built-in controls, progress, likes, comments, and sharing.</p>
        </div>

        <div className="carousel-stage">
          {loading ? (
            <div className="status-block">Loading videos�</div>
          ) : videos.length === 0 ? (
            <div className="status-block">No videos found. Please check your backend or upload some content.</div>
          ) : (
            <VideoCarousel videos={videos} />
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
