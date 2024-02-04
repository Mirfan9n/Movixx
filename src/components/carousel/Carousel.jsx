import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs, { Dayjs } from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

function Carousel({data, loading, endpoint, title}) {
    const carouselContaner = useRef()
    const {url} = useSelector(state => state.home);
    const navigate = useNavigate();
    // loading = true


    // const {mediaType} =useParams()
    // console.log(endPoint);

    const navigation =(dir)=>{
        const container = carouselContaner.current
        const scrollAmount = 
        dir === "left"  
            ?container.scrollLeft - (container.offsetWidth + 20) 
            :container.scrollLeft + (container.offsetWidth + 20)
        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        })
    }
    const skItem =()=>{
        return(
            <div className="skeletonItem">
                <div className="posterBlock skeleton">
                    <div className="textBlock">
                        <div className="title skeleton">
                            <div className="date skeleton">
                                
                            </div>    
                        </div>        
                    </div>
                </div>
            </div>
        )
    }

  return (
    <div className="carousel">
        <ContentWrapper>
            {title && 
            <div className="carouselTitle">
                {title}
            </div>}
            <BsFillArrowLeftCircleFill
                className="carouselLeftNav arrow"
                onClick={()=> navigation("left")}
            />
            <BsFillArrowRightCircleFill 
               className="carouselRighttNav arrow"
                onClick={()=> navigation("right")}
            />
        
        {
            !loading? (
                <div className="carouselItems" ref={carouselContaner} >
                    {
                        data?.map((item) => {
                            const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback; 
                            // console.log("posterUrl");
                            return(
                                <div 
                                key={item.id} 
                                onClick={()=> navigate(`/${item.media_type || endpoint }/${item.id}`)} 
                                className="carouselItem">
                                    <div className="posterBlock">
                                        <Img src={posterUrl} />
                                        <CircleRating rating={item.vote_average.toFixed(1)}/>
                                        <Genres data={item.genre_ids.slice(0,2)}/>
                                    </div>
                                   <div className="textBlock">
                                     <span className="title">
                                        {item.title || item.name}
                                    </span>
                                    <span className="date">
                                        {dayjs(item.release_date).format("DD MMMM  YY")}
                                    </span>
                                   </div>
                                </div>
                            )
                        })
                    }

                </div>

            ) : (
                <div className="loadingSkeleton"> 
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    
                </div>
            )
        }
        </ContentWrapper>
    </div>

  )
}

export default Carousel