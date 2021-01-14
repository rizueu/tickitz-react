import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Import Components
import Home from '../views/Home';
import Auth from '../views/Auth';
import Movies from '../views/Movies';
import Order from '../views/Order';
import Proof from '../views/Proof';
import UserDashboard from '../views/UserDashboard';
import NavigationBar from '../components/NavigationBar';
import AdminDashboard from '../views/AdminDashboard';
import Footer from '../components/Footer';
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
                    <Footer />
                </NavigationBar>
            </Route>
            <Route path="/movies/:year/:slug">
                <Helmet>
                    <title>Movie Details - Tickitz</title>
                </Helmet>
                <NavigationBar>
                    <Movies />
                    <Footer />
                </NavigationBar>
            </Route>
            <Route exact path="/ticket/:method">
                <NavigationBar>
                    <Order/>
                    <Footer/>
                </NavigationBar>
            </Route>
            <Route path="/ticket/payment/result">
                <Helmet>
                    <title>Here's your proof of Payment - Tickitz</title>
                </Helmet>
                <NavigationBar>
                    <Proof />
                    <Footer />
                </NavigationBar>
            </Route>
            <Route path="/profile">
                <NavigationBar>
                    <UserDashboard/>
                    <Footer/>
                </NavigationBar>
            </Route>
            <Route path="/admin">
                <NavigationBar>
                    <AdminDashboard/>
                    <Footer/>
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
