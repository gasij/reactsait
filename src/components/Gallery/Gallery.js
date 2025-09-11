import React, { useState } from 'react';
import { galleryData } from '../../data/galleryData';
import './Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    if (!selectedImage) return;

    const currentIndex = galleryData.findIndex(img => img.id === selectedImage.id);
    let newIndex;

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % galleryData.length;
    } else {
      newIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    }

    setSelectedImage(galleryData[newIndex]);
  };

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <h2 className="section-title">Наше производство</h2>

        <div className="gallery-grid">
          {galleryData.map(image => (
            <div 
              key={image.id} 
              className="gallery-item"
              onClick={() => openModal(image)}
            >
              <img src={image.image} alt={image.alt} />
              <div className="gallery-overlay">
                <i className="fas fa-search-plus"></i>
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
              <button className="modal-nav modal-nav-prev" onClick={() => navigateImage('prev')}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className="modal-nav modal-nav-next" onClick={() => navigateImage('next')}>
                <i className="fas fa-chevron-right"></i>
              </button>
              <img src={selectedImage.image} alt={selectedImage.alt} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;