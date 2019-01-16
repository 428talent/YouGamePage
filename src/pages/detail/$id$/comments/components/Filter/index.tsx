import * as React from "react";
import {createStyles, Paper, withStyles, Typography, Divider} from "@material-ui/core";
import BaseProps from "../../../../../../base/props";

interface CommentFilterProps extends BaseProps {

}

const CommentFilter = (props: CommentFilterProps) => {
    const {classes} = props
    return (
        <Paper className={classes.container}>
            <div className={classes.ratingHeader}>
                <Typography variant={"h5"}>
                    好评如潮
                </Typography>
            </div>
            <Divider />
        </Paper>
    );
};
const styles = createStyles(theme => ({
    container: {
        minHeight: 480
    },
    ratingHeader: {
        height: 120,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
    }

}));
export default withStyles(styles)(CommentFilter);
