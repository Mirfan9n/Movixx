import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";


function SearchResult() {
  const [data, setData] = useState(null)
  const [pageNo, setPageNo] = useState(1)
  const [loading, setLoading] = useState(false)
  const {query} = useParams();

  const fetchInitialData = ()=>{
    setLoading(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNo}`)
    .then((res)=>{
      setData(res);
      setPageNo((prev)=> prev + 1);
      setLoading(false)
    })
  } 

  const fetchNextPageData=()=>{
     setLoading(true)
      fetchDataFromApi(`/search/multi?query=${query}&page=${pageNo}`)
      .then((res)=>{
      if(data?.results){
        setData({
          ...data,
           results: [...data?.results, ...res.results],
          })
      }
      else{
        setData(res);
      }
      setPageNo((prev)=> prev + 1);
      setLoading(false)

    })
  }

  useEffect(()=>{
    setPageNo(1)
    fetchInitialData()
  },[query])

  return (
    <div className="searchResultsPage">
      { loading && <Spinner initial={true} />}
      {
        !loading && 
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${data.total_results > 1 ? "results" : "result"} of ${query}`}
              </div>
              <InfiniteScroll 
                className="content"
                dataLength = {data?.results.length || []}
                next={fetchNextPageData}
                hasMore={pageNo <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results.map((item, index)=>{
                  if (item.media_type === "person") return; 
                  return(
                    <MovieCard 
                      key={index}
                      data={item} 
                      fromSearch={true} 
                    />
                  )
                })}
              </InfiniteScroll>
            </>
          ): (
          <span className={"resultNotFound"}>
            Sorry, Results not Found!!
          </span>
          )}
        </ContentWrapper> 
      }
    </div>
  )
}

export default SearchResult