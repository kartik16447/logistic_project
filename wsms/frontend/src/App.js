import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar.js";
import AdminPanel from "./AdminPanel/AdminPanel";
import CreateInwardOrder from "./CreateInwardOrder/CreateInwardOrder";
import CreateOutwardOrder from "./CreateOutwardOrder/CreateOutwardOrder";
import Orders from "./Orders/Orders";
import Login from "./Authentication/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/orders">
              <Orders />
            </Route>
            <Route exact path="/adminPanel">
              <AdminPanel />
            </Route>
            <Route path="/createInwardOrder">
              <CreateInwardOrder />
            </Route>
            <Route path="/createOutwardOrder">
              <CreateOutwardOrder />
            </Route>
            {/* <Route path="*">
              <NotFound />
            </Route> */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
