const UserInfo = ({ user, handleLogout }) => {  
  return (
    <p>
      {user.name} logged in <button onClick={handleLogout}>Logout</button>
    </p>
  )
}

export default UserInfo
