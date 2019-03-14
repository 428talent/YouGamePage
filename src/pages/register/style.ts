import {createStyles} from "@material-ui/core";

export default theme => createStyles({
    container:{
        minHeight:845,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        backgroundImage: `url("/public/login_bg.jpg")`,
        backgroundSize: "cover"
    },
    registerCard:{
        width:300,
        minHeight:450,
        padding:24,
        display: "flex",
        alignContent:"center"
    }
});
