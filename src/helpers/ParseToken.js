import jwt_decode from 'jwt-decode'

const ParseToken = () => {
  return new Promise((resolve, reject) => {
    const auth = JSON.parse(localStorage['persist:auth'])
    let { token } = auth
    let decodedToken

    if (token === null) {
      decodedToken = null
      return reject(decodedToken)
    } else {
      token = token.replace('"', '')
      decodedToken = jwt_decode(token)
      return resolve(decodedToken)
    }
  })
}

export default ParseToken