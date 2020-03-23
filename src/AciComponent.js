import React, { useEffect, useRef, useCallback } from 'react';
import { withRouter } from 'react-router';

const AciComponent = ({ checkoutId, onBeforeSubmitCardWithAci }) => {
  const aciScriptContainer = useRef();

  const initAciForm = useCallback(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;

    window.wpwlOptions = {
      style: 'plain',
      locale: 'en',
      brandDetection: true,
      brandDetectionType: 'binlist',
      showCVVHint: true,
      onBeforeSubmitCard: onBeforeSubmitCardWithAci,
      onReadyIframeCommunication: () => {},
      onReady: () => {
        const cardHolderInput = document.querySelector('.wpwl-control-cardHolder');
        cardHolderInput.value = 'Mikael Eriksson';
      },
    };

    aciScriptContainer.current.appendChild(script);
  }, [checkoutId, onBeforeSubmitCardWithAci]);

  useEffect(() => {
    if (checkoutId) initAciForm();
  }, [checkoutId, initAciForm]);

  if (!checkoutId) {
    return <p>Please submit a Checkout ID</p>;
  }

  return (
    <div style={{ marginTop: '5rem' }} className="AciComponent my-l-2xs" data-testid="AciComponent">
      <form
        action={`${window.location.origin}/confirmation-page/`}
        className="paymentWidgets"
        data-brands="VISA MASTER AMEX"
      />

      <div ref={aciScriptContainer} />
    </div>
  );
};

export default withRouter(AciComponent);
