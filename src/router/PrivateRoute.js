import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'
import jwt_decode from 'jwt-decode';

const PrivateRoute = ({ children, ...rest }) => {
  const token = useSelector(state => state.auth.token)
  let decodedToken

  if (token !== null) {
      decodedToken = jwt_decode(token)
  } else {
      decodedToken = null
  }

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
