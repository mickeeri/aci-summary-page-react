import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router';

const AciComponent = ({ checkoutId, onBeforeSubmitCardWithAci }) => {
  const aciScriptContainer = useRef();

  useEffect(() => {
    function initAciForm() {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
      script.id = 'aci-script';

      if (document.getElementById('aci-script')) return;

      window.wpwlOptions = {
        style: 'plain',
        locale: 'en',
        inlineFlow: ['KLARNA_PAYMENTS_PAYLATER'],
        onReady: () => {
          window.wpwl.executePayment('wpwl-container-virtualAccount-KLARNA_PAYMENTS_PAYLATER');
        },
      };

      aciScriptContainer.current.appendChild(script);
    }

    if (checkoutId) initAciForm();
  }, [checkoutId]);

  if (!checkoutId) {
    return <p>Please submit a Checkout ID</p>;
  }

  return (
    <div style={{ marginTop: '5rem' }} className="AciComponent my-l-2xs" data-testid="AciComponent">
      <form
        action={`${window.location.origin}/confirmation-page/`}
        className="paymentWidgets"
        data-brands="KLARNA_PAYMENTS_PAYLATER"
      />

      <div ref={aciScriptContainer} />
    </div>
  );
};

export default withRouter(AciComponent);
