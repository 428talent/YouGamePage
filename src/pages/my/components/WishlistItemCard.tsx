import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import * as React from "react";
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'
import {Checkbox, Collapse, Fade, IconButton} from "@material-ui/core";
import BaseProps from "../../../base/props";

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },

};

class WishlistItemCard extends React.Component<WishlistItemCardProp, WishlistItemCardState> {
    state: Readonly<WishlistItemCardState> = {
        isActionMode: false,
        isSelected: false,
    };


    constructor(props: Readonly<WishlistItemCardProp>) {
        super(props);
    }

    renderActionMode() {
        const {onRemoveClick, id} = this.props;
        return (
            <Collapse in={this.state.isActionMode} collapsedHeight="0px">
                <div style={{
                    position: "absolute",
                    width: "100%",
                    bottom: 0,
                    height: 44,
                    backgroundColor: "rgba(0, 0, 0, 1)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end"
                }}>
                    <div style={{display: "inline-flex", color: "#FFFFFF", marginLeft: 8}}>
                        <IconButton onClick={() => onRemoveClick(id)}>
                            <DeleteIcon style={{color: "#FFFFFF"}} fontSize={"small"}/>
                        </IconButton>
                    </div>
                    <IconButton style={{display: "inline-flex"}} onClick={() => this.setState({isActionMode: false})}>
                        <CloseIcon style={{color: "#FFFFFF"}} fontSize={"small"}/>
                    </IconButton>
                </div>
            </Collapse>
        )
    }

    renderNonActionMode() {
        const {onItemSelectChange, id, isSelectMode, selected} = this.props;
        return (
            <div style={{
                position: "absolute",
                width: "100%",
                bottom: 0,
                height: 44,
                backgroundColor: isSelectMode && selected ? "#333333" : "rgba(0, 0, 0, .5)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end"
            }}>

                <Typography style={{display: "inline-flex", color: "#FFFFFF", marginLeft: 8}} gutterBottom
                            variant="subtitle1" component="h2">

                    {this.props.gameName ? this.props.gameName : "Unknown"}
                </Typography>
                <Checkbox
                    checked={selected}
                    style={{
                        width: 8,
                        height: 8,
                        color: "#FFFFFF",
                        display: this.props.isSelectMode ? undefined : "none"
                    }}
                    onChange={(_, checked) => {
                        onItemSelectChange(checked, id)
                    }}
                />
                <IconButton style={{display: this.props.isSelectMode ? "none" : "inline-flex"}}
                            onClick={() => this.setState({isActionMode: true})}>
                    <MoreVertIcon style={{color: "#FFFFFF"}} fontSize={"small"}/>
                </IconButton>
            </div>

        )
    }

    render(): React.ReactNode {
        const {classes} = this.props;
        const {isActionMode} = this.state;
        return (
            <Card className={classes.card}>

                <div style={{position: "relative"}}>
                    {isActionMode ? this.renderActionMode() : this.renderNonActionMode()}
                    <CardMedia
                        className={classes.media}
                        image={this.props.gameCover ? this.props.gameCover : "https://media.st.dl.bscstorage.net/steam/apps/517630/header.jpg?t=1543511282"}
                        title="Contemplative Reptile"
                    />
                    <div style={{position: "absolute", width: "100%"}}>

                    </div>

                </div>
            </Card>
        );
    }


}

interface WishlistItemCardProp extends BaseProps {
    gameName: string,
    gameCover: string,
    isSelectMode: boolean
    id: number

    onItemSelectChange(isSelect: boolean, id: number): void,

    selected: boolean

    onRemoveClick(id: number): void
}

interface WishlistItemCardState {
    isActionMode: boolean,
    isSelected: boolean
}

export default withStyles(styles)(WishlistItemCard);
