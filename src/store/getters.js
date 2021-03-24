const getters = {
  token: state => state.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  adminId: state => state.user.adminId,
  roles: state => state.roles,
  authorization: state => state.authorization
}
export default getters
