import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as React from "react";

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
};

function WishlistItemCard(props) {
    const { classes } = props;
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.gameCover? props.gameCover : "https://media.st.dl.bscstorage.net/steam/apps/517630/header.jpg?t=1543511282"}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.gameCover? props.gameName : "Unknown"}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {/*<CardActions>*/}
                {/*<Button size="small" color="primary">*/}
                    {/*Share*/}
                {/*</Button>*/}
                {/*<Button size="small" color="primary">*/}
                    {/*Learn More*/}
                {/*</Button>*/}
            {/*</CardActions>*/}
        </Card>
    );
}



export default withStyles(styles)(WishlistItemCard);
