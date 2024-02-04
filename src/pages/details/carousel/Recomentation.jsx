import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/UseFetch";


const Recommendation = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );
    // console.log(mediaType);

    {
    if(data?.results?.length > 0 ){
        return (
        <Carousel
            title="Recommendations"
            data={data?.results}
            loading={loading}
            endpoint={{mediaType}}
        />
        );
    } 
    else
        return
    }
};

export default Recommendation;