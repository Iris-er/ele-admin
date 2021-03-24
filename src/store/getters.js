const getters = {
  token: state => state.user.token,
  avatar: state => state.user.user.avatar,
  name: state => state.user.user.name,
  adminId: state => state.user.user.adminId,
  roles: state => state.user.roles,
  authorization: state => state.user.authorization
}
export default getters
