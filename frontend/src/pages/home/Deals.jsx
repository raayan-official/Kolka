import React, { useState, useEffect } from 'react';
import DealsImage from "../../assets/card3rm.png";

const Deals = () => {
  // Set target date: 14 days from the current time
  const targetDate = new Date('2025-02-25T12:00:00').getTime();

  // State for countdown values
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      // Calculate time left
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Update the time left in state
      setTimeLeft({
        days,
        hours,
        minutes,
        seconds
      });

      // Clear the interval when the countdown finishes
      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className='section__container deals__container'>
      <div className='deals__image'>
        <img src={DealsImage} alt="Deals" />
      </div>
      <div className='deals__content'>
        <h5>Get UpTo 20% Discounts On Your First Order</h5>
        <h4>Deals Of The Month</h4>
        <p className='text-primary'>
          Take advantage of our amazing deals and save big! Time is running out, so hurry!
        </p>
        <div className='deals__countdown'>
          <div className='deals__countdown__card'>
            <h4>{timeLeft.days}</h4>
            <p>Days</p>
          </div>
          <div className='deals__countdown__card'>
            <h4>{timeLeft.hours}</h4>
            <p>Hours</p>
          </div>
          <div className='deals__countdown__card'>
            <h4>{timeLeft.minutes}</h4>
            <p>Min</p>
          </div>
          <div className='deals__countdown__card'>
            <h4>{timeLeft.seconds}</h4>
            <p>Sec</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Deals;
