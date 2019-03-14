import BaseProps from "../../base/props";
import * as React from "react";
import {Chip, Divider, Link, Typography, withStyles} from "@material-ui/core";
import ListItemText from '@material-ui/core/ListItemText';

class GameItem extends React.Component<GameItemProp, {}> {

    constructor(props: Readonly<GameItemProp>) {
        super(props);
    }

    render(): React.ReactNode {
        const {gameName, gamePrice, gameCover, classes, goodName, gameId} = this.props;
        return (
            <div>
                <div className={classes.root}>
                    <div>
                        <img src={gameCover} className={classes.pic}/>
                        <div className={classes.gameInfo}>
                            <Link href={`/detail/${gameId}`}>
                                <Typography variant="subtitle1">
                                    {goodName}
                                </Typography>
                            </Link>
                            <Typography variant="subtitle2">
                                {gameName}
                            </Typography>
                        </div>
                    </div>
                    <Typography variant="subtitle1" className={classes.gamePrice}>
                        ￥{gamePrice}
                    </Typography>
                </div>
                <Divider/>
            </div>
        )
    }
}

interface GameItemProp extends BaseProps {
    gameName: string,
    gamePrice: number,
    gameCover: string,
    goodName: string,
    gameId: number
}

const styles = theme => ({
    root: {
        backgroundColor: "#FFFFFF",
        width: "100%",
        height: 80,
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        marginBottom: 12,
        marginTop: 12
    },
    pic: {
        height: 80,
        float: "left" as 'left'
    },
    gameName: {
        width: 200,

    },
    gameInfo: {
        marginLeft: 200

    },
    gamePrice: {
        float: "right" as 'right',
    },
    chip: {
        marginRight: 8,
        fontSize: 10,
        height: 15
    }
});
export default withStyles(styles)(GameItem)
