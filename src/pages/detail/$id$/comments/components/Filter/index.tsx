import * as React from "react";
import {createStyles, Paper, withStyles, Typography, Divider} from "@material-ui/core";
import BaseProps from "../../../../../../base/props";
import Chart from "react-google-charts";
import {CommentSummary} from "../../../../../../services/model/comment";
import {sum} from "ramda";
import data from "../../../../../../models/data";

interface CommentFilterProps extends BaseProps {
    summary?: CommentSummary
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
            console.log(ratingRate)
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
    const {classes} = props;
    return (
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
    );
};
const styles = createStyles(theme => ({
    container: {
        minHeight: 480
    },
    ratingHeader: {
        height: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    summaryText: {
        textAlign: "center"
    }

}));
export default withStyles(styles)(CommentFilter);
