import React from 'react';
import MainCarousel from './MainCarousel';
import ShoppingList from './ShopingList';

const Home = React.memo(() => {
  return (
    <div className="home">
      <MainCarousel />
      <ShoppingList />
    </div>
  );
});

export default Home;
