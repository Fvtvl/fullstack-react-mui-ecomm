import React from 'react';
import MainCarousel from './MainCarousel';
import ShoppingList from './ShopingList';
import Subscribe from './Subscribe';

const Home = React.memo(() => {
  return (
    <div className="home">
      <MainCarousel />
      <ShoppingList />
      <Subscribe />
    </div>
  );
});

export default Home;
