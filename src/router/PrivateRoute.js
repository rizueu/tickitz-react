import { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import ParseToken from '../helpers/ParseToken'

const PrivateRoute = ({ children, ...rest }) => {

  const [decodedToken, setDecodedToken] = useState(null)

  useEffect(() => {
    ParseToken()
      .then(response => setDecodedToken(response))
      .catch(response => setDecodedToken(response))
  }, [])

  return (
    <div>
      <Route
        {...rest}
        render={({ location }) => 
          decodedToken ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/auth/login",
                state: { from: location }
              }}
            />
          )
        }
    />
    </div>
  )
}

export default PrivateRoute
