import React, { useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      id: 1,
      src: '/img/gallery/gallery-1.webp',
      alt: 'Вареники с вишней',
      category: 'sweet'
    },
    {
      id: 2,
      src: '/img/gallery/gallery-2.webp',
      alt: 'Вареники с картошкой',
      category: 'savory'
    },
    {
      id: 3,
      src: '/img/gallery/gallery-3.webp',
      alt: 'Процесс лепки',
      category: 'process'
    },
    {
      id: 4,
      src: '/img/gallery/gallery-4.webp',
      alt: 'Вареники с творогом',
      category: 'sweet'
    },
    {
      id: 5,
      src: '/img/gallery/gallery-5.webp',
      alt: 'Пельмени ручной работы',
      category: 'savory'
    },
    {
      id: 6,
      src: '/img/gallery/gallery-6.webp',
      alt: 'Семейное производство',
      category: 'process'
    },
    {
      id: 7,
      src: '/img/gallery/gallery-7.webp',
      alt: 'Вареники с черникой',
      category: 'sweet'
    },
    {
      id: 8,
      src: '/img/gallery/gallery-8.webp',
      alt: 'Готовые блюда',
      category: 'serving'
    }
  ];

  const categories = [
    { id: 'all', name: 'Все фото' },
    { id: 'sweet', name: 'Сладкие' },
    { id: 'savory', name: 'Соленые' },
    { id: 'process', name: 'Процесс' },
    { id: 'serving', name: 'Подача' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(image => image.category === selectedCategory);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    if (!selectedImage) return;

    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % galleryImages.length;
    } else {
      newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    }

    setSelectedImage(galleryImages[newIndex]);
  };

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <h2 className="section-title">Наша галерея</h2>
        
        <div className="gallery-filter">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredImages.map(image => (
            <div 
              key={image.id} 
              className="gallery-item"
              onClick={() => openModal(image)}
            >
              <img src={image.src} alt={image.alt} />
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
              <img src={selectedImage.src} alt={selectedImage.alt} />
              <p className="modal-caption">{selectedImage.alt}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;