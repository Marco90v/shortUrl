import { useParams } from "react-router";

function RedirectPages(){
  const { shortId } = useParams();
  if(shortId === "asd"){
    window.location.href = "https://www.youtube.com/";
  }else{
    return(
      <h1>Ruta no encontrada</h1>
    )
  }
}
export default RedirectPages;