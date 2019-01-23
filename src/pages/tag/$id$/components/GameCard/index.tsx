import {Card, CardActionArea, CardContent, CardMedia, createStyles, Typography, withStyles} from "@material-ui/core";
import * as React from "react";
import {ObjectFitProperty} from "csstype";
import router from "umi/router";
import BaseProps from "../../../../../base/props";

class Index extends React.Component<GameCardProps, {}> {

    constructor(props: Readonly<GameCardProps>) {
        super(props);
    }

    render(): React.ReactNode {
        const {
            classes,
            gamePicUrl,
            gameName,
            gamePrice,
            gameId
        } = this.props;
        return (
            <Card className={classes.card}>
                <CardActionArea onClick={() => router.push("/detail/" + gameId)}>
                    <CardMedia
                        component="img"
                        className={classes.media}
                        image={gamePicUrl}
                        title={gameName}
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
    gameId: number
}

const styles = createStyles(theme => ({
    card: {},
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover' as ObjectFitProperty,
    },
    name: {
        whiteSpace: "noWrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    }

}));

export default withStyles(styles)(Index)
