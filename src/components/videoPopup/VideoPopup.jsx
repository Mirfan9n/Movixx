import React from "react";
import ReactPlayer from "react-player/youtube";
import "./style.scss";
import {
    Bs0Circle,
    BsAlarmFill,
    BsCloudSleet,
    BsDoorClosed
} from "react-icons/bs";
import { FaBoxes, FaShoppingBasket } from "react-icons/fa";
import { VscActivateBreakpoints } from "react-icons/vsc";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };
    return (
        <div className={`videoPopup ${show ? "visible" : ""}`}>
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="videoPlayer">
                <span className="closeBtn" onClick={hidePopup}>
                    🙅🙅‍♀️
                </span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                    playing={true}
                />
            </div>
        </div>
    );
};
export default VideoPopup