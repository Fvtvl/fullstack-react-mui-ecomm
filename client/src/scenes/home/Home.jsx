import React from 'react';
import MainCarousel from '../../components/MainCarousel';
import ShoppingList from '../../components/ShopingList';
import Subscribe from '../../components/Subscribe';

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
