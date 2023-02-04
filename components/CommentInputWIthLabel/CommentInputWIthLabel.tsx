import {useState,useRef} from 'react'
import useToast from '../../hooks/useToast'
import { img_url } from "../../pages/members/news/[news_detail]"
import CustomBtn from "../CustomBtn/Button"
import { CommentInputWIthLabelContainer } from "./CommentInputWIthLabel.style"




type Prop ={
    submit:(submitedValue:string)=>void,
}
const CommentInputWIthLabel = ({submit}:Prop):React.ReactElement=>{
    const [comment,setComment ] = useState<string>()
    const ref = useRef(null)
    const {notify} = useToast()
    const Submit = (e:any)=>{
        e.preventDefault()
        if(!comment){
            notify('Please Fill the comment box','error')
            return 
        }
        submit(comment)
        ref.current.value=''
    }
    return (
        <form>
            <CommentInputWIthLabelContainer>
            <img src={img_url} alt="" />
            <input ref={ref}  type="text" onChange={(e)=>setComment(e.target.value)} placeholder="Write a comment"/>
            
        </CommentInputWIthLabelContainer>
        <CustomBtn style={{'width':'100px','margin':'0 auto'}} onClick={Submit}>
        Comment
    </CustomBtn>
        </form>
    )
}

export default CommentInputWIthLabel