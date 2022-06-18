
import Account from "./Account"
import State from "./State"
import Network from "./Network"
import ConnectButton from "../buttons/ConnectButton"
import EtherBalance from "./EtherBalance"

import "./header.css"

const Header = (props) => {
    return (
        <div className='headerWrap'>
            <h1 className="">Simple Fullstack Dapp</h1>
            <ConnectButton connected={props.connected} connect={props.connect} />
            <Account account={props.account}/>
            <State connected={props.connected}/>
            <Network currentNetwork={props.currentNetwork}/>
            <EtherBalance balance={props.balance}/>
        </div>
    )
}

export default Header
