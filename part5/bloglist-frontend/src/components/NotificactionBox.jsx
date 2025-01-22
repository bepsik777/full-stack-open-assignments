const NotificationBox = ({notification}) => {
    return <div className={`notification ${notification.isError ? 'error' : ''}`}>{notification.text}</div>
}

export default NotificationBox
