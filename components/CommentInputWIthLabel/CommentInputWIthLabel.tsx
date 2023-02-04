import { img_url } from "../../pages/members/news/[news_detail]"
import { CommentInputWIthLabelContainer } from "./CommentInputWIthLabel.style"






const CommentInputWIthLabel = ():React.ReactElement=>{

    return (
        <CommentInputWIthLabelContainer>
            <img src={img_url} alt="" />
            <input type="text"  placeholder="Write a comment"/>
        </CommentInputWIthLabelContainer>
    )
}

export default CommentInputWIthLabel