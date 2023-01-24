import React from 'react';
import MainCarousel from './MainCarousel';

const Home = React.memo(() => {
  return (
    <div className="home">
      <MainCarousel />
    </div>
  );
});

export default Home;
