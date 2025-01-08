export const environment = {
  production: false,
  oauth : {
    clientId: "sysm-portfolio-api",
    realm: "sys-monkey",
    url: "https://auth.sys-monkey.com",
    //callback: "https://wenceslau-portfolio-ui.vercel.app/callback",
    callback: "/callback",
    //logout: "https://wenceslau-portfolio-ui.vercel.app/home",
    logout: "/home",
    responseType: "token id_token"
  },
  api: {
    url: "https://app.sys-monkey.com/portfolio/api",
  }
}
