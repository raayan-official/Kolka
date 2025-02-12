import React from "react";
import Card1 from "../../assets/card4.jpg";
import Card2 from "../../assets/card5.jpg";
import Card3 from "../../assets/card6.jpg";
import Card4 from "../../assets/card3.jpg";

const cards = [
  { id: 1, image: Card1, trend: '2024 Trend', title: "Wonderful Mehndi Cones" },
  { id: 2, image: Card2, trend: '2024 Trend', title: "Wonderful Balm" },
  { id: 3, image: Card3, trend: '2024 Trend', title: "Beautiful Mehndi Powder" },
  { id: 4, image: Card4, trend: '2024 Trend', title: "Cute Paper" },
];

const HeroSection = () => {
  return (
    <section className="section__container hero__container">
      {cards.map((card) => (
        <div key={card.id} className="hero_card">
          <img src={card.image} alt={card.title} className="hero__image" />
          <div className="hero__content">
            <p className="trend">{card.trend}</p>
            <h4>{card.title}</h4>
            <p className="description">Discover more about this trending product.</p> {/* Added description paragraph */}
            <a href="#" className="btn-discover">Discover</a> {/* Action link */}
          </div>
        </div>
      ))}
    </section>
  );
};

export default HeroSection;
