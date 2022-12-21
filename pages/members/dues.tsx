 import {NextPage} from 'next'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { DashboardLayout } from '../../components/Dashboard/Member/Sidebar/dashboard-layout'
import Table from '../../components/Table/Table'
import { useAppDispatch } from '../../redux/hooks'
import { selectMemberDues, setMemberDuesStatus } from '../../redux/memberDues/memberDuesSlice'
import { getMemberDueBreakDown, getMemberduesApi, payDuesApi } from  '../../redux/memberDues/memberDuesApi'
import PendingIcon from '@mui/icons-material/Pending';
import CheckIcon from '@mui/icons-material/Check';
import useToast from '../../hooks/useToast'
import Spinner from '../../components/Spinner'
const Dues:NextPage = ()=>{

    const dispatch = useAppDispatch()
    const {status ,dues,message,due_break_down} = useSelector(selectMemberDues)
    const {notify } = useToast()
      const prop_columns = [
        {
            Header:'Email',
            accessor:'user__email',
            id:1,
            },
            {
                Header:'Due Name',
                accessor:'due__Name',
            },
            {
                Header:'Over Due',
                accessor:'is_overdue',
                Cell:(tableProps:any)=>(
                    <p>
                          {
                            tableProps.row.original.is_overdue?
                            <CheckIcon style={{'color':'#04a9fb'}}/>
                            :
                            <PendingIcon style={{'color':'yellow'}}/>
                          }
                    </p>
                )
            },
            {
                Header:'amount',
                accessor:'amount',
            },
        
            {
                Header:'Has Paid',
                accessor:'is_paid',
                Cell:(tableProps:any)=>(
                    <p>
                          {
                            tableProps.row.original.is_paid?
                            <CheckIcon style={{'color':'#04a9fb'}}/>
                            :
                            <PendingIcon style={{'color':'yellow'}}/>
                          }
                    </p>
                )
            },
            {
                Header:'Pay',
                accessor:'id',
                Cell:(tableProps:any)=>(
                    <button onClick={()=>{
                        // tableProps.row.original.id
                        dispatch(payDuesApi(tableProps.row.original.id))
                    }}>
                        Pay
                    </button>
                )
            }
        ]

    useEffect(()=>{
        dispatch(getMemberduesApi())
        dispatch(getMemberDueBreakDown())
    },[])

    useEffect(()=>{
        if(status == 'error'){
            notify(message,'error')
            dispatch(setMemberDuesStatus('idle'))
        }
        if(status == 'success'){
            notify(message,'success')
            dispatch(setMemberDuesStatus('idle'))

        }
    },[status])

    return (
        <DashboardLayout>
            {
                status==='pending'?
                <Spinner/>:''
            }
          <div style={{'margin':'1rem auto','maxWidth':'800px','display':'block'}}>

                <div style={{'display':'inline-block','padding':'1.4rem','borderRadius':'10px','color':'white','backgroundColor':'#04a9fb'}}>
                    <p><strong>Outstanding</strong>: {due_break_down.outstanding}</p>
                    <p><strong>Paid</strong>: {due_break_down.total_paid}</p>
                </div>
                <br />
                <br />
                <br />
            <Table prop_columns={prop_columns} custom_data={dues}/>

          </div>
        </DashboardLayout>
    )
}

export default Dues