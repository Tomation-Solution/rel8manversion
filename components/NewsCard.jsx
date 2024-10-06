import { Grid, Typography } from "@mui/material";
import GreenButton from "./Buttonn";
import { useRouter } from "next/router";

export default function Newscard(props) {
  const router = useRouter()

  const saveNews = () => {
    localStorage.setItem('news', JSON.stringify(props.data))
    router.push('/members/news/detail')
  }

  return (
    <Grid item md={4} padding="10px">
      <img
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '10px',
        }}
        src={props.image}
        alt={props.title}
        className="rounded-corners"
      />

      <div style={{ marginTop: '10px' }}>
        <Typography fontWeight="bold" marginY={1}>
          {props.title}
        </Typography>
        <Typography variant="body2" marginBottom={2}>
          {props.body}
        </Typography>
        <Grid md={10} sm={9} style={{ margin: '0 auto' }}>
          <GreenButton
            text="More"
            radius="10px"
            click={() => {
              if (props.onBtnClick) {
                props.onBtnClick()
              } else {
                saveNews()
              }
            }}
            textColor="white"
            paddingY={1}
            paddingX={1}
            bg="#2e3715"
          />
        </Grid>
      </div>
    </Grid>
  )
}
