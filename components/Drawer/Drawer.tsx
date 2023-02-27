import { Drawer }  from "@mui/material";
import CloseRoundedfrom  from "@mui/icons-material/CloseRounded";
import CloseRounded  from "@mui/icons-material/CloseRounded";

type Prop =React.PropsWithChildren<{
    onclose?:()=>void;
    isOpen:boolean;
    setIsOpen:(value:boolean)=>void,
    title?:string;
}>
const CustomDrawer = ({children,title='Hello' ,onclose,isOpen=false,setIsOpen}:Prop):React.ReactElement=>{
    const handleClose  = ()=>{
        if(onclose){
            onclose()
        }
    }

    // const toggleDrawer =
    // ( open: boolean) =>
    // (event: React.KeyboardEvent | React.MouseEvent) => {
    //   if (
    //     event.type === 'keydown' &&
    //     ((event as React.KeyboardEvent).key === 'Tab' ||
    //       (event as React.KeyboardEvent).key === 'Shift')
    //   ) {
    //     return;
    //   }

    // //   setState({ ...state, [anchor]: open });
    // };
    return(
       <Drawer
      anchor={'right'}
      open={isOpen}
      onClose={(e)=>handleClose()}
      style={{'padding':'.7rem'}}
    >   
    <div style={{'display':'flex','alignItems':'center','justifyContent':'space-between','padding':'0 .7rem'}}>
        <h2>{title}</h2>
    <CloseRounded  onClick={(e)=>setIsOpen(false)}/>
    </div>
       <div style={{'padding':' 0 2rem'}}>
       {children}
       </div>
    </Drawer>
    )
}

export default CustomDrawer