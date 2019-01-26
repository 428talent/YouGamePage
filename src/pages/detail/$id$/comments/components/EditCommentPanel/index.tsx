import * as React from "react";
import BaseProps from "../../../../../../base/props";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {
    Button,
    Chip,
    createStyles, Divider,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary, MenuItem, Paper, TextField,
    Typography,
    withStyles
} from "@material-ui/core";
import {useState} from "react";


interface EditCommentPanelProps extends BaseProps {
    goods: Array<{
        id: number
        name: string
    }>
    comments: Array<{
        goodId: number,
        content: string,
        rating: number
    }>,

    onUpdateComment(goodId, content, rating, callback)

    onCreateComment(goodId, content, rating, callback)
}

const EditCommentPanel = (props: EditCommentPanelProps) => {
    const {classes, goods} = props;
    const [activeGoodChip, setActiveGoodChip] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [inputComment, setInputComment] = useState({});
    if (activeGoodChip == 0 && goods.length > 0) {
        setActiveGoodChip(goods[0].id)
    }
    const renderChipTab = () => {
        return goods.map(good => (
            <Chip
                label={good.name}
                key={good.id}
                color={good.id === activeGoodChip ? "secondary" : undefined}
                className={classes.chip}
                onClick={() => {
                    setActiveGoodChip(good.id);
                    setEditMode(false)
                }}
            />
        ))
    };

    const renderCommentContent = () => {
        const {comments, classes} = props;
        const comment = comments.find(comment => comment.goodId === activeGoodChip)
        if (comment) {
            return (
                <div className={classes.content}>
                    <Typography variant={"body1"} className={classes.text}>
                        {comment.content}
                    </Typography>
                    <div>
                        <Paper className={classes.ratingContainer} elevation={0}>

                            <Typography variant={"h5"}>
                                {comment.rating}
                            </Typography>
                        </Paper>
                        <Button
                            className={classes.editButton}
                            onClick={() => setEditMode(true)}
                        >
                            编辑
                        </Button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={classes.content}>
                    <Button onClick={() => setEditMode(true)}>发表一下评论</Button>
                </div>
            )
        }

    };

    const onCommentUpdate = (goodId, {content, rating}) => {
        const updateInput = {...inputComment};
        if (content !== undefined) {
            updateInput[goodId] = {
                ...updateInput[goodId],
                inputContent: content
            }
        }
        if (rating) {
            updateInput[goodId] = {
                ...updateInput[goodId],
                inputRating: rating
            }
        }
        console.log(updateInput);
        setInputComment(updateInput)

    };

    const onComplete = (goodId) => {
        const {comments, onUpdateComment, onCreateComment} = props;
        const input = inputComment[activeGoodChip];
        if (!input) {
            return
        }
        const comment = comments.find(comment => comment.goodId === activeGoodChip);
        if (!comment) {
            const {
                inputContent,
                inputRating
            } = input;
            if (inputRating && inputContent && inputContent.length > 0) {
                onCreateComment(activeGoodChip, inputContent, inputRating, setEditMode)
            }
        } else {
            // update
            const {
                inputContent = comment.content,
                inputRating = comment.rating
            } = input;
            onUpdateComment(activeGoodChip, inputContent, inputRating, setEditMode)
        }

    };
    const renderEditMode = () => {
        const {comments, classes} = props;
        const comment = comments.find(comment => comment.goodId === activeGoodChip);
        let inputContent = "";
        let inputRating = 0;
        if (comment) {
            inputContent = comment.content;
            inputRating = comment.rating
        }
        // get value
        const input = inputComment[activeGoodChip];
        if (input !== undefined) {
            if (input.inputContent !== undefined) {
                inputContent = input.inputContent
            }
            if (input.inputRating) {
                inputRating = input.inputRating
            }
        }


        return (
            <div>
                <TextField
                    id="standard-name"
                    margin="normal"
                    fullWidth={true}
                    multiline={true}
                    variant={"outlined"}
                    label={"评论本体"}
                    value={inputContent}
                    onChange={(e) => onCommentUpdate(activeGoodChip, {content: e.target.value, rating: undefined})}
                />
                <TextField
                    id="outlined-select-currency"
                    select
                    label="评分"
                    className={classes.ratingSelect}
                    variant="outlined"
                    value={inputRating}
                    onChange={(e) => onCommentUpdate(activeGoodChip, {rating: e.target.value, content: undefined})}
                >
                    {[1, 2, 3, 4, 5].map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <div className={classes.actionGroup}>
                    <Button
                        variant={"contained"}
                        color={"primary"}
                        className={classes.actionButton}
                        onClick={() => onComplete(activeGoodChip)}
                    >
                        完成
                    </Button>
                    <Button
                        className={classes.actionButton}
                    >
                        取消
                    </Button>
                </div>
            </div>

        )
    };
    const renderViewMode = () => {

        return renderCommentContent()
    };
    return (
        <div>
            <div className={classes.container}>
                <ExpansionPanel defaultExpanded={true}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>我的评论</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className={classes.main}>
                            <div className={classes.chipContainer}>
                                {renderChipTab()}
                            </div>
                            {editMode ? renderEditMode() : renderViewMode()}
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        </div>
    );
};
const styles = createStyles(theme => ({
    container: {},
    main: {
        width: "100%"
    },
    content: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between"
    },
    chipContainer: {
        marginBottom: 12
    },
    chip: {
        marginRight: 12
    },
    ratingContainer: {
        width: 48,
        height: 48,
        padding: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#222222",
        borderWidth: 1,
        borderStyle: "solid"

    },
    text: {
        maxWidth: 800
    },
    editButton: {
        marginTop: 8
    },
    ratingSelect: {
        minWidth: 200,
        marginTop: 16
    },
    actionGroup: {
        marginTop: 16
    },
    actionButton: {
        marginRight: 12
    }
}));
export default withStyles(styles)(EditCommentPanel);
