const VideoCard = ({ video, onClick }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(video)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick(video);
        }
      }}
      className="carousel-card"
      aria-label={`Open video ${video.title || video.name}`}
    >
      {video.thumbnail ? (
        <img
          src={video.thumbnail}
          alt={video.name || video.title}
        //   loading="lazy"
          className="card-image"
        />
      ) : (
        <div className="card-placeholder">Preview unavailable</div>
      )}

      <div className="card-overlay">
        <span className="card-badge">{video.category || "Trending"}</span>
        <h3>{video.name || video.title}</h3>
      </div>
    </div>
  );
};

export default VideoCard;
