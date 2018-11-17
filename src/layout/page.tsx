import * as React from "react";
import MainNavBar from "./navbar";
import Footer from "./footer";
import theme from "../config/theme";
import {MuiThemeProvider} from "@material-ui/core";
import {readCookieJWT} from "../utils/auth";

class Page extends React.Component<PageProps, {}> {

    constructor(props: Readonly<PageProps>) {
        super(props);
        readCookieJWT()
    }

    render(): React.ReactNode {
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <MainNavBar/>
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

export default Page
