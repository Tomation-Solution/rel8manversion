import { NextPage } from "next";
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";





const service_request:NextPage=()=>{


    return (
        <DashboardLayout>
            <h2 style={{'padding':'1rem','textAlign':'center'}}>There is no service at the moment check back later</h2>
        </DashboardLayout>
    )
}

export default service_request