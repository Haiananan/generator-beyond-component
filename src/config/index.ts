const baseConfig = {
  aliyun: {
    accessKeyId: 'LTAI5tCUcBKajjACJ5hPjV22',
    accessKeySecret: 'hwSpT70dOqyppWQTICpAGn0nvARCSu',
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25'
  },
  jpush: {
    accessToken:
      'NWU1YmE4OTEyNDFiM2JjYmIxN2ZjOTFiOmZkMTBlMTFiMzYyYTdhNDJiNjczMzk4Zg==',
    privateKey: `-----BEGIN PRIVATE KEY-----
      MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBANJ+adxjM3yaAutQ
      U7+3KObVQVhcT74G3wfec9jZxx4W+kjv2s4d1N+BNFaTh+X/w9WlZ8uUAzhoDcc1
      HaG/xV5DQn4aXA9VLhHXEIQuF6hY5ya/FFX6GfKFyCC2FTILDV84NhNA8+f4v2CX
      IKBlM8EPjdnplUpZEVlaxDhy56qZAgMBAAECgYEAhsMUN1rzjaR0lf75f1ZeQ1ro
      2Q9QplJz2+/Zr03OIz+Gwcd+CFQlA2sO/Ra6/M+Aq3mYOEfsv+IuYAlrjTDfxE4T
      SqyOch+3cg9yXo7UeZCDEYA5riXAMFNlQTgtu0XlGADKYn/SLr+1p8o4yM055sDC
      pz3euyjL4+K0Zmkq0uECQQD1B2TkQli62uZA0il+WIdP1kEAVpwtp8L8nfho/AE1
      NaJ7nq67ZL9pql9QCh0uTSuEwL9CqDKGt3d88ISYjeaNAkEA2+sqlsBDdRW+S1Ql
      8HBbvIoFalP2f4ruqBz8qvfCPqY4KuB3dYIu+moSqtEiUzsmGnFKiDyQFPvIhJZH
      l+lnPQJAS1NJlc47nr26eQTikp++gTGZa/Q0MOjYzXX2rreB24ywdZZTmvIe0en5
      QQ7K57f7f+UNJv20AqwWBIegC5Hb5QJBANLwXVhdsBaFNZKxcvaN/x/3zzvurzgk
      /cdYjm462SEYdDWEOnEG3qKozaD0mhT1XhXs5s2IMbc+zlWGg8NNSA0CQQCWY5Xh
      5UR3O1el2Xxk+mSekj+LCQPd/T/dnn2w6DQYeY4NedPHtL7ueJKw6GAcodaX3TB7
      ZWNEUO8LwnVknSvU
      -----END PRIVATE KEY-----`
  },
  // qq互联
  qqConnect: {
    appId: '101961267',
    appKey: 'b345e2a2c2e219e53391b3695d9f0e91',
    redirectUrl: 'https://proxy.5yweb.com/auth/callback/custom/qqlogin'
  },
  jwt: {
    /** accessToken过期时间 1天 */
    expiresIn: 3600 * 24 * 1,
    /** refreshToken过期时间 30 天 */
    expiresInRefresh: 3600 * 24 * 30,
    /** 加密字符串 */
    secretKey: 'nyVaAGUjiaVxVRXK0zStNvnfL',
    /** 放行的路径 */
    anonymPaths: ['/', /\/auth\/.*/, /\/docs\/.*/, '/sw.js'],
    /** 宽松拦截模式路径 */
    noForceModePaths: ['']
  }
}
export default baseConfig
