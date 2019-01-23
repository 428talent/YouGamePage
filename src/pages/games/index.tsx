import * as React from "react";
import {Component, ReactNode} from "react";
import {connect} from "dva";
import {
    Chip,
    createStyles,
    Divider,
    FormControl,
    Grid,
    MenuItem,
    Select,
    Typography,
    withStyles
} from "@material-ui/core";
import BaseProps from "../../base/props";
import SearchInput from "./components/SearchInput";
import Filter from "./components/Filter";
import GameCard from "./components/GameCard";
import Pagination from "./components/Pagination";
import router from "umi/router";
import {buildUrlQueryParams} from "../../utils/url";

interface GamesProps extends BaseProps {
    dispatch: any
    data: Array<any>
    filter: any
    tags: any,
    page,
    count,
    pageSize,
    match,
    location,
    search
}

class Games extends Component<GamesProps, {}> {


    renderGameCard() {
        const {data} = this.props;
        return data.map(game => (
            <Grid item xs={4} key={game.id}>
                <GameCard gameId={game.id} gameName={game.name} gamePicUrl={game.cover} gamePrice={game.price}/>
            </Grid>
        ))
    }


    onOrderChange(order) {
        const {filter, dispatch, location} = this.props;
        const queryParams = location.query;
        queryParams.order = order;
        router.push(buildUrlQueryParams("/games", queryParams))

    }

    onFilterChange(filter) {
        const {location} = this.props;
        const {price, releaseTime} = filter;
        const queryParams = {
            ...location.query,
            ...{price, releaseTime}
        };
        router.push(buildUrlQueryParams("/games", queryParams));
    }

    onSearch(value) {
        const {location} = this.props;
        const queryParams = {
            ...location.query,
            search: value
        };
        router.push(buildUrlQueryParams("/games", queryParams));
    }

    onChangePage(page) {
        const {location} = this.props;
        const queryParams = {
            ...location.query,
            page
        };
        router.push(buildUrlQueryParams("/games", queryParams));
    }

    deleteFilterItem(name) {
        const {query} = this.props.location;
        delete query[name];
        router.push(buildUrlQueryParams("/games", query));
    }

    renderFilterChip() {
        const chips = [];
        const {price,releaseTime,search} = this.props.location.query;
        const {classes} = this.props;
        if (price && price != "all") {
            let chipLabel = "";
            if (price === "u12") {
                chipLabel = "¥12以内"
            } else if (price === "u24") {
                chipLabel = "¥24以内"
            } else if (price === "u40") {
                chipLabel = "¥40以内"
            } else if (price === "other") {
                chipLabel = "¥40以上"
            }
            chips.push(<Chip
                label={chipLabel}
                onDelete={() => this.deleteFilterItem("price")}
                color="primary"
                className={classes.chip}
                key={price}
            />)
        }
        if (releaseTime && releaseTime !== "all"){
            let chipLabel = "";
            if (releaseTime === "year"){
                chipLabel = "一年内"
            }else if (releaseTime === "month"){
                chipLabel = "一月内"
            }else if (releaseTime === "season"){
                chipLabel = "近三月"
            }else if (releaseTime === "week"){
                chipLabel = "一周内"
            }
            chips.push(<Chip
                label={chipLabel}
                onDelete={() => this.deleteFilterItem("releaseTime")}
                color="primary"
                className={classes.chip}
                key={releaseTime}
            />)

        }
        if (search && search.length > 0){
            chips.push(<Chip
                label={search}
                onDelete={() => this.deleteFilterItem("search")}
                color="primary"
                className={classes.chip}
                key={search}
            />)
        }
        return chips
    }


    render(): ReactNode {
        const {classes, filter, tags, dispatch, pageSize, page, count, location, search} = this.props;
        const {
            order = "-id",
            price = "all",
            releaseTime = "all"
        } = location.query;
        return (
            <div className={classes.container}>

                <Grid container className={classes.main} spacing={24}>
                    <Grid item xs={12} className={classes.searchContainer}>
                        <SearchInput
                            onInput={(key) => dispatch({
                                type: "gamesPage/setState",
                                payload: {
                                    search: key
                                }
                            })}
                            value={search}
                            onSearch={() => this.onSearch(search)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant={"subtitle1"}>
                            过滤器
                        </Typography>
                        <Divider/>
                    </Grid>
                    <Grid item xs={9}>
                        <div style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between"}}>
                            <Typography variant={"subtitle1"}>
                                结果

                            </Typography>
                            <FormControl className={classes.formControl}>

                                <Select
                                    disableUnderline={true}
                                    inputProps={{
                                        name: 'age',
                                        id: 'age-simple',
                                    }}
                                    value={order}
                                    onChange={(e) => this.onOrderChange(e.target.value)}
                                >
                                    <MenuItem value={"-id"}>默认顺序</MenuItem>
                                    <MenuItem value={"-release_time"}>发售日期</MenuItem>
                                    <MenuItem value={"price"}>价格低至高</MenuItem>
                                    <MenuItem value={"-price"}>价格高至低</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <Divider/>
                    </Grid>


                    <Grid item xs={3}>
                        <div className={classes.chipContainer}>
                            {this.renderFilterChip()}
                        </div>
                        <Filter
                            filter={{price, releaseTime, tags: []}}
                            onFilterChange={(filter) => {
                                this.onFilterChange(filter)
                            }}
                            tags={tags}
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <Grid container spacing={24}>
                            {this.renderGameCard()}
                        </Grid>

                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                        <div className={classes.pageContainer}>
                            <Pagination
                                page={page}
                                pageSize={pageSize}
                                count={count}
                                onNextPage={() => this.onChangePage(page + 1)}
                                onPreviousPage={() => this.onChangePage(page - 1)}
                                onSelectPage={(page) => this.onChangePage(page)}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const styles = createStyles(theme => ({
    container: {
        marginTop: 90,
        marginLeft: 375,
        marginRight: 375,
        minHeight: 820
    },
    main: {
        marginTop: 60
    },
    searchContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    pageContainer: {
        display: "flex",
        justifyContent: "center",
        marginTop: 24
    },
    chipContainer: {
        marginBottom: 12
    },
    chip: {
        marginLeft: 8
    }
}));
export default connect(({gamesPage}) => ({...gamesPage}))(withStyles(styles)(Games))
