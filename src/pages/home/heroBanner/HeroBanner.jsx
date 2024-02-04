import React, { useEffect, useState } from 'react'
import "./style.scss";
import { Link,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useFetch from '../../../hooks/UseFetch';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

function HeroBanner() {
  const [background, setBackground] = useState("")
  const [query, setQuery] = useState("")
  const navigate = useNavigate();
  const { url } = useSelector(state => state.home)
  const {data, loading} = useFetch("/movie/upcoming");
  
  useEffect(()=>{
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path
    setBackground(bg);
    // console.log(bg);
  },[data])

   const searchQueryHandler= (event)=>{
    if(event.key === "Enter" && query.length>0){
        navigate(`/search/${query}`)
    }
  }

  return (
    <div className='heroBanner'>
     {!loading && <div className="backdrop-img">
          <Img 
            src={background}
          />
      </div>}

      <div className="opacity-layer"></div>

      <ContentWrapper>  
        <div className="heroBannerContent">
          <span className="tittle">Welcome</span>
          <span className="subTittle">
            Millions of movies, tv shows and people to discover.
            Explore now.
          </span>
          <div className="searchInput">
            <input 
            type="text" 
            placeholder='Search For a Movie or TV show....'
            onChange={(e)=>setQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
      
    </div>
  )
}

export default HeroBanner