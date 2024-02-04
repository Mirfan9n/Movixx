import React,{useState} from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/UseFetch'
import Carousel from '../../../components/carousel/Carousel'

const Trending= ()=> {

    const [endPoint, setEndPoint] = useState("day")
    const [showType, setshowType] = useState("movie")

    const {data, loading} = useFetch(`/trending/${showType}/${endPoint}`)

    const onTabChange=(tab)=>{
      if(tab === "Day" || tab === "Week" ){
        setEndPoint(tab === "Day" ? "day" : "week");
      }
      else{
        setshowType(tab === "Movie" ? "movie" : "tv")
      }
        
          
      console.log(`/trending/${showType}/${endPoint}`);

      // console.log(showType);
      // console.log(endPoint);
    }
    console.log(data?.results);
  return (
    <div className='carouselSction'>
        <ContentWrapper>
            <span className="carouselTittle">Trending</span>
            <SwitchTabs data={["Movie", "TV Show"]} onTabChange={onTabChange}/>
            <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data = {data?.results} loading= {loading}/>
    </div>
  )
}

export default Trending