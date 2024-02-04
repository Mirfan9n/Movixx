import React from 'react'
import "./style.scss";
import useFetch from '../../hooks/UseFetch';
import { useParams } from 'react-router-dom';
// import DetailsBanner from "../details/detailsBanner/DetailsBanner"
import DetailsBanner from "./detailsBanner/DetailsBanner"
import Cast from './cast/Cast';
import VideosSection from './videosSection/VideosSection';
import Recommendation from './carousel/Recomentation';
import Similar from './carousel/Similar';


function Details() {

  const {mediaType, id}=useParams();
  const {data, loading} = useFetch(`/${mediaType}/${id}/videos`) 
  const {data: credits, loading: creditsLoading} = useFetch(`/${mediaType}/${id}/credits`) 
  
  const trailer = data?.results.find((f) => f.name.includes("Trailer")) || data?.results?.[0] ;
  
  return (
    <div>
      <DetailsBanner video={trailer} crew={credits?.crew}  />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  )
}

export default Details