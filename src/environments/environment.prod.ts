export const environment = {
  production: true,
  oauth : {
    clientId:  process.env['OAUTH_CLIENT_ID'],
    realm:  process.env['OAUTH_REALM'],
    url: process.env['OAUTH_URL'],
    callback: process.env['OAUTH_CALLBACK'],
    logout: process.env['OAUTH_LOGOUT'],
    responseType: process.env['OAUTH_RESPONSE_TYPE']
  },
  api: {
    url: process.env['API_URL']
  }
}
