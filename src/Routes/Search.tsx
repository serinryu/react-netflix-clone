import { useQuery } from "react-query";
import { useLocation } from "react-router";
import { getSearchMovies, IGetMoviesResult } from "../api";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { makeImagePath } from "../utils";

const Loader = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  background: black;
`;

const Notice = styled.div`
  position: relative;
  top: 100px;
  padding: 10px;
  color: white;
  font-size: 30px;
  font-weight: 50;
`

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

const Box = styled(motion.div)<{bgPhoto: string}>`
  background-color: white;
  height: 250px;
  color: red;
  font-size: 66px;
  background-image: url(${(props) => props.bgPhoto});
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

function Search(){
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], ()=>getSearchMovies(keyword||""));
  return(
    <Wrapper>
      <Notice>Search for {keyword}</Notice>
      <Title>Movie & TV show</Title>
      { isLoading ? (
        <Loader>Loading..</Loader>
      ) : (
      <Slider>
      <AnimatePresence initial={false} >
        <Row>
          {data?.results.map((movie) => (
            <Box 
              key={movie.id} 
              layoutId={movie.id + ""}
              bgPhoto={makeImagePath(movie.backdrop_path, "w500")} 
              whileHover="hover"
              initial="normal"
              variants={boxVariants}
              transition={{ type: "tween" }}>
                <Info variants={infoVariants}>
                  <h4>{movie.title}</h4>
                </Info>
              </Box>
          ))}
        </Row>
      </AnimatePresence>
    </Slider>
    )};
  </Wrapper>
  )
}

export default Search;