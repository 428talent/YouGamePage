import {Paper, Typography, withStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import BaseProps from "../../../base/props";
import * as React from "react";

const TitleBar = (props: TitleBarProps) => {
    const {title,classes} = props;
    return (
        <Paper>
            <header className={classes.header}>
                <Typography variant={"h5"}>
                    {title}
                </Typography>
            </header>
        </Paper>
    )
};
const styles = createStyles(theme =>({
    header: {
        padding: 16
    }
}));
interface TitleBarProps extends BaseProps {
    title:string
}

export default withStyles(styles)(TitleBar)
