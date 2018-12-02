import {Button, Paper, Typography, withStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import BaseProps from "../../../base/props";
import * as React from "react";
import {blue} from "@material-ui/core/colors"
import {ReactNode} from "react";

const Paging = (props: PagingProps) => {
    const {classes} = props;
    const createButton = () => {
        const {pageIndex, totalCount, onChangePage, pageRange} = props;
        return (
            <div>
                <Button
                    variant="contained"
                    disabled={pageIndex == 1}
                    className={classes.pageButton}
                    color="primary"
                    onClick={() => onChangePage(pageIndex - 1)}
                >
                    Previous
                </Button>
                {(function () {
                    const buttonGroups: Array<ReactNode> = [];

                    const start = Math.floor(pageIndex / pageRange);
                    console.log(start);
                    for (let idx = (pageRange * start); idx <= (pageRange * (start + 1)) - 1; idx++) {
                        if (idx === 0 || idx > totalCount) {
                            continue;
                        }
                        buttonGroups.push(
                            <Button
                                variant="contained"
                                disabled={pageIndex === idx}
                                className={classes.pageButton}
                                color="primary" key={idx}
                                onClick={() => onChangePage(idx)}
                            >
                                {idx}
                            </Button>
                        )
                    }
                    return buttonGroups
                })}
                {/*<Button*/}
                    {/*variant="contained"*/}
                    {/*className={classes.pageButton}*/}
                    {/*color="primary"*/}
                    {/*style={{display: pageIndex === totalCount ? "none" : undefined}}*/}
                    {/*onClick={() => {*/}
                        {/*const page = (Math.trunc(pageIndex / pageRange) + 1) * pageRange;*/}
                        {/*onChangePage(page)*/}
                    {/*}}*/}
                {/*>*/}
                    {/*...*/}
                {/*</Button>*/}
                {/*<Button*/}
                    {/*variant="contained"*/}
                    {/*className={classes.pageButton}*/}
                    {/*color="primary"*/}
                    {/*style={{display: pageIndex === totalCount ? "none" : undefined}}*/}
                    {/*onClick={() => onChangePage(totalCount)}*/}
                {/*>*/}
                    {/*{totalCount}*/}
                {/*</Button>*/}
                <Button
                    variant="contained"
                    disabled={pageIndex * pageRange > totalCount}
                    className={classes.pageButton}
                    color="primary"
                    onClick={() => onChangePage(pageIndex + 1)}
                >
                    Next
                </Button>
            </div>
        )
    };
    return (
        <div>

            {createButton()}
        </div>
    )
};
const styles = createStyles(theme => ({
    pageButton: {
        marginRight: 8
    }
}));

interface PagingProps extends BaseProps {
    totalCount: number
    pageIndex: number
    pageRange: number

    onChangePage(page: number)
}

export default withStyles(styles)(Paging)
