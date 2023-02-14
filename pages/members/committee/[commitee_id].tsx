import {NextPage} from 'next'
import { useEffect, useState } from 'react'
import { DashboardLayout } from '../../../components/Dashboard/Member/Sidebar/dashboard-layout'
import {useRouter} from 'next/router'
import { selectCommitee } from '../../../redux/committee/committeeSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { get_commitee,commiteeDetailApi } from '../../../redux/committee/CommitteeApi'
import { useMediaQuery } from 'react-responsive'
import Line from '../../../components/Line'
import { FetchName, FetchNameByMemberInfo } from '../../../utils/extraFunction'
import CustomBtn from '../../../components/CustomBtn/Button'
import Table from '../../../components/Table/Table'
import { MemberType } from '../../../redux/members/membersApi'
import OffCanvas from '../../../components/OffCanvas/OffCanvas'
import Profile from '../../../components/Profile/Profile'



const CommiteeDetail:NextPage = ()=>{
    const route =useRouter()
    const {commitee_id } = route.query
    const dispatch = useAppDispatch()
    const isPhone = useMediaQuery({ query: '(max-width: 360px)' })
    const [isOpen, setIsOpen] = useState(false)

    const { commitee ,status,message,commiteeDetail:data} = useAppSelector(selectCommitee);
    const [current_member,setCurrentMember]=useState<MemberType>()
    const prop_columns = [

        {
            Header:'Email',
            accessor:'email',
            id:1,
            
        },
        {
            Header:'Name',
            accessor:'member_info',
            id:2,
            Cell:(tableProps:any)=>{
                return  <p>
                    {FetchNameByMemberInfo(tableProps.row.original.member_info)}
                </p>
            }
        },
        {
            Header:'more',
            accessor:'id',
            id:3,
            Cell:(tableProps:any)=>(
                <CustomBtn style={{'width':'100px'}} 
                onClick={(e)=>{
                    const members:MemberType[] = data.connected_members.filter(d=>d.id===tableProps.row.original.id)
                    if(members.length==1){
                        setCurrentMember(members[0])
                        setIsOpen(true)
                    }
                }} 
                styleType='sec'>View profile</CustomBtn>
            )
        },
    ]
    const isLaptop = useMediaQuery({
        query: '(min-width: 524px)'
      })
    useEffect(()=>{
        //
        if(typeof commitee_id == 'string'){
            dispatch(commiteeDetailApi(parseInt(commitee_id)))
        }
    },[route.isReady])
    return (
        <DashboardLayout>
           <div style={{'padding':'1rem'}}>
                {
                    data?
                            <div
         style={{
            'maxWidth':'800px','margin':'0 auto','textAlign':'center'
        }}
        >
                <img 
      src={data.team_of_reference}
                alt=""  style={{'width':'100%',
            'height':isLaptop?'400px':'300px','objectFit':'cover','borderRadius':'10px'}}/>
            <br />
            <br />
            <h2 style={{'textAlign':'center','padding':'1rem'}}>{data?.name }</h2>
            {/* <p>
              Info: <strong>{data.details}</strong>
            </p> */}
        <br />
         

          {/* <div style={{'display':'flex','alignItems':'center',}}>
              <HiCalendar style={{'fontSize':'1.4rem'}}/>
              
            <p style={{'padding':'0 .7rem'}}>
              {data.addresse}
            </p>
          </div> */}
        <Line/>
        <br />
        <div>
            <ul>
                <h2>Commitee Todo</h2>
                {
                    data.commitee_todo.how.map((item,index)=>(
                        <li key={index}>{item}</li>
                    ))
                }
            </ul>
            <br />
                <h2>Commitee Duties</h2>
            <ul>
                {
                    data.commitee_duties.how.map((item,index)=>(
                        <li key={index}>{item}</li>
                    ))
                }
            </ul>
          </div>
        <Line/>

                <br />
                <br />
        {/* attendees */}
        <Table prop_columns={prop_columns} custom_data={data.connected_members}/>
              <br /><br />

             

        </div>:''
                }
            </div>

               
           
           <OffCanvas
            size={isPhone?90:40}
           setIsOpen={setIsOpen}
           isOpen={isOpen}>
            {
                current_member?
                <Profile member={current_member} />:''
            }
           </OffCanvas>
        </DashboardLayout>
    )
}


export default CommiteeDetail