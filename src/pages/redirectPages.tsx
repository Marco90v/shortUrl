import Loading from "@/components/loading";
import { getOriginalLink } from "@/services/firebase";
import { useParams } from "react-router";

function RedirectPages(){
  const { shortId } = useParams();
  
  const getLink = async (shortId:string | undefined) => {
    if(shortId === undefined) return;
    getOriginalLink(shortId).then((res:{linkOriginal:string|null})=>{
      console.log(res);
      if(res.linkOriginal){
        window.location.href = res.linkOriginal;
      }
    });
  }

  getLink(shortId);

  return <Loading />
}
export default RedirectPages;