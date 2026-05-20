import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Virtual, A11y } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/virtual";

import VideoPlayer from "./player";

const VideoModal = ({ videos, selected, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal-inner">
        <div className="modal-topbar">
          <div>
            <span className="eyebrow">Player</span>
            <h2>Immersive video carousel</h2>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close video modal">
            ?
          </button>
        </div>

        {/* <Swiper
          modules={[Navigation, Pagination, Virtual, A11y]}
          initialSlide={selected}
          virtual={{ enabled: true, addSlidesBefore: 1, addSlidesAfter: 1 }}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
          centeredSlides
          centerInsufficientSlides
          watchOverflow
          slidesPerView={3}
          spaceBetween={24}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 12 },
            640: { slidesPerView: 1.2, spaceBetween: 14 },
            900: { slidesPerView: 2, spaceBetween: 18 },
            1200: { slidesPerView: 3, spaceBetween: 24 }
          }}
          keyboard={{ enabled: true }}
          className="modal-carousel"
        > */}
          {videos?.map((video, index) => (
            <SwiperSlide key={video.id} virtualIndex={index}>
              <div className="modal-slide">
                <VideoPlayer video={video} />
              </div>
            </SwiperSlide>
          ))}
        {/* </Swiper> */}
      </div>
    </div>
  );
};

export default VideoModal;
