import {Component, ReactNode} from "react";
import * as React from "react";
import BaseProps from "../../../base/props";
import {connect} from "dva";
import {createStyles, withStyles,Typography} from "@material-ui/core";

interface TagPageProps extends BaseProps {
    dispatch: any
}

class TagPage extends Component<TagPageProps,{}> {

    render(): ReactNode {
        const {classes} = this.props
        return (
            <div className={classes.container}>
                <Typography variant={"h4"}>
                    标签:开放世界
                </Typography>
            </div>
        )
    }
}

const styles = createStyles(theme => ({
    container:{
        marginTop:90,
        marginLeft:500,
        marginRight:500,
        minHeight:820
    }
}));
export default connect(({tagPage}) => ({...tagPage}))(withStyles(styles)(TagPage))
