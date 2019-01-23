import {Button, createStyles, withStyles, IconButton, Input, Paper} from "@material-ui/core";
import * as React from "react";
import {ObjectFitProperty} from "csstype";
import BaseProps from "../../../../base/props";
import SearchIcon from "@material-ui/icons/Search"

class SearchInput extends React.Component<SearchInputProps, SearchInputState> {
    state = {
        inputFocus: false
    };

    render(): React.ReactNode {
        const {
            classes,
            onInput,
            value,
            onSearch,

        } = this.props;
        return (
            <Paper elevation={this.state.inputFocus ? 2 : 0} className={classes.container}
                   style={{borderColor: this.state.inputFocus ? "#333333" : "#e3e5e9"}}>
                <Input
                    fullWidth placeholder={"Search..."}
                    disableUnderline
                    onFocus={() => this.setState({inputFocus: true})}
                    onBlur={() => this.setState({inputFocus: false})}
                    onChange={(e) => onInput(e.target.value)}
                    value={value}
                />
                <div style={{width: 48, height: 48}}>

                    <IconButton onClick={(e) => onSearch()}>
                        <SearchIcon/>
                    </IconButton>
                </div>
            </Paper>
        )
    }
}

interface SearchInputProps extends BaseProps {
    onInput: (text) => void
    value: any
    onSearch: () => void
}

interface SearchInputState {
    inputFocus: boolean
}

const styles = createStyles(theme => ({
    container: {
        width: 550,
        height: 55,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        paddingLeft: 16,
        paddingRight: 16
    }

}));

export default withStyles(styles)(SearchInput)
