import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router';

const AciComponent = ({ externalSessionToken }) => {
  const aciScriptContainer = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${externalSessionToken}`;

    window.wpwlOptions = {
      style: 'plain',
      locale: 'en',
      inlineFlow: ['KLARNA_PAYMENTS_PAYLATER'],
      onReady: () => {
        // Nothing happens here unless wrapping in a setTimeout.
        window.wpwl.executePayment('wpwl-container-virtualAccount-KLARNA_PAYMENTS_PAYLATER');
      },
    };

    aciScriptContainer.current.appendChild(script);
  }, [externalSessionToken]);

  return (
    <div style={{ marginTop: '50px' }}>
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
