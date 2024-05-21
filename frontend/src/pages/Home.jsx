// import React from 'react'

import Hero from "../Components/Hero"
import NewCollections from "../Components/NewCollections"
import Offer from "../Components/Offer"
import Popular from "../Components/Popular"
import TopRated from "../Components/TopRated"

const Home = () => {
  return (
    <>
      <Hero/>
      <TopRated/>
      <Popular/>
      <Offer/>
      <NewCollections/>
    </>
  )
}

export default Home
