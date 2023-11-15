import React, { useState, useEffect } from 'react';
import first from '../assets/pexels-aldini-magnifico-4919218.jpg'
// import second from '../assets/pexels-armin-rimoldi-5554236.jpg';
import third from '../assets/pexels-cottonbro-studio-3692746.jpg';
import fourth from '../assets/pexels-cottonbro-studio-3692749.jpg';
// import fifth from '../assets/pexels-cottonbro-studio-6928672.jpg'
import sixth from '../assets/pexels-darina-belonogova-9178823.jpg'
import seventh from '../assets/pexels-eugene-lisyuk-6491531.jpg'
import eighth from '../assets/pexels-helena-lopes-4393386.jpg'
// import ninenth from '../assets/pexels-photo-1488389.jpeg'
// import tenth from '../assets/pexels-ron-lach-10653937.jpg'
import eleventh from '../assets/pexels-tom-balabaud-6447198.jpg'
import twelevth from '../assets/pexels-jordan-bergendahl-9969088.jpg'

import './style.css'

const ImageSwitcher = () => {
  const images = [first,  third, fourth,sixth,seventh,eighth,eleventh,twelevth];
  const [imageIndex, setImageIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (imageIndex + 1) % images.length;
      setImageIndex(newIndex);
      setCurrentImage(images[newIndex]);
    }, 1200);

    return () => {
      clearInterval(interval);
    };
  }, [imageIndex]);

  return (
    <div className='image-container'>
      <img src={currentImage} alt=""  className='image' loading='lazy'/>
    </div>
  );
};

export default ImageSwitcher;
