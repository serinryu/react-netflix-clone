import styled from "styled-components";
import { motion, useViewportScroll } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { getTrailer, IGetTrailerResult, IMovie } from "../api";
import { useQuery } from "react-query";
import YouTube from 'react-youtube';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 60vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: 0px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  color: ${(props) => props.theme.white.lighter};
  max-height: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface IclickedMovie {
  clickedData: IMovie;
}

function Detail({clickedData}:IclickedMovie){
  const navigate = useNavigate();
  const { scrollY } = useViewportScroll();
  const onOverlayClick = () => navigate(-1);
  const { data, isLoading } = useQuery<IGetTrailerResult>("trailer", ()=>getTrailer(clickedData.title||clickedData.name));

  return(
    <>
    <Overlay
      onClick={onOverlayClick}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    />
    <BigMovie
      layoutId={clickedData.id + ""}
      style={{ top: scrollY.get() + 100 }}
    >
    <YouTube
    //https://www.youtube.com/watch?v=${data.items.id.videoId}
      videoId={data?.items[0].id.videoId}
      opts={{
        host: "https://www.youtube-nocookie.com",
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1, //자동재생 O
          rel: 0, 
        },
      }}      
    />
    <BigTitle>{clickedData.title||clickedData.name}</BigTitle>
    <BigOverview>{clickedData.overview}</BigOverview>
    </BigMovie>
    </>
  )
}

export default Detail;