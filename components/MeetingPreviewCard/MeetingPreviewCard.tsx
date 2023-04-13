import { MeetingPreviewCardContainer } from "./MeetingPreviewCard.style"
import MarkImage from  '../../images/mark.png'

type Prop ={
    title:string;
    details:string;
    onClickAccept:()=>void;
    onClickApolgy:()=>void;
    onClickJoin:()=>void;
}
const MeetingPreviewCard = ({title,details,onClickAccept,onClickJoin,onClickApolgy}:Prop)=>{
    return (
        <MeetingPreviewCardContainer>
            <h2 className="main_meeting_time">{title}</h2>
            <p className="meeting_title">{details.slice(0,100)}</p>
            <div>
                <p onClick={e=>onClickAccept()}>Accept</p>
                <p  onClick={e=>onClickApolgy()}>Apology</p>
                <p  onClick={e=>onClickJoin()}>Join</p>
            </div>
        </MeetingPreviewCardContainer>
    )
}

export default MeetingPreviewCard