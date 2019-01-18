import * as React from "react";
import {createStyles, Grid, Paper, withStyles, Typography, List, Divider} from "@material-ui/core";
import {connect} from "dva";
import withRouter from "umi/withRouter";
import BaseProps from "../../../base/props";
import TitleBar from "../components/Title";
import TransactionItem from "./components/TransactionItem";


class WalletPage extends React.Component<WalletProps, {}> {
    componentDidMount(): void {
        const {dispatch} = this.props;
        dispatch({
            type:"wallet/fetchWallet"
        })
    }

    renderListItems() {
        const {transactions} = this.props;
        return transactions.map(transaction => (
            <TransactionItem amount={transaction.amount} key={transaction.id} type={transaction.type} time={transaction.created}/>
        ))
    }

    render(): React.ReactNode {
        const {classes,balance} = this.props;
        return (
            <div>
                <TitleBar title={"钱包"} isActionMode={false} onSwitchActionMode={() => {
                }} actionChildren={<div></div>}/>
                <div className={classes.container}>
                    <div className={classes.transactionHeader}>
                        <Typography variant={"h4"}>
                            ¥ {balance.toFixed(2)}
                        </Typography>
                        <Typography variant={"subtitle1"} color={"textSecondary"}>
                            余额
                        </Typography>
                    </div>
                    <Divider/>
                    <div>
                        <List>
                            {this.renderListItems()}
                        </List>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = createStyles(theme => ({
    container: {
        marginTop: 24,
        padding: 16,
        backgroundColor: "#FFFFFF"
    },
    balance: {},
    transactionHeader: {
        padding: 16
    }
}));

interface WalletProps extends BaseProps {
    transactions: Array<any>
    balance:number
    dispatch:any
}


export default withRouter(connect(({wallet, app}) => ({...wallet, app}))(withStyles(styles)(WalletPage)))
