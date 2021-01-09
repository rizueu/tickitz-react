import { Switch, Route } from 'react-router-dom';

// Import Components
import Home from '../views/Home';
import Auth from '../views/Auth';
import NotFound from '../views/error/NotFound';

const Router = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/auth/:method" component={Auth} />
            <Route path="*" component={NotFound} />
        </Switch>
    )
}

export default Router;
