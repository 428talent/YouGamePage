import BaseProps from "../../base/props";
import * as React from "react";
import {Chip, Divider, Typography, withStyles} from "@material-ui/core";
import ListItemText from '@material-ui/core/ListItemText';

class GameItem extends React.Component<GameItemProp, {}> {

    constructor(props: Readonly<GameItemProp>) {
        super(props);
    }

    render(): React.ReactNode {
        const {gameName, gamePrice, gameCover, classes} = this.props;
        return (
            <div className={classes.root}>

                <img src={gameCover} className={classes.pic}/>
                <div className={classes.gameInfo}>
                    <Typography variant="subtitle1">
                        {gameName}
                    </Typography>
                    <div>

                        <Chip label="冒险" className={classes.chip}/>
                        <Chip label="奇幻" className={classes.chip}/>
                        <Chip label="Basic Chip" className={classes.chip}/>


                    </div>
                    <Typography variant="subtitle1" className={classes.gamePrice}>
                        ￥{gamePrice}
                    </Typography>

                </div>
            </div>
        )
    }
}

interface GameItemProp extends BaseProps {
    gameName: string,
    gamePrice: number,
    gameCover: string
}

const styles = theme => ({
    root: {
        backgroundColor: "#FFFFFF",
        width: "100%",
        height: 80
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
        height:15
    }
});
export default withStyles(styles)(GameItem)
