import RestApis from './RestApiUrls'

const authService = {
  register: RestApis.authService + '/register',
  login: RestApis.authService + '/authenticate',
}

export default authService
