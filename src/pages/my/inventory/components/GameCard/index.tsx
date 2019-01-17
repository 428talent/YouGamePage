import * as React from "react";
import {Card, createStyles, withStyles, Typography, CardActionArea} from "@material-ui/core";
import BaseProps from "../../../../../base/props";

interface GameCardProps extends BaseProps {
    cover: string
    name: string
    id: number,
    onCardClick: (gameId) => void
}

const GameCard = (props: GameCardProps) => {
    const {classes, cover, name, id, onCardClick} = props;
    return (
        <Card className={classes.card}>
            <CardActionArea onClick={() => onCardClick(id)}>
                <div className={classes.infoOverlay}>
                </div>
                <div className={classes.infoContainer}>
                    <Typography variant={"subtitle1"} className={classes.gameName}
                                style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                        {name}
                    </Typography>
                </div>
                <img src={cover}
                     className={classes.cover}/>
            </CardActionArea>
        </Card>
    );
};
const styles = createStyles(theme => ({
    card: {
        height: 130,
        position: "relative"
    },
    cover: {
        width: "100%",
        height: 130,
        objectFit: "cover"

    },
    gameName: {
        color: "#FFFFFF"
    },
    infoContainer: {
        position: "absolute",
        bottom: 0,
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: 35,
        paddingLeft: 12

    },
    infoOverlay: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "#000000",
        width: "100%",
        height: 35,
        opacity: .5
    }
}));
export default withStyles(styles)(GameCard);
