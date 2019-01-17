import * as React from "react";
import {createStyles, Grid, Paper, withStyles} from "@material-ui/core";
import {connect} from "dva";
import withRouter from "umi/withRouter";
import BaseProps from "../../../base/props";
import TitleBar from "../components/Title";


class InventoryPage extends React.Component<InventoryProps, {}> {

    render(): React.ReactNode {
        return (
            <div>
                <TitleBar
                    isActionMode={false}
                    onSwitchActionMode={() =>{}}
                    actionChildren={<div></div>}
                    title={"仓库"}/>
            </div>
        )
    }
}

const styles = createStyles({});

interface InventoryProps extends BaseProps {

}


export default withRouter(connect(({myPage, app}) => ({...myPage, app}))(withStyles(styles)(InventoryPage)))
