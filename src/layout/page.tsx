import * as React from "react";
import MainNavBar from "./navbar";
import Footer from "./footer";
import theme from "../config/theme";
import {MuiThemeProvider} from "@material-ui/core";
import {readCookieJWTPayload} from "../utils/auth";
import {FetchUser} from "../services/user";

class Page extends React.Component<PageProps, PageState> {
    state: Readonly<PageState> = {
        user: undefined
    };

    constructor(props: Readonly<PageProps>) {
        super(props);
        const authInfo = readCookieJWTPayload();
        FetchUser(authInfo.UserId).then(response => this.setState({user: response.data}))
    }


    render(): React.ReactNode {
        console.log(this.state);
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <MainNavBar user={this.state.user}/>
                    {this.props.children}
                    <Footer/>
                </MuiThemeProvider>
            </div>
        )
    }
}

interface PageProps {
    children: React.ReactNode
}

interface PageState {
    user?: UserModel.User
}


export default Page
