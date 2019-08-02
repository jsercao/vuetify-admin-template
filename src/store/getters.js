const getters = {
  token: state => state.auth.token,
  user: state => state.auth.user,
  roles: state => state.auth.roles
}
export default getters

