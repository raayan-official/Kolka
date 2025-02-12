import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  // Define slides data (images and content)
  const slides = [
    {
      image: '../src/assets/hand.jpg',
      title: 'Up To 30% Discount On Your First Order',
      subtitle: 'Exclusive offers on your first purchase!',
      ctaText: 'Explore More',
      ctaLink: '/shop',
    },
    {
      image: '../src/assets/balm.jpg',
      title: 'Free Delivery on All Orders',
      subtitle: 'Get your items delivered without extra cost!',
      ctaText: 'Shop Now',
      ctaLink: '/shop',
    },
    {
      image: '../src/assets/mehndi3.jpg',
      title: 'Limited Time Offer',
      subtitle: 'Hurry up, offers end soon!',
      ctaText: 'Discover More',
      ctaLink: '/shop',
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to change the slide every 5 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(slideInterval);  // Clean up interval on component unmount
  }, []);

  // Function to navigate to a specific slide
  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <section className="header__container" style={{
      backgroundImage: `url(${slides[currentSlide].image})`,
      backgroundSize: 'cover',
      backgroundPosition: '80% 32%',
    }}>
      <div className="header__content">
        <h4 className="uppercase">{slides[currentSlide].title}</h4>
        <h1>{slides[currentSlide].subtitle}</h1>
        <p>
          Discover our exclusive offers and enjoy great savings on your first purchase. Don't miss out on limited-time deals!
        </p>
        <button className="btn"><Link to={slides[currentSlide].ctaLink}>Explore More</Link></button>
      </div>

      {/* Navigation Dots */}
      <div className="slider__dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Banner;
