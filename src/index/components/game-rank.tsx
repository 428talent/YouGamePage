import BaseProps from "../../base/props";
import * as React from "react";
import {AppBar, Grid, List, ListItem, Paper, Tab, Tabs, Typography, withStyles} from "@material-ui/core";
import SwipeableViews from 'react-swipeable-views';
import {NewGameList} from "../../mock/mock";
import GameItem from "./game-item";

function TabContainer({children, dir}) {
    return (
        <div dir={dir} style={{paddingTop: 8}}>
            {children}
        </div>
    );
}

class GameList extends React.Component<GameListProps, {}> {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    handleChangeIndex = index => {
        this.setState({value: index});
    };


    constructor(props: Readonly<GameListProps>) {
        super(props);
    }

    render(): React.ReactNode {
        const {classes, theme} = this.props;
        const dailyRank = NewGameList.map((game, key) => {
            return (

                <ListItem  key={key}>
                    <GameItem gameCover={game.cover} gamePrice={game.price} gameName={game.name}/>
                </ListItem>

            )
        });
        return (
            <div className={classes.root}>
                <Typography variant="h4" gutterBottom>
                    排行
                </Typography>
                <div className={classes.tab}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="月排行"/>
                        <Tab label="周排行"/>
                        <Tab label="日排行"/>
                    </Tabs>
                </div>
                <SwipeableViews
                    className={classes.swipeContainer}
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer dir={theme.direction}>
                        <List>
                            {dailyRank}
                        </List>
                    </TabContainer>
                    <TabContainer dir={theme.direction}>Item Two</TabContainer>
                    <TabContainer dir={theme.direction}>Item Three</TabContainer>
                </SwipeableViews>
            </div>
        )
    }
}

const styles = theme => ({
        root: {
            marginTop: 60,
            marginLeft: 100,
            marginRight: 100
        },
        tab: {
            backgroundColor: theme.palette.background.paper,
        },
        swipeContainer: {
            backgroundColor: "#FFFFFF"
        }

    }
);

interface GameListProps extends BaseProps {
    theme: any
}

export default withStyles(styles, {withTheme: true})(GameList)
