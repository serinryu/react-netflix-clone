const MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const MOVIE_BASE_PATH = "https://api.themoviedb.org/3";
const YOUTUBE_BASE_PATH = "https://www.googleapis.com/youtube/v3/search";

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  name: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetTrailerResult {
  items : [
    {
      id : {
        videoId: string;
      }
      snippet : {
        title: string;
      }
    }
  ]
}

export function getMovies() {
  return fetch(`${MOVIE_BASE_PATH}/movie/now_playing?api_key=${MOVIE_API_KEY}`)
  .then(
    (response) => response.json()
  );
}

export function getSearchMovies(query: String){
  return fetch(`${MOVIE_BASE_PATH}/search/movie?api_key=${MOVIE_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`)
  .then(
    (response) => response.json()
  );
}

export function getTvShows(){
  return fetch(`${MOVIE_BASE_PATH}/tv/popular?api_key=${MOVIE_API_KEY}&language=en-US`)
  .then(
    (response) => response.json()
  );
}

export function getTrailer(){
  return fetch(`${YOUTUBE_BASE_PATH}?part=snippet&q=Doctor Strange in the Multiverse of Madness&key=${YOUTUBE_API_KEY}&fields=items(id,snippet(channelId,title))&maxResults=1`)
  .then(
    (response) => response.json()
  );
}
