import { useLocation } from "react-router";

function Search(){
  const location = useLocation();
  //console.log(new URLSearchParams(location.search).get("keyword"));
  const keyword = new URLSearchParams(location.search).get("keyword");
  return(
    null
  )
}

export default Search;