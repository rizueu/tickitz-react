import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Import Components
import Home from '../views/Home';
import Auth from '../views/Auth';
import NavigationBar from '../components/NavigationBar';
import NotFound from '../views/error/NotFound';

const Router = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <Helmet>
                    <title>Home - Tickitz</title>
                </Helmet>
                <NavigationBar>
                    <Home />
                </NavigationBar>
            </Route>
            <Route path="/auth/:method" component={Auth} />
            <Route path="*">
                <Helmet>
                    <title>Sorry Page Not Found - Tickitz</title>
                </Helmet>
                <NotFound />
            </Route>
        </Switch>
    )
}

export default Router;
