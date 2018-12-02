import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as React from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {IconButton} from "@material-ui/core";

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
};

function WishlistItemCard(props) {
    const {classes} = props;
    return (
        <Card className={classes.card}>

            <div style={{position: "relative"}}>
                <div style={{position: "absolute", width: "100%",bottom:0,backgroundColor:"rgba(0, 0, 0, .5)",display:"flex",justifyContent: "space-between",
                    alignItems: "flex-end"}}>
                    <Typography style={{display: "inline-flex",color:"#FFFFFF",marginLeft:8}} gutterBottom variant="subtitle1" component="h2">
                        {props.gameName ? props.gameName : "Unknown"}
                    </Typography>
                    <IconButton style={{display:"inline-flex"}} >
                        <MoreVertIcon style={{color: "#FFFFFF"}} fontSize={"small"}/>
                    </IconButton>
                </div>
                <CardMedia
                    className={classes.media}
                    image={props.gameCover ? props.gameCover : "https://media.st.dl.bscstorage.net/steam/apps/517630/header.jpg?t=1543511282"}
                    title="Contemplative Reptile"
                />
                <div style={{position: "absolute", width: "100%"}}>

                </div>

            </div>
        </Card>
    );
}


export default withStyles(styles)(WishlistItemCard);
