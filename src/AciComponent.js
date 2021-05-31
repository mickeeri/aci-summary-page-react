import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router';

const AciComponent = ({ checkoutId, onBeforeSubmitWithAci }) => {
  const aciScriptContainer = useRef();

  useEffect(() => {
    function initAciForm() {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
      script.id = 'aci-script';

      if (document.getElementById('aci-script')) return;

      script.addEventListener('error', (error) => {
        console.error(error);
      });

      window.wpwlOptions = {
        style: 'plain',
        locale: 'en',
        onReady: () => {},
        onBeforeSubmitCard: onBeforeSubmitWithAci,
        inlineFlow: ['KLARNA_PAYMENTS_PAYLATER'],
        onError: (error) => {
          alert(JSON.stringify(error));
          console.error(error);
        },
      };

      aciScriptContainer.current.appendChild(script);
    }

    if (checkoutId) initAciForm();
  }, [checkoutId, onBeforeSubmitWithAci]);

  if (!checkoutId) {
    return <p>Please submit a Checkout ID</p>;
  }

  return (
    <div style={{ marginTop: '5rem' }} className="AciComponent my-l-2xs" data-testid="AciComponent">
      <form
        action={`${window.location.origin}/confirmation-page/`}
        className="paymentWidgets"
        data-brands="VISA MASTER KLARNA_PAYMENTS_PAYLATER"
      />

      <div ref={aciScriptContainer} />
    </div>
  );
};

export default withRouter(AciComponent);
