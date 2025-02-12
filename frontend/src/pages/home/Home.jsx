import React from 'react';
import Banner from './banner';
import Categories from './Categories';
import HeroSection from './HeroSection';
import TrendingProducts from '../shop/TrendingProducts';
import Deals from './Deals';
import PromoBanner from './PromoBanner';
import Blog from '../blog/Blog';

const home = () => {
  return (
    <>
  <Banner/>
  <Categories/>
  <HeroSection/>
  <TrendingProducts/>
  <Deals/>
  <PromoBanner/>
  <Blog/>
    </>
  )
}

export default home;
