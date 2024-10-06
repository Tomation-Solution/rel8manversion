import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function ChildNewsCard(props) {
  const route = useRouter();
  
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: "auto",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        },
        mb: 2
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={props.image}
        alt={props.title}
        sx={{ objectFit: "cover", borderRadius: '4px' }}
      />
      <CardContent>
        <Typography variant="caption" color="textSecondary">
          {props.date}
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1 }}>
          {props.title}
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          sx={{ cursor: "pointer", mt: 2, textDecoration: "underline" }}
          onClick={() => {
            localStorage.setItem("publication_detail", JSON.stringify(props.data));
            route.push("/members/publicationDetail");
          }}
        >
          Read More
        </Typography>
      </CardContent>
    </Card>
  );
}
