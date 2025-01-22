const LoginForm = ({
  handleLogin,
  handleUsername,
  handlePassword,
  username,
  password,
}) => {
  return (
    <form action="#" onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">username</label>
        <input
          type="text"
          id={'username'}
          value={username}
          onChange={(e) => handleUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type="password"
          id={'password'}
          value={password}
          onChange={(e) => handlePassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
