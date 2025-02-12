import React from 'react';

const PromoBanner = () => {
  return (
    <section className='section__container banner__container'>
      <div className="banner__card">
        <span><i className="ri-truck-line"></i></span>
        <h4>Free Delivery</h4>
        <p>Enjoy free delivery on all orders. No hidden charges!</p>
      </div>
      <div className="banner__card">
        <span><i className="ri-money-rupee-circle-line"></i></span>
        <h4>Value For Money</h4>
        <p>Get the best value with every purchase. Quality products at affordable prices.</p>
      </div>
      <div className="banner__card">
        <span><i className="ri-customer-service-line"></i></span>
        <h4>Customer Support</h4>
        <p>Our customer support is always here to assist you with any issues or queries.</p>
      </div>
    </section>
  );
};

export default PromoBanner;
