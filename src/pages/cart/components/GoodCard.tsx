import * as React from "react";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    createStyles, IconButton,
    Paper,
    Typography,
    withStyles
} from "@material-ui/core";
import BaseProps from "../../../base/props";
import {ServerUrl} from "../../../config/api";
import MoreIcon from '@material-ui/icons/Delete'

class GoodCard extends React.Component<GoodCartProp, {}> {
    render(): React.ReactNode {
        const {
            classes,
            goodName,
            gameName,
            price,
            goodId,
            cover,
            onDeleteItem,
            isPhone
        } = this.props;
        if (isPhone) {
            return (
                <Card>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={`${ServerUrl}/${cover}`}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5">
                                {gameName}
                            </Typography>
                            <Typography gutterBottom variant="h6">
                                {goodName}
                            </Typography>
                            <Typography variant="h5" color="primary">
                                ￥{price}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            )
        }
        return (
            <Paper className={classes.goodCard}>
                <div style={{display: "inline-flex"}}>
                    <img
                        src={`${ServerUrl}/${cover}`}
                        className={classes.goodImage}/>
                    <div className={classes.goodInfo}>
                        <Typography variant="h6" noWrap>
                            {gameName}
                        </Typography>
                        <Typography variant="subtitle2" noWrap>
                            {goodName}
                        </Typography>
                        <div>
                            <MoreIcon style={{color: "#6c6c6c"}} onClick={() => onDeleteItem(goodId)}/>
                        </div>
                    </div>
                </div>
                <div style={{display: "inline-flex", textAlign: "right", position: "relative"}}>

                    <Typography variant={"h5"} style={{margin: "auto 40px"}}>
                        ￥{price}
                    </Typography>
                </div>

            </Paper>
        )
    }
}

interface GoodCartProp extends BaseProps {
    goodId: number,
    gameName: string,
    goodName: string,
    price: number,
    cover: string,
    isPhone: boolean,
    onDeleteItem: (id) => void
}

const styles = createStyles({
    goodInfo: {
        marginLeft: 16,
        marginTop: 8,
        maxWidth: 300,
        display: "inline-block"
    },
    goodImage: {
        width: 200,
        display: "flex",
        float: "left",
        height: 94
    },
    goodCard: {
        height: 94,
        display: "flex",
        justifyContent: "space-between"
    },
    media: {
        height: 140,
    },
});
export default withStyles(styles)(GoodCard)
