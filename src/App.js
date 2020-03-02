import React from 'react';
import AciComponent from './AciComponent';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SummaryPage from './SummaryPage';

const EXTERNAL_SESSION_TOKEN = '8958CCDDEFDB2170367BFBB39E6F5BF0.uat01-vm-tx03';

function App() {
  return (
    <div className="App" style={{ width: '30%', margin: '0 auto' }}>
      <Router>
        <Switch>
          <Route path="/summary-page">
            <SummaryPage />
          </Route>
          <Route path="/">
            <AciComponent externalSessionToken={EXTERNAL_SESSION_TOKEN} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
