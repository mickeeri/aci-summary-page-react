import React, { useState } from 'react';
import AciComponent from './AciComponent';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SummaryPage from './SummaryPage';
import ConfirmationPage from './ConfirmationPage';

const HN_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json';

function executePayment() {
  window.wpwl.executePayment('wpwl-container-card');
}

function App() {
  const [checkoutIdInputValue, setCheckoutIdInputValue] = useState('');
  const [checkoutId, setCheckoutId] = useState('');
  let apiCallIsSuccessful = false;

  function onBeforeSubmitWithAci() {
    async function makeApiCall() {
      try {
        const response = await fetch(HN_URL);
        await response.json();
        apiCallIsSuccessful = true;

        executePayment();
      } catch (error) {
        console.error(error);
      }
    }

    // The api call has already been made.
    if (apiCallIsSuccessful) return true;

    makeApiCall();

    return false;
  }

  function handleCheckoutIdChange(e) {
    setCheckoutIdInputValue(e.target.value);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    setCheckoutId(checkoutIdInputValue);
  }

  return (
    <div className="App" style={{ width: '30%', margin: '10rem auto' }}>
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <>
              <form onSubmit={handleOnSubmit}>
                <label htmlFor="checkoutId">Checkout ID</label>
                <input
                  id="checkoutId"
                  type="text"
                  value={checkoutIdInputValue}
                  onChange={handleCheckoutIdChange}
                />

                <button type="submit">Submit</button>
              </form>

              <AciComponent checkoutId={checkoutId} onBeforeSubmitWithAci={onBeforeSubmitWithAci} />
            </>
          </Route>

          <Route path="/summary-page">
            <SummaryPage />
          </Route>

          <Route path="/confirmation-page">
            <ConfirmationPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
