import React, { useState, useEffect } from 'react';
import CreditCardComponent from './CreditCardComponent';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SummaryPage from './SummaryPage';
import ConfirmationPage from './ConfirmationPage';
import './App.css';

const EXTERNAL_SESSION_TOKEN = '6A767EC5124E33580D10069E7198CE19.uat01-vm-tx03';
const HN_URL = 'https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty';

function App() {
  const [makeApiCallSuccess, setMakeApiCallSuccess] = useState(false);

  useEffect(() => {
    if (makeApiCallSuccess) executePayment();
  }, [makeApiCallSuccess]);

  function executePayment(e) {
    if (e) e.preventDefault();
    // This only works with a timeout. Otherwise makeApiCallSuccess
    // is false in onBeforeSubmitWithAci.
    setTimeout(() => {
      window.wpwl.executePayment('wpwl-container-card');
    }, 500);
  }

  async function makeApiCall() {
    const response = await fetch(HN_URL);
    await response.json();
    setMakeApiCallSuccess(true);
  }

  function onBeforeSubmitWithAci() {
    console.log('onBeforeSubmitWithAci', makeApiCallSuccess);

    if (makeApiCallSuccess) return true;

    makeApiCall();

    return false;
  }

  return (
    <div className="App" style={{ width: '30%', margin: '0 auto' }}>
      <Router>
        <Switch>
          <Route path="/summary-page">
            <SummaryPage />
          </Route>

          <Route path="/confirmation-page">
            <ConfirmationPage />
          </Route>
          <Route path="/">
            <CreditCardComponent
              externalSessionToken={EXTERNAL_SESSION_TOKEN}
              onBeforeSubmitCardWithAci={onBeforeSubmitWithAci}
            />

            <button onClick={executePayment}>Submit</button>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
