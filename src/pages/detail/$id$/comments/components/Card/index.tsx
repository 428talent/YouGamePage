import * as React from 'react';
import {createStyles, withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import {Chip} from "@material-ui/core";
import BaseProps from "../../../../../../base/props";
import * as moment from 'moment';
import {ServerUrl} from "../../../../../../config/api";

const styles = createStyles((theme) => ({
    card: {},
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    goodName: {
        marginTop: 12,
    },
    ratingText:{
        margin:8,
        marginRight:16,
    },
}));

interface CommentCardProps extends BaseProps {
    content: string;
    avatar?: string;
    name: string;
    goodName: string;
    time: Date;
    rating:number;
}

class CommentCard extends React.Component<CommentCardProps, any> {
    renderUserAvatar = () => {
        const {avatar, name, classes} = this.props;
        if(avatar && avatar.length != 0) {
            return (
                <Avatar aria-label="Recipe" className={classes.avatar} src={`${ServerUrl}/${avatar}`}/>
            );
        } else {
            return (
                <Avatar aria-label="Recipe" className={classes.avatar}>
                    {name.charAt(0)}
                </Avatar>
            );

        }
    }

    render() {
        const {classes, content, time, goodName, name, rating} = this.props;

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={this.renderUserAvatar()}
                    title={name}
                    subheader={moment(time).format("YYYY-MM-DD")}
                    action={
                        <Typography variant={"h5"} className={classes.ratingText}>
                            {rating}
                        </Typography>
                    }
                />
                <CardContent>
                    <Typography component="p">
                        {content}
                    </Typography>
                    <Chip label={goodName} className={classes.goodName}/>
                </CardContent>
                {/*<CardActions className={classes.actions} disableActionSpacing>*/}
                    {/*<IconButton aria-label="Add to favorites">*/}
                        {/*<FavoriteIcon/>*/}
                    {/*</IconButton>*/}
                    {/*<IconButton aria-label="Share">*/}
                        {/*<ShareIcon/>*/}
                    {/*</IconButton>*/}
                {/*</CardActions>*/}
            </Card>
        );
    }
}

export default withStyles(styles)(CommentCard);
