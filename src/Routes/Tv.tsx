import { useQuery } from "react-query";
import { getTvShows, IGetMoviesResult } from "../api";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { makeImagePath } from "../utils";
import Detail from "../Components/Detail";
import { useMatch, useNavigate } from "react-router-dom";

const Loader = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  background: black;
`;

const Title = styled.h2`
  position: relative;
  top: 120px;
  padding: 10px;
  font-size: 30px;
  color: white;
`;

const Slider = styled.div`
  position: relative;
  top: 130px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{bgphoto: string}>`
  background-color: white;
  height: 250px;
  color: red;
  font-size: 66px;
  cursor: pointer;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  opacity: 0;
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`
const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

function Tv(){
  const navigate = useNavigate();
  const { data, isLoading } = useQuery<IGetMoviesResult>("tvshows", getTvShows);
  const bigTvMatch = useMatch("/tv/:tvId");
  const onBoxClicked = (movieId: number) => {
    navigate(`/tv/${movieId}`) 
  };
  const clickedMovie =
    bigTvMatch?.params.tvId && 
    data?.results.find((movie) => movie.id+"" === bigTvMatch?.params.tvId);
  return(
    <Wrapper>
      <Title>TV show</Title>
      { isLoading ? (
        <Loader>Loading..</Loader>
      ) : (
      <>
      <Slider>
      <AnimatePresence initial={false} >
        <Row>
          {data?.results.map((movie) => (
            <Box 
              key={movie.id} 
              layoutId={movie.id + ""}
              onClick={() => onBoxClicked(movie.id)}
              bgphoto={makeImagePath(movie.poster_path, "w500")} 
              whileHover="hover"
              initial="normal"
              variants={boxVariants}
              transition={{ type: "tween" }}>
                <Info variants={infoVariants}>
                  <h4>{movie.name}</h4>
                </Info>
              </Box>
          ))}
        </Row>
      </AnimatePresence>
    </Slider>
    <AnimatePresence>
    {bigTvMatch && clickedMovie ? (
      <Detail clickedData={clickedMovie}/>
    ) : (
      null
    )}
    </AnimatePresence>
    </>
    )};
  </Wrapper>
  )
}

export default Tv;