import {Card, CardActionArea, CardContent, CardMedia, Typography, withStyles} from "@material-ui/core";
import * as React from "react";
import BaseProps from "../../base/props";
import {ObjectFitProperty} from "csstype";

class GameCard extends React.Component<GameCardProps, {}> {

    constructor(props: Readonly<GameCardProps>) {
        super(props);
    }

    render(): React.ReactNode {
        const {
            classes,
            gamePicUrl,
            gameName,
            gamePrice
        } = this.props;
        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        className={classes.media}
                        image={gamePicUrl}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="subtitle2" component="h2" className={classes.name}>
                            {gameName}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            ￥{gamePrice}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
}

interface GameCardProps extends BaseProps {
    gamePicUrl: string
    gameName: string
    gamePrice: number
}

const styles = theme => ({
    card: {

    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover' as ObjectFitProperty,
    },
    name:{
        whiteSpace:"noWrap",
        overflow:"hidden",
        textOverflow:"ellipsis"
    }

});

export default withStyles(styles)(GameCard)
