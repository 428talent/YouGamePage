import * as React from 'react'
import {withStyles,Typography} from "@material-ui/core";
import BaseProps from "../base/props";

class Footer extends React.Component<FooterProps, {}> {

    constructor(props: Readonly<FooterProps>) {
        super(props);
    }

    render(): React.ReactNode {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <div style={{display:"inline-block"}}>
                    <Typography variant={"h6"} style={{color:"#FFFFFF"}}>
                        YouGame
                    </Typography>

                </div>
            </div>
        )
    }
}

interface FooterProps extends BaseProps {

}

const styles = theme => ({
    root: {
        display: "flex",
        textAlign: "center" as "center",
        height: 100,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "#333333"

    }
});
export default withStyles(styles)(Footer)
