

const State = (props) => {
    if(props.connected){
        return (
            <div>
                <div className='dot connected-dot'></div>
                <div>CONNECTED</div>
            </div>
        )
    }else{
        return(
            <div>
                <div className='dot disconnect-dot'></div>
                <div>DISCONNECTED</div>
            </div>
        )
    }
    
}

export default State
