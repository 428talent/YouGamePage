import {Grid, Typography, withStyles} from "@material-ui/core";
import * as React from "react";
import BaseProps from "../../base/props";
import GameCard from "./game-card";
import {NewGameList} from "../../mock/mock";

interface SaleGameSectionProps extends BaseProps {

}

interface SaleGameSectionState {

}

class SaleGameSection extends React.Component<SaleGameSectionProps, SaleGameSectionState> {
    props: SaleGameSectionProps;

    constructor(props: Readonly<SaleGameSectionProps>) {
        super(props);
        this.props = props
    }

    render(): React.ReactNode {
        const {classes} = this.props;
        const gameCardCollection = NewGameList.map((game, key) => {
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
                    正在热卖
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

const styles = theme => ({
    container: {
        paddingLeft: 100,
        paddingRight: 100,
        marginTop: 60
    },
    root: {
        flexGrow: 1,
    },
    card: {
        maxWidth: 345,
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },

});
// @ts-ignore
export default withStyles(styles)(SaleGameSection)
