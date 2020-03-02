import React, { useEffect, useRef, useCallback } from 'react';
import { withRouter } from 'react-router';

const CreditCardComponent = ({ externalSessionToken, onBeforeSubmitCardWithAci }) => {
  const aciScriptContainer = useRef();

  const initAciForm = useCallback(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${externalSessionToken}`;

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
  }, [externalSessionToken, onBeforeSubmitCardWithAci]);

  useEffect(() => {
    initAciForm();
  }, [externalSessionToken, initAciForm]);

  return (
    <div
      style={{ marginTop: '50px' }}
      className="CreditCardComponent my-l-2xs"
      data-testid="CreditCardComponent"
    >
      <form
        action={`${window.location.origin}/confirmation-page/`}
        className="paymentWidgets"
        data-brands="VISA MASTER AMEX"
      />

      <div ref={aciScriptContainer} />
    </div>
  );
};

export default withRouter(CreditCardComponent);
