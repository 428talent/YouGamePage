import * as React from "react";
import {withSnackbar} from "notistack";
import {connect} from "dva";

const SnackBarOverlay = ({dispatch,messages,enqueueSnackbar,children}) =>{
    if (messages.length > 0){
        const message = messages[0];
        enqueueSnackbar(message.message);
        dispatch({
            type:"error/messageShow",
            id:message.id
        })
    }
    return (<div>
        {children}
    </div>)
};

export default withSnackbar(connect(({error}) => ({...error}))(SnackBarOverlay))