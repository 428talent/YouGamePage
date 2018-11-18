import * as React from "react";
import {Paper, Typography} from "@material-ui/core";

function ContentBar() {
    return (
        <div>
            <Paper  elevation={1}>
                <Typography variant="h5" component="h3">
                    This is a sheet of paper.
                </Typography>
                <Typography component="p">
                    Paper can be used to build surface or other elements for your application.
                </Typography>
            </Paper>
        </div>
    )
}

export default ContentBar
