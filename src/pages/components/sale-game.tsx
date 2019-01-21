import {createStyles, Grid, Typography, withStyles} from "@material-ui/core";
import * as React from "react";
import BaseProps from "../../base/props";
import GameCard from "./game-card";
import {NewGameList} from "../../mock/mock";

interface SaleGameSectionProps extends BaseProps {
    games: Array<{
        cover: string
        price: number
        name: string
    }>
    title: string
}

class SaleGameSection extends React.Component<SaleGameSectionProps, {}> {
    render(): React.ReactNode {
        const {classes, games, title} = this.props;
        const gameCardCollection = games.map((game, key) => {
            return (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={key} className={classes.root}>
                    <GameCard
                        gamePicUrl={game.cover}
                        gamePrice={game.price}
                        gameName={game.name}
                    />
                </Grid>
            )
        });
        return (
            <div className={classes.container}>
                <Typography variant="h4" gutterBottom>
                    {title}
                </Typography>
                <div className={classes.root}>
                    <Grid container spacing={24}>
                        {gameCardCollection}
                    </Grid>
                </div>
            </div>
        )
    }
}

const styles = createStyles(theme => ({
    container: {
        paddingLeft: 100,
        paddingRight: 100,
        marginTop: 60,
        [theme.breakpoints.only('xs')]: {
            paddingLeft: 16,
            paddingRight: 16,
        },
    },
    root: {
        flexGrow: 1,
    },
    card: {},
    media: {
        objectFit: 'cover',
    },

}));
export default withStyles(styles)(SaleGameSection)
