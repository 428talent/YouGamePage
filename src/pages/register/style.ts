import {createStyles} from "@material-ui/core";

export default theme => createStyles({
    container:{
        minHeight:1024,
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    },
    registerCard:{
        width:300,
        height:450,
        padding:24,
        display: "flex",
        alignContent:"center"
    }
});
