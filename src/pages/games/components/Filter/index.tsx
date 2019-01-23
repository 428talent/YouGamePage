import {
    Checkbox,
    createStyles,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary, FormControlLabel, FormGroup, Radio, RadioGroup,
    Typography,
    withStyles
} from "@material-ui/core";
import * as React from "react";
import BaseProps from "../../../../base/props";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {any, uniq} from "ramda";

class Filter extends React.Component<FilterProps, FilterState> {
    state = {
        inputFocus: false
    };

    renderTagFilter() {
        const {
            classes,
            filter = {
                price: "all",
                tags: [],
                releaseTime: "all"
            },
            tags = [],
            onFilterChange
        } = this.props;
        const handleSelect = (e, checked) => {
            if (checked) {
                onFilterChange({
                    ...filter,
                    tags: uniq([...filter.tags, Number(e.target.value)])
                })
            } else {
                onFilterChange({
                    ...filter,
                    tags: filter.tags.filter(tagId => tagId !== Number(e.target.value))
                })
            }

        };
        if (tags.length > 0) {
            return (
                <ExpansionPanel defaultExpanded={true}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>标签</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <FormGroup>
                            {tags.map(tag => (
                                <FormControlLabel
                                    key={tag.id}
                                    control={
                                        <Checkbox
                                            value={tag.id}
                                            onChange={handleSelect}
                                            checked={any(tagId => tagId === tag.id, filter.tags)}
                                        />
                                    }
                                    label={tag.name}
                                />
                            ))}


                        </FormGroup>

                    </ExpansionPanelDetails>
                </ExpansionPanel>
            )
        }

    }

    render(): React.ReactNode {
        const {
            classes,
            filter = {
                price: "all",
                tags: [],
                releaseTime: "all"
            },
            tags = [],
            onFilterChange
        } = this.props;
        return (
            <div className={classes.container}>
                <ExpansionPanel defaultExpanded={true}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>价格</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <RadioGroup
                                name="price"
                                value={filter.price}
                                onChange={(event, value) => onFilterChange({...filter, price: value})}

                            >
                                <FormControlLabel value="all" control={<Radio/>}
                                                  label="所有"/>
                                <FormControlLabel value="u12" control={<Radio/>}
                                                  label="¥12以内"/>
                                <FormControlLabel value="u24" control={<Radio/>}
                                                  label="¥24以内"/>
                                <FormControlLabel value="u40" control={<Radio/>}
                                                  label="¥40以内"/>
                                <FormControlLabel value="other" control={<Radio/>}
                                                  label="¥40以上"/>

                            </RadioGroup>
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                {this.renderTagFilter()}
                <ExpansionPanel defaultExpanded={true}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>发售日期</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <RadioGroup
                                name="releaseTime"
                                value={filter.releaseTime}
                                onChange={(event, value) => onFilterChange({...filter, releaseTime: value})}


                            >
                                <FormControlLabel value="all" control={<Radio/>} label="所有"/>
                                <FormControlLabel value="week" control={<Radio/>} label="一周内"/>
                                <FormControlLabel value="month" control={<Radio/>} label="一月内"/>
                                <FormControlLabel value="season" control={<Radio/>} label="一季内"/>
                                <FormControlLabel value="year" control={<Radio/>} label="一年内"/>

                            </RadioGroup>
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

            </div>
        )
    }
}

interface FilterProps extends BaseProps {
    onFilterChange: (filter) => void
    filter: {
        price: string
        tags: Array<any>
        releaseTime: string
    }
    tags: Array<{ name: string, id: number }>
}

interface FilterState {

}

const styles = createStyles(theme => ({
    container: {}

}));

export default withStyles(styles)(Filter)
