import {Button, withStyles} from "@material-ui/core";
import * as React from "react";
import BaseProps from "../../../../../../base/props";
import {pagination} from "../../../../../../utils/pagination";

interface PaginationProps extends BaseProps {
    count: number,
    page: number,
    pageSize,
    onNextPage: () => void
    onPreviousPage: () => void
    onSelectPage: (page) => void
}

const Index = (props: PaginationProps) => {
    const createPaginationButtons = () => {
        const {count, page, pageSize, classes, onNextPage, onPreviousPage, onSelectPage} = props;
        let totalPage = Math.ceil(count / pageSize);
        return [
            <Button
                color="primary"
                variant={"contained"}
                disabled={page === 1}
                className={classes.paginationButton}
                onClick={(e) => onPreviousPage()}
            >
                Prev
            </Button>,
            ...pagination(page, totalPage).map((button: any) => (
                <Button
                    color="primary"
                    variant={"contained"}
                    className={classes.paginationButton}
                    disabled={Number(button.value) === page}
                    onClick={e => onSelectPage(Number(button.value))}
                >{button.text}</Button>
            )),
            <Button
                color="primary"
                variant={"contained"}
                className={classes.paginationButton}
                disabled={page === totalPage}
                onClick={(e) => onNextPage()}
            >
                Next
            </Button>,
        ]
    };
    return (
        <div>
            {createPaginationButtons()}
        </div>
    );
};
const styles = theme => ({
    paginationButton: {
        marginRight: 8
    }
});
export default withStyles(styles)(Index);
