import * as React from "react";
import {
    Checkbox,
    Chip,
    createStyles,
    Divider,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    FormControlLabel,
    FormGroup,
    Paper,
    Typography,
    withStyles
} from "@material-ui/core";
import BaseProps from "../../../../../../base/props";
import Chart from "react-google-charts";
import {CommentSummary} from "../../../../../../services/model/comment";
import {any, sum, uniq} from "ramda";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface CommentFilterProps extends BaseProps {
    summary?: CommentSummary,
    filter: {
        rating: any,
        goods: Array<number>
    }
    onFilterChange: (filter) => void
    goodFilter: Array<{
        id: number,
        name: string
    }>
}

const CommentFilter = (props: CommentFilterProps) => {
    const {summary} = props;
    const getAverageRating = () => {
        if (summary) {
            const totalCommentCount = sum(summary.rating_count.map(data => (data.count)));
            if (totalCommentCount == 0) {
                return "无数据"
            }
            const avgRating = sum(summary.rating_count.map(data => (data.count * data.rating))) / totalCommentCount;
            return avgRating.toFixed(1).toString()
        }
        return "无数据";
    };
    const renderRatingChar = () => {
        const {summary} = props;
        const itemColor = {
            1: "#4285f4",
            2: "#DB4437",
            3: "#CF9900",
            4: "#34A853",
            5: "#E91E63",
        };
        let ratingRate = [];
        if (summary) {
            const totalCommentCount = sum(summary.rating_count.map(data => (data.count)))
            ratingRate = summary.rating_count.map(data => (
                [data.rating.toString(), Math.floor(data.count / totalCommentCount * 100), itemColor[data.rating], null]
            ));
        }
        return (
            <Chart
                width={'280px'}
                height={'200px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={[
                    [
                        'Element',
                        'Density',
                        {role: 'style'},
                        {
                            sourceColumn: 0,
                            role: 'annotation',
                            type: 'string',
                            calc: 'stringify',
                        },
                    ],
                    ...ratingRate
                ]}
                options={{
                    width: 300,
                    height: 150,
                    bar: {groupWidth: '95%'},
                    legend: {position: 'none'},
                }}
                // For tests
                rootProps={{'data-testid': '6'}}
            />
        )
    };
    const {classes, filter} = props;


    const onRatingChangeFilter = (checked, value) => {
        const {onFilterChange, filter} = props;
        if (checked) {
            onFilterChange({
                ...filter,
                rating: uniq([
                    ...filter.rating,
                    value
                ])
            })
        } else {
            onFilterChange({
                ...filter,
                rating: filter.rating.filter(point => Number(point) !== value)
            })
        }
    };
    const renderRankingFilter = () => {

        const {filter} = props;
        return [1, 2, 3, 4, 5].map(point => (
            <FormControlLabel
                control={
                    <Checkbox
                        value={point}
                        onChange={(e) => onRatingChangeFilter(e.target.checked, point)}
                        checked={any(checkedRating => Number(checkedRating) === point, filter.rating)}
                    />
                }
                key={point}
                label={`${point}分`}
            />
        ))
    };

    const onGoodsChangeFilter = (checked, goodId) => {
        const {onFilterChange, filter} = props;
        if (checked) {
            onFilterChange({
                ...filter,
                goods: uniq([
                    ...filter.goods,
                    goodId
                ])
            })
        } else {
            onFilterChange({
                ...filter,
                goods: filter.goods.filter(selectedGood => selectedGood !== goodId)
            })
        }
    };
    const renderGoodFilter = () => {
        const {goodFilter} = props;
        return goodFilter.map(good => (
            <FormControlLabel
                control={
                    <Checkbox
                        value={good.id}
                        onChange={(e) => onGoodsChangeFilter(e.target.checked, good.id)}
                        checked={any(checkedGoodId => checkedGoodId === good.id, filter.goods)}
                    />
                }
                key={good.id}
                label={good.name}
            />
        ))
    };

    const renderFilterChips = () => {
        const {rating, goods} = props.filter;
        const chips = [];
        chips.push(...rating.map(point => (
            <Chip
                label={`${point}分`}
                onDelete={() => onRatingChangeFilter(false, Number(point))}
                className={classes.filterChip}
                color="secondary"
            />
        )));

        chips.push(goods.map(goodId => {
            const good = props.goodFilter.find(good => good.id === goodId)
            if (goodId) {
                return (
                    <Chip
                        label={good.name}
                        onDelete={() => onGoodsChangeFilter(false, good.id)}
                        className={classes.filterChip}
                        color="secondary"
                    />
                )
            }
        }));
        return chips
    };


    return (
        <div>
            <Paper className={classes.container}>
                <div className={classes.ratingHeader}>
                    <div className={classes.summaryText}>
                        <Typography variant={"h5"}>
                            {getAverageRating()}
                        </Typography>
                        <Typography variant={"h5"}>
                            好评如潮
                        </Typography>
                    </div>
                </div>
                <Divider/>
                {renderRatingChar()}
            </Paper>
            <div className={classes.filterContainer}>
                <Typography variant={"h6"} style={{color: "#FFFFFF"}}>
                    过滤器
                </Typography>
                <div className={classes.filterChipGroup}>
                    {renderFilterChips()}
                </div>
                <ExpansionPanel defaultExpanded={true}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>按评分</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <FormGroup>
                            {renderRankingFilter()}
                        </FormGroup>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={true}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>按产品</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <FormGroup>
                            {renderGoodFilter()}
                        </FormGroup>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        </div>
    );
};
const styles = createStyles(theme => ({
    container: {},
    ratingHeader: {
        height: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    summaryText: {
        textAlign: "center"
    },
    filterContainer: {
        marginTop: 24
    },
    filterChipGroup: {
        marginTop: 8,
        marginBottom: 12
    },
    filterChip: {
        marginLeft: 8,
        marginTop: 8
    }

}));
export default withStyles(styles)(CommentFilter);
