import * as React from "react";
import {
    Chip,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    FormControlLabel,
    ListItem,
    Paper,
    Radio,
    RadioGroup,
    Typography,
    withStyles
} from "@material-ui/core";
import BaseProps from "../../../../base/props";
import ExpandMoreIcon from "@material-ui/core/SvgIcon/SvgIcon";

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

interface OrderFilterProps extends BaseProps {
    filter: {
        orderState: string
    }
    onFilterChange: (filter) => void
}

const OrderFilter = (props: OrderFilterProps) => {
    const {
        classes,
        filter = {
            orderState: "all"
        },
        onFilterChange
    } = props;
    const {
        orderState
    } = filter;
    const handleOrderStateClick = (orderState) => {
        onFilterChange({...filter, orderState})
    };
    return (
        <div>
            <Paper>
                <div className={classes.root}>
                    <Typography variant={"h6"}>
                        订单状态
                    </Typography>
                    <div className={classes.filterContainer}>
                        <Chip
                            className={classes.stateChip}
                            color={orderState === 'all' ? "primary" : undefined}
                            label="所有"
                            clickable={orderState !== 'all'}
                            onClick={(e) => handleOrderStateClick("all")}
                        />
                        <Chip
                            className={classes.stateChip}
                            color={orderState === 'created' ? "primary" : undefined}
                            label="未付款"
                            clickable={orderState !== 'Created'}
                            onClick={(e) => handleOrderStateClick("created")}
                        />
                        <Chip
                            className={classes.stateChip}
                            color={orderState === 'done' ? "primary" : undefined}
                            label="已付款"
                            clickable={orderState !== 'Done'}
                            onClick={(e) => handleOrderStateClick("done")}
                        />
                    </div>
                </div>
            </Paper>
        </div>
    );
};
const styles = theme => ({
    root: {
        width: 280,
        backgroundColor: theme.palette.background.paper,
        padding: 24
    },
    filterContainer: {
        marginTop: 8
    },
    stateChip: {
        marginRight: 8
    }
});

export default withStyles(styles)(OrderFilter);
