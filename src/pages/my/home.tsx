import {createStyles, withStyles, Typography, Divider, Grid, Button} from "@material-ui/core";
import BaseProps from "../../base/props";
import * as React from "react";
import {blue} from '@material-ui/core/colors'

const HomePage = (props: BaseProps) => {
    const {classes} = props;
    return (
        <div>
            <header className={classes.header}>
                <Typography variant={"h5"}>
                    Home
                </Typography>
            </header>
            <Divider/>
            <section className={classes.section}>
                <header
                    className={classes.sectionHeader}>
                    <Typography variant="h6" style={{display: "inline-flex"}}>
                        愿望单
                    </Typography>
                    <Button style={{display: "inline-flex"}}>
                        查看更多
                    </Button>
                </header>

                <Grid container spacing={24}>
                    <Grid item xs={3}>
                        <img className={classes.wishlistImg}
                             src="https://steamcdn-a.akamaihd.net/steam/apps/275850/header.jpg?t=1542978561"/>
                    </Grid>
                    <Grid item xs={3}>
                        <img className={classes.wishlistImg}
                             src="https://steamcdn-a.akamaihd.net/steam/apps/275850/header.jpg?t=1542978561"/>
                    </Grid>
                    <Grid item xs={3}>
                        <img className={classes.wishlistImg}
                             src="https://steamcdn-a.akamaihd.net/steam/apps/275850/header.jpg?t=1542978561"/>
                    </Grid>
                    <Grid item xs={3}>
                        <img className={classes.wishlistImg}
                             src="https://steamcdn-a.akamaihd.net/steam/apps/275850/header.jpg?t=1542978561"/>
                    </Grid>
                </Grid>
            </section>
        </div>
    )
};

interface HomePageProps extends BaseProps {

}

const styles = theme => createStyles({
    header: {
        padding: 16
    },
    section: {
        padding: 16
    },
    wishlistImg: {
        width: '100%'
    },
    moreLink: {
        textAlign: "right",
    },
    sectionHeader: {
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        marginBottom: 8
    }
});

// @ts-ignore
export default withStyles(styles)(HomePage);
