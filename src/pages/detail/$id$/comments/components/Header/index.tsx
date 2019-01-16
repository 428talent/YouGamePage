import * as React from "react";
import {createStyles, Paper, withStyles, Typography} from "@material-ui/core";
import BaseProps from "../../../../../../base/props";

interface CommentHeaderProps extends BaseProps {
    band: string
    name: string
}

const Index = (props: CommentHeaderProps) => {
    const {classes, band, name} = props;
    return (
        <div>
            <Paper className={classes.container}>
                <img className={classes.image} src={band}/>
                <div className={classes.info}>
                    <Typography variant={"h5"}>
                        {name}
                    </Typography>
                    <Typography variant={"h6"}>
                        评论区
                    </Typography>
                </div>
            </Paper>
        </div>
    );
};
const styles = createStyles(theme => ({
    container: {
        height: 120,
        display: "flex"
    },
    image: {
        height: 120
    },
    info: {
        marginLeft: 12,
        marginTop:24
    }
}));
export default withStyles(styles)(Index);
