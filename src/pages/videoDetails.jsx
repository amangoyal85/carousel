import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VideoCarousel from "../components/crousel";

const VideoDetailsPage = () => {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.post("https://carouselbac-production.up.railway.app/videos-by-id", { videoId: id });
        setVideos(res?.data?.data ?? []);
      } catch (error) {
        console.warn("Failed to load video details", error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVideos();
    }
  }, [id]);

  return (
    <div className="app-shell">
      <section className="detail-hero">
        <div>
          <span className="eyebrow">Video details</span>
          <h2>Watch, engage, and share the full experience.</h2>
          <p>Open any clip to see the full video player, progress tracking, comments, and more.</p>
        </div>
        <div className="detail-tips">
          <strong>Tip:</strong> Use the arrow navigation to move between videos without closing the modal.
        </div>
      </section>

      <section className="carousel-section">
        <div className="section-head">
          <div>
            <span>Selected video</span>
            <h3>Deep dive into your chosen content</h3>
          </div>
          <p>{loading ? "Loading…" : videos.length === 0 ? "No matching videos available." : "Swipe through the inner carousel to explore related content."}</p>
        </div>

        <div className="carousel-stage">
          {loading ? (
            <div className="status-block">Loading details…</div>
          ) : videos.length === 0 ? (
            <div className="status-block">No videos found for this ID.</div>
          ) : (
            <VideoCarousel videos={videos} />
          )}
        </div>
      </section>
    </div>
  );
};

export default VideoDetailsPage;
