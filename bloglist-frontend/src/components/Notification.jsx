const Notification = (props) => {
    let notificationStyle;
    if(props.type === 'success'){
      notificationStyle = {
        margin : 15,
        borderWeight : 2,
        borderStyle : 'solid',
        borderRadius : 8,
        borderColor : 'green',
        backgroundColor: '#85FF8D',
        color : 'green',
        padding: '10px 15px'
      }
    }
    else{
      notificationStyle = {
        margin : 15,
        borderWeight : 2,
        borderStyle : 'solid',
        borderRadius : 8,
        backgroundColor: '#FF85B2',
        color : '#FC4850',
        padding: '10px 15px'
      }
    }
    if(!props.showNotification){
      return (
        <p></p>
      )
    }
    return (
      <div style={notificationStyle}>
        <p>{props.text}</p>
      </div>
    )
  }

  export default Notification