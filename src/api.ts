const API_KEY = "e8e232bc97830d769cd054bcb9186be6";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
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

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`)
  .then(
    (response) => response.json()
  );
}

export function getSearchMovies(query: String){
  return fetch(`${BASE_PATH}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`)
  .then(
    (response) => response.json()
  );
}