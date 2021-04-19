import { Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import PrivateRoute from "./PrivateRoute";

// Import Components
import Home from "../views/Home";
import Auth from "../views/Auth";
import Movies from "../views/Movies";
import ViewAll from "../views/ViewAll";
import Order from "../views/Order";
import Proof from "../views/Proof";
import UserDashboard from "../views/UserDashboard";
import AdminDashboard from "../views/AdminDashboard";
import NotFound from "../views/error/NotFound";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

const Router = () => {
  return (
    <Switch>
      <PrivateRoute path="/" exact>
        <Helmet>
          <title>Home - Tickitz</title>
        </Helmet>
        <NavigationBar>
          <Home />
          <Footer />
        </NavigationBar>
      </PrivateRoute>
      <Route path="/movies/:id">
        <Helmet>
          <title>Movie Details - Tickitz</title>
        </Helmet>
        <NavigationBar>
          <Movies />
          <Footer />
        </NavigationBar>
      </Route>
      <Route path="/movies">
        <Helmet>
          <title>View All Movies - Tickitz</title>
        </Helmet>
        <NavigationBar>
          <ViewAll />
          <Footer />
        </NavigationBar>
      </Route>
      <PrivateRoute exact path="/ticket/:method">
        <NavigationBar>
          <Order />
          <Footer />
        </NavigationBar>
      </PrivateRoute>
      <PrivateRoute path="/ticket/payment/result">
        <Helmet>
          <title>Here's your proof of Payment - Tickitz</title>
        </Helmet>
        <NavigationBar>
          <Proof />
          <Footer />
        </NavigationBar>
      </PrivateRoute>
      <PrivateRoute path="/profile">
        <NavigationBar>
          <UserDashboard />
          <Footer />
        </NavigationBar>
      </PrivateRoute>
      <Route path="/admin">
        <NavigationBar>
          <AdminDashboard />
          <Footer />
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
  );
};

export default Router;
