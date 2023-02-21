import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



type Prop =React.PropsWithChildren<{
    header:string;
}>
const  SimpleAccordion =({header,children}:Prop):React.ReactElement=> {
  return (
    <div>
      <Accordion style={{'backgroundColor':'#075a94'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{'color':'white'}}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{'color':'white'}}>{header}</Typography>
        </AccordionSummary>
        <AccordionDetails >
          <Typography style={{'color':'white'}}>
            {children}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
export default  SimpleAccordion