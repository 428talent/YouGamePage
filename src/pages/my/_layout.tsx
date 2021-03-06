import * as React from "react";
import {createStyles, Grid, Paper, withStyles} from "@material-ui/core";
import BaseProps from "../../base/props";
import {connect} from "dva";
import LeftNav from "./components/LeftNav";
import withRouter from "umi/withRouter";


class MyPage extends React.Component<MyPageProps, {}> {

    render(): React.ReactNode {
        const {app} = this.props;
        const {classes, tabIndex, dispatch} = this.props;
        return (
            <div className={this.props.classes.container}>
                <Grid container spacing={24}>
                    <Grid item xs={3}>
                        <LeftNav tabIndex={tabIndex}
                                 onTabChange={(tabIndex) => dispatch({
                                     type: "myPage/changeTab",
                                     payload: {
                                         tab: tabIndex
                                     }
                                 })}
                                 profile={app.user == null ? undefined : app.user.profile}
                        />
                    </Grid>
                    <Grid item xs={9}>
                        {this.props.children}

                    </Grid>
                </Grid>
            </div>
        )
    }
}

const styles = createStyles({
    container: {
        minHeight: 812,
        paddingLeft: 300,
        paddingRight: 300,
        paddingTop: 100
    }
});

interface MyPageProps extends BaseProps {
    dispatch: Function
    tabIndex: string
    history: any
    children: any
    app: any
}

interface MyPageState extends BaseProps {

}

export default withRouter(connect(({myPage, app}) => ({...myPage, app}))(withStyles(styles)(MyPage)))
