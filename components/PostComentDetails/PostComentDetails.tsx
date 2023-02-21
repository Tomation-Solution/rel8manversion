import { img_url } from "../../pages/members/news/[news_detail]"
import { NewsComment } from "../../redux/news/newsSlice"
import { FetchName } from "../../utils/extraFunction"
import { PostComentDetailsContainer } from "./PostComentDetails.style"
import {AiFillDelete} from 'react-icons/ai'




type Prop ={
    data:NewsComment
    deleteItem:(id:number)=>void
}
const PostComentDetails= ({data,deleteItem}:Prop):React.ReactElement=>{
    return (
        <PostComentDetailsContainer>
            <img src={data.member.photo_url?data.member.photo_url:img_url} alt="" />
            <div>
                <p><strong>{data.member.full_name}</strong></p>
                <p>{data.comment}</p>
            <AiFillDelete style={{'color':'red','position':'absolute','bottom':'0','right':'0'}} onClick={(e)=>{
                deleteItem(data.id)
            }}/>
            </div>
        </PostComentDetailsContainer>
    )
}

export default PostComentDetails