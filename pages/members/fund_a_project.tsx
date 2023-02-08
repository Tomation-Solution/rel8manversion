import { NextPage } from "next";
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";





const FundAProject:NextPage=()=>{


    return (
        <DashboardLayout>
            <h2 style={{'padding':'1rem','textAlign':'center'}}>
                There is no project to fund at the moment
            </h2>
        </DashboardLayout>
    )
}

export default FundAProject