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
    const name = FetchName(data.member)
    return (
        <PostComentDetailsContainer>
            <img src={img_url} alt="" />
            <div>
                <p><strong>{name}</strong></p>
                <p>{data.comment}</p>
            <AiFillDelete style={{'color':'red','position':'absolute','bottom':'0','right':'0'}} onClick={(e)=>{
                deleteItem(data.id)
            }}/>
            </div>
        </PostComentDetailsContainer>
    )
}

export default PostComentDetails