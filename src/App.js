import React from "react";
import CreditCardComponent from "./CreditCardComponent";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SummaryPage from "./SummaryPage";

const EXTERNAL_SESSION_TOKEN = "20EAFAF23F0D8D35347CD240801A2919.uat01-vm-tx04";

function App() {
  return (
    <div className="App" style={{ width: "30%", margin: "0 auto" }}>
      <Router>
        <Switch>
          <Route path="/summary-page">
            <SummaryPage></SummaryPage>
          </Route>
          <Route path="/">
            <CreditCardComponent
              externalSessionToken={EXTERNAL_SESSION_TOKEN}
            ></CreditCardComponent>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
