import React from 'react';
import Banner from '../../Banner';
import Feedback from '../../Feedback';
import Footer from '../../Footer';
import GetStartedFooter from '../../GetStartedFooter';
import GettingStart from '../../GettingStart';
import Offer from '../../Offer';

const Home = () => {
  return (
    <main>
      <Banner />
      <Offer />
      <Feedback />
      <GettingStart />
      <GetStartedFooter />
      <Footer />
    </main>
  );
};

export default Home;
