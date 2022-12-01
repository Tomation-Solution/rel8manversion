import { Grid } from "@mui/material";
import HeadText from "./DashboardHead";
import GalleryImage from '../../images/Vectorlanding.png';
import GalleryCard from "../GalleryCard";

export default function Gallery(){
    return(
        <Grid container>
            <HeadText text='Photo Gallery'/>
            <Grid container>
            <GalleryCard image={GalleryImage} text='Alumni General Meeting 2021' />
            <GalleryCard image={GalleryImage} text='Alumni General Meeting 2021' />
            <GalleryCard image={GalleryImage} text='Alumni General Meeting 2021' />
            <GalleryCard image={GalleryImage} text='Alumni General Meeting 2021' />
            </Grid>

        </Grid>
    )
}