import { NextPage } from "next/types";
import { useEffect } from "react";
import { DashboardLayout } from "../../../components/Dashboard/Member/Sidebar/dashboard-layout";
import MarkoBtn from "../../../components/MarkoBtn";
import Spinner from "../../../components/Spinner";
import { get_elections } from "../../../redux/Election/ElectionAPi";
import { selectMemberElection } from "../../../redux/Election/ElectionSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { EventContainerV2, EventV2 } from "../../../styles/MembersHome.style";
import { useRouter } from "next/router";




const Election:NextPage = ()=>{
    const {election,status} = useAppSelector(selectMemberElection)
    const dispatch = useAppDispatch()
    const route = useRouter()
    useEffect(()=>{
        dispatch(get_elections({}))
    },[])
    return (
        <DashboardLayout>
            {status=='pending'?<Spinner/>:''}
            {/* <h1>Events</h1> */}

            <div  style={{'display':'flex',
                 'flexWrap':'wrap','justifyContent':'space-between',
                 'padding':'1.5rem',
                 'maxWidth':'900px','margin':'10px auto'
                 }}>
                {
                    election.map((data,index)=>(
                        <EventV2
                        key={index}
                        >
                    <img 
                    src="https://images.unsplash.com/photo-1494172961521-33799ddd43a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80" 
                    alt="Election Photo" style={{'maxWidth':'360px'}}/>
                    <p>Election Name: <strong>{data.name}</strong></p>
                    <p>Role Name: <strong>{data.name}</strong></p>
                    <div className="btn_container">
                <button
                            style={{
                    border: ' 1px solid #075a94',
                    display: 'inlineBlock',
                    padding: '.5rem 1rem',
                    cursor: 'pointer', color:  '#075a94',
                            }}
                            onClick={()=>{
                                //
                                route.push(`/members/election/${data.id}/`)
                            }}
                            >
                                {data.is_close?'Voting Closed':'Vote'}
                            </button>
                </div>
                </EventV2>
                    ))
                }
            </div>
        </DashboardLayout>
    )
}

export default Election