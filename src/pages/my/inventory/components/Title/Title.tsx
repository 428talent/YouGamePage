import {IconButton, Paper, Typography, withStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import * as React from "react";
import BaseProps from "../../../../../base/props";
import ArrowBack from "@material-ui/icons/ArrowBack"

const InventoryTitleBar = (props: InventoryTitleProps) => {
    const {title, classes, isDetailMode, onSwitchDetailMode} = props;
    const renderTitleMode = () => {
        return (
            <header className={classes.header}>

                <IconButton onClick={() => onSwitchDetailMode(isDetailMode)}
                            style={{display: isDetailMode ? undefined : "none"}}>
                    <ArrowBack/>
                </IconButton>
                <Typography variant={"h5"}>
                    {title}
                </Typography>

            </header>
        )
    };
    return (
        <Paper>
            {renderTitleMode()}
        </Paper>
    )
};
const styles = createStyles(theme => ({
    header: {
        padding: 16,
        display: "flex",
        height:48,
        alignItems: "center",

    }
}));

interface InventoryTitleProps extends BaseProps {
    title: string
    isDetailMode: boolean
    onSwitchDetailMode: (isActionMode: boolean) => void;
}

export default withStyles(styles)(InventoryTitleBar)
