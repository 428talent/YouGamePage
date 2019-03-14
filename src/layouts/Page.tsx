import * as React from "react";
import MainNavBar from "./Navbar";
import Footer from "./Footer";
import theme from "../config/theme";
import {MuiThemeProvider} from "@material-ui/core";
import {connect} from "dva";
import "./page.css"
import {SnackbarProvider, withSnackbar} from 'notistack';
import SnackBarOverlay from "./components/SnackBarOverlay";

class Page extends React.Component<PageProps, {}> {
    render(): React.ReactNode {
        const content = (
            <div>
                <MainNavBar
                    user={this.props.user}
                    isDrawerOpen={this.props.isDrawerOpen}
                    dispatch={this.props.dispatch}
                    cartItemCount={this.props.cartCount}
                />
                {this.props.children}
                <Footer/>
            </div>
        )
        return (
            <div>

                <MuiThemeProvider theme={theme}>
                    <SnackbarProvider maxSnack={5}>
                        <SnackBarOverlay>
                            {content}
                        </SnackBarOverlay>
                    </SnackbarProvider>
                </MuiThemeProvider>

            </div>
        )
    }
}

interface PageProps {
    children: React.ReactNode
    user?: UserModel.User
    dispatch: any,
    isDrawerOpen: boolean,
    cartCount: number
}


export default connect(({app}) => ({
    ...app
}))(Page)
