import * as React from "react";
import '../../../assets/css/index.css'

import Game from "./components/game";
import "./game.css"
import {connect} from "dva";

class DetailPage extends React.Component<{},{}>{
    render(): React.ReactNode {
        return (
            <div>
                <Game {...this.props}/>
            </div>
        )
    }
}

export default connect(({detail}) => ({...detail}))(DetailPage)
