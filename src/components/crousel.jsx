import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Virtual, A11y } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/virtual";

import VideoCard from "./card";
import VideoPlayer from "./player";

const VideoCarousel = ({ videos }) => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openModal = (video) => {
    const index = videos.findIndex((v) => v.id === video.id);

    setSelectedIndex(index >= 0 ? index : 0);
    setOpen(true);

    // prevent background scroll
    // document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setOpen(false);

    // enable scroll again
    // document.body.style.overflow = "auto";
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel-header">
        <p>{videos?.length ?? 0} clips loaded</p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Virtual, A11y]}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
        virtual={{ enabled: true, addSlidesBefore: 2, addSlidesAfter: 2 }}
        observer
        observeParents
        watchOverflow
        slidesPerView={3}
        spaceBetween={22}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 14 },
          640: { slidesPerView: 1, spaceBetween: 16 },
          768: { slidesPerView: 2, spaceBetween: 18 },
          1024: { slidesPerView: 3, spaceBetween: 22 }
        }}
      >
        {videos?.map((video, index) => (
          <SwiperSlide key={video.id} virtualIndex={index}>
            <VideoCard video={video} onClick={openModal} />
          </SwiperSlide>
        ))}
      </Swiper>

      {open && (
        <div className="video-modal-overlay" onClick={closeModal}>
          <div
            className="video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="video-modal-close" onClick={closeModal}>
              ×
            </button>

            <VideoPlayer video={videos[selectedIndex]} />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCarousel;