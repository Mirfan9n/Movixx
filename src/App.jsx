import { useEffect, useState } from 'react'
import {fetchDataFromApi} from './utils/api.js'
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSlice.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'

import Home from './pages/home/Home.jsx'
import SearchResult from './pages/searchResult/SearchResult.jsx'
import Details from './pages/details/Details.jsx'
import Explore from "./pages/explore/Explore.jsx";
import PageNoteFound from "./pages/404/PageNoteFound.jsx"
import useFetch from './hooks/UseFetch.jsx';


function App() {
  const dispatch = useDispatch();
  const  {url}  = useSelector(state => state.home);

  useEffect(()=>{
  fetchApiConfig();
  genresCall();
  },[])
  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration')
      .then((res) => {
      console.log(res);
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        }

      dispatch(getApiConfiguration(url))
      })
  }

  const genresCall = async ()=>{
    let promises = []
    let endPoints = ["tv", "movie"]
    let allGenres = {}

    endPoints.forEach((type)=>{
      promises.push(fetchDataFromApi(`/genre/${type}/list`))
    })
    
    const data = await Promise.all(promises);
    console.log(data);
    data.map(({genres})=>(
      genres.map((item)=> (allGenres[item.id] = item))
    ))
    dispatch(getGenres(allGenres))
  } 

  const daty =useFetch(`/discover/movie`)
  console.log(daty);
  return (
    <>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Details />} />
        <Route path='/search/:query' element={<SearchResult />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='*' element={<PageNoteFound />} />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
