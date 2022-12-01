import Image from "next/image";
import { Grid, Typography } from "@mui/material";
import Picture from '../images/chairman.png'

export default function WelcomeAddress(){
    return(<Grid container md={11} marginTop={3} justifyContent='center' alignItems='center' >
        <Grid item md={3}>
            <Image src={Picture} alt={'chairman picture'}/>
        </Grid>
        <Grid item md={8} sm={11} xs={11}  justifyItems="center" >
            <Typography variant='h6' className='text' fontWeight='bolder'> Chairman’s Opening Remark</Typography>
            <Typography textOverflow> 
            On behalf of the National Executive of the Alumni Association of the National Institute for Policy and Strategic Studies, AANI, I bring to you warmest greetings from the generality of our members.
</Typography>
<br />
        <Typography textOverflow>
        Everyone is aware of the role website plays in information dissemination, entertainment and news beats from the organisation that set-up the website. It is in realisation of this fact and in order to restore the culture of appraising people with up to date information about AANI and other useful information. The new Executive Members of the Alumni under my leadership decided for obvious reasons to resuscitate the Alumni Website.
        View Full Address
        Programs
        [AANI Events]

        A couple of programs and events held and officiated by the Alumni Association of the National Institute.
        39th Annual General Meeting
        1st AANI NEC Meeting
        ICAN President visits AANI
        View Events
        Speech
        [AANI Transcribed Speeches]

        Find below a selection of speeches delivered over the years at various AANI functions
        February 22nd, 2017
        Policy and Strategic Studies
        Remarks By Maj. General Lawrence A Onoja (rtd) CFR, Phd, mni, President, Alumni Association of the National Institute for Policy and Strategic Studies (AANI) at Courtesy Visit to His Royal Majesty, Omo n’ Oba n’ edo Uku Akpolokpolo, Oba Ewaure N’ Ogidigan II, Oba of Benin by the National Executive Committee (NEC) of AANI
        Read more
        August 9th, 2016
        Dialogue For Good Governance
        Opening remarks by his eminence, Muhammad Sa’ad Abubakar, III, CFR, mni, the Sultan of Sokoto and Chairman of AANI Heritage Council at a Town Hall Meeting/Policy Dialogue for good governance organised by the Alumni Association of the National Institute (AANI) in collaboration with the federal ministry of information and culture held at Shehu Musa Yar’Adua Centre, Abuja
        Read more
        May 27, 2013
        Meet-The-Press Dinner
        ADDRESS BY THE PRESIDENT ALUMNI ASSOCIATION OF THE NATIONAL INSTITUTE (AANI), MAJ. GENERAL (RTD) LAWRENCE A. ONOJA, CFR, PH.D, mni at the special meet-the-press-dinner organised by AANI
        Read more
        View All Speeches
        Latest
        </Typography>

        </Grid>
    </Grid>)
}