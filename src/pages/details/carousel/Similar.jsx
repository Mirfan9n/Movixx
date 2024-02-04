import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/UseFetch";


const similar = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/similar`
    );
        // console.log(mediaType);
    const title = mediaType === "tv" ? "Similar TV Shoes" : "Similar Movies"  
    {
    if(data?.results?.length > 0 ){
        return (
        <Carousel
            title={title}
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
        );
    } 
    else
        return
    }
};

export default similar;