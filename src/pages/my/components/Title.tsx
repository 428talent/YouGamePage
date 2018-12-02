import {ExpansionPanel, ExpansionPanelDetails, IconButton, Paper, Typography, withStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import BaseProps from "../../../base/props";
import * as React from "react";
import ActionModeIcon from "@material-ui/icons/Apps"
import CloseIcon from "@material-ui/icons/Close"
import {ReactNode} from "react";

const TitleBar = (props: TitleBarProps) => {
    const {title, classes, isActionMode, actionChildren} = props;
    const renderActionModeContent = () => {
        return (
            <header className={classes.header} style={{backgroundColor: "#333333"}}>
                <div style={{display: "inline-flex"}}>
                    {actionChildren}
                </div>
                <div style={{display: "inline-flex"}}>
                    <IconButton onClick={() => props.onSwitchActionMode(isActionMode)}>
                        <CloseIcon style={{color: "#FFFFFF"}}/>
                    </IconButton>
                </div>
            </header>
        )
    };
    const renderTitleMode = () => {
        return (
            <header className={classes.header}>
                <div style={{display: "inline-flex"}}>
                    <Typography variant={"h5"}>
                        {title}
                    </Typography>
                </div>
                <div style={{display: "inline-flex"}}>
                    <IconButton onClick={() => props.onSwitchActionMode(isActionMode)}>
                        <ActionModeIcon/>
                    </IconButton>
                </div>
            </header>
        )
    };
    return (
        <Paper>
            {isActionMode ? renderActionModeContent() : renderTitleMode()}
        </Paper>
    )
};
const styles = createStyles(theme => ({
    header: {
        padding: 16,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

    }
}));

interface TitleBarProps extends BaseProps {
    title: string
    isActionMode: boolean
    onSwitchActionMode: (isActionMode: boolean) => void;
    actionChildren: ReactNode
}

export default withStyles(styles)(TitleBar)
