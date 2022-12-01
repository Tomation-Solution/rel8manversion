import { Grid } from "@mui/material";
import HeadText from "../../components/Dashboard/DashboardHead";
import GalleryImage from '../../images/Vectorlanding.png';
import GalleryCard from "../../components/GalleryCard";
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";

export default function Gallery(){
    return(
        <DashboardLayout>
        <Grid container>
            <HeadText text='Photo Gallery'/>
            <Grid container>
            <GalleryCard image={GalleryImage} text='Alumni General Meeting 2021' />
            <GalleryCard image={GalleryImage} text='Alumni General Meeting 2021' />
            <GalleryCard image={GalleryImage} text='Alumni General Meeting 2021' />
            <GalleryCard image={GalleryImage} text='Alumni General Meeting 2021' />
            </Grid>

        </Grid>
        </DashboardLayout>
    )
}