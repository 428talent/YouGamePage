import * as React from "react";
import MainNavBar from "./Navbar";
import Footer from "./Footer";
import theme from "../config/theme";
import {MuiThemeProvider} from "@material-ui/core";
import {connect} from "dva";
import "./page.css"
class Page extends React.Component<PageProps, {}> {
    render(): React.ReactNode {
        console.log(this.state);
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <MainNavBar user={this.props.user}/>
                    {this.props.children}
                    <Footer/>
                </MuiThemeProvider>
            </div>
        )
    }
}

interface PageProps {
    children: React.ReactNode
    user?:UserModel.User
}



export default connect(({app}) => ({
    ...app
}))(Page)
