import styled from "styled-components";
import { motion, useViewportScroll } from "framer-motion";
import { makeImagePath } from "../utils";
import { useNavigate } from "react-router-dom";
import { IMovie } from "../api";

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

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center;
  height: 400px;
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
    <BigCover
      style={{
        backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
          clickedData.backdrop_path,
          "w500"
        )})`,
      }}
    />
    <BigTitle>{clickedData.title||clickedData.name}</BigTitle>
    <BigOverview>{clickedData.overview}</BigOverview>
    </BigMovie>
    </>
  )
}

export default Detail;