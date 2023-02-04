import { img_url } from "../../pages/members/news/[news_detail]"
import { PostComentDetailsContainer } from "./PostComentDetails.style"






const PostComentDetails= ():React.ReactElement=>{
    return (
        <PostComentDetailsContainer>
            <img src={img_url} alt="" />
            <div>
                <h3>Michael Ayinde</h3>
                <p>Lorem ipsum dolor sit amet, consectetur a</p>
            </div>
        </PostComentDetailsContainer>
    )
}

export default PostComentDetails