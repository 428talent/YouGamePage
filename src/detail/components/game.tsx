import * as React from "react";
import {createStyles, Divider, Grid, Paper, Typography, withStyles} from "@material-ui/core";
import BaseProps from "../../base/props";
import ImageGallery from 'react-image-gallery';


class Game extends React.Component<GameProps, {}> {

    render() {
        const {classes} = this.props;
        const images = [
            {
                original: 'https://media.st.dl.bscstorage.net/steam/apps/779340/ss_dc4f976ceff589858591110621e9e7c2d1b27a6f.600x338.jpg?t=1540461393',
                size:"200px, 50vw",
                originalClass:"preview-img",
                thumbnail: 'https://media.st.dl.bscstorage.net/steam/apps/779340/ss_dc4f976ceff589858591110621e9e7c2d1b27a6f.116x65.jpg?t=1540461393',
            },
            {
                original: 'https://media.st.dl.bscstorage.net/steam/apps/779340/ss_886550807546b6cf97f826b29e91a99baedba2b4.600x338.jpg?t=1540461393',
                size:"200px, 50vw",
                originalClass:"preview-img",
                thumbnail: 'https://media.st.dl.bscstorage.net/steam/apps/779340/ss_886550807546b6cf97f826b29e91a99baedba2b4.116x65.jpg?t=1540461393'
            },
            {
                original: 'https://media.st.dl.bscstorage.net/steam/apps/779340/ss_7e4d7bfc11db6a6b35482263bde4b9caa69f06a6.600x338.jpg?t=1540461393',
                size:"200px, 50vw",
                originalClass:"preview-img",
                thumbnail: 'https://media.st.dl.bscstorage.net/steam/apps/779340/ss_7e4d7bfc11db6a6b35482263bde4b9caa69f06a6.116x65.jpg?t=1540461393'
            }
        ];
        return (
            <div>
                <Grid container spacing={24} className={classes.root}>
                    <Grid item xs={8}>
                        <Paper>
                            <ImageGallery items={images} />
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper>
                            <Typography variant="subtitle2">
                                Total War: THREE KINGDOMS
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

interface GameProps extends BaseProps {
    classes: {
        root: string,
        band: string
        gameInfo: string
        title: string
        preview:string
    }
}

const styles = theme => createStyles({
    root: {
        width:"100%",
        minHeight: 1024,
        paddingLeft: 300,
        paddingRight: 300,
        paddingTop: 100,

    },
    title:{
        height:200
    },
    band: {
        width: 300,
        float: "left"
    },
    gameInfo: {
        marginLeft: 310
    },
    preview:{
        height: 200
    }
});
export default withStyles(styles)(Game)
