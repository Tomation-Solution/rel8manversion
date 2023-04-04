import { NextPage } from "next";
import GreenButton from "../../../components/Buttonn";
import { DashboardLayout } from "../../../components/Dashboard/Member/Sidebar/dashboard-layout";
import { EventContainerV2, EventV2 } from "../../../styles/MembersHome.style";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { get_contestant, member_vote } from "../../../redux/Election/ElectionAPi";
import { useDispatch } from "react-redux";
import Spinner from "../../../components/Spinner";
import { useAppSelector } from "../../../redux/hooks";
import { selectMemberElection } from "../../../redux/Election/ElectionSlice";
import useToast from "../../../hooks/useToast";




const ElectionDetail:NextPage = ()=>{

    const route = useRouter();
    const {election_detail}  = route.query
    const dispatch = useDispatch()
    const {status,contestant,message} = useAppSelector(selectMemberElection)
    const {notify} = useToast()
    useEffect(()=>{
        if(typeof election_detail == 'string'){
            dispatch(get_contestant(parseInt(election_detail)))
        }
    },[route.isReady])
    useEffect(()=>{

        if(status== 'voted'){
            notify(message,'success')
        }
        if(status== 'error'){
            //
            notify(message,'error')

        }
    },[status])
    return(
        <DashboardLayout>   
            {status=='pending'?<Spinner/>:''}

                <img 
                style={{'width':'400px','height':'400px','maxWidth':'500px','margin':'0 auto','borderRadius':'10px'}}
                src="https://images.unsplash.com/photo-1494172961521-33799ddd43a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80" 
                alt="Election Photo" />

                <br />
                <br />
                <br />
                <br />
               
                 <div style={{'display':'flex',
                 'flexWrap':'wrap','justifyContent':'space-between','alignItems':'center',
                 'padding':'1.5rem',
                 'maxWidth':'900px','margin':'10px auto'
                 }}>
                 {
                 contestant.map((data,index)=>(
                        <div key={index}
                        style={{'margin':'10px 4px','textAlign':'center'}}
                        >
                        <img 
                        style={{'width':'150px','height':'150px','borderRadius':'50%','display':'block','margin':'0 auto'}}
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60" alt="" />
                <br />
                <p>{data.member__user__email}</p>
                <p>Vote Count <strong>{data.amount_vote}</strong></p>
                                <p>Vote Testimonial <a href={data.youtubeVidLink} style={{'color':'#045696'}}> View</a></p>
                                    <br />
                                <button
                                style={{
        border: ' 1px solid #045696',
        display: 'inlineBlock',
        padding: '.5rem 1rem',
        cursor: 'pointer', color:  '#045696',
                                }}
                                onClick={(e)=>{
                                    if(typeof election_detail == 'string'){
                                        dispatch(member_vote({
                                            'ballotBoxID':parseInt(election_detail),
                                            'contestantID':data.id,
                                            'vote':1,
                                        }))
                                    }
                                }}
                                >
                                    Vote
                                </button>
                    </div>
                    ))
                  }
                 </div>
        </DashboardLayout>
    )
}

export default  ElectionDetail