import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router';

const ACI_SCRIPT_ID = 'aci-script';

const AciComponent = ({ checkoutId, onBeforeSubmitWithAci, formNumber }) => {
  const aciScriptContainer = useRef();

  useEffect(() => {
    function initAciForm() {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
      script.id = ACI_SCRIPT_ID;

      if (document.getElementById(ACI_SCRIPT_ID)) return;

      window.wpwlOptions = {
        style: 'plain',
        locale: 'en',
        onReady: () => {},
        onBeforeSubmitCard: onBeforeSubmitWithAci,
      };

      aciScriptContainer.current.appendChild(script);
    }

    if (checkoutId) initAciForm();
  }, [checkoutId, onBeforeSubmitWithAci]);

  useEffect(() => {
    return () => {
      if (window.wpwl && window.wpwl.unload) {
        // Unload the widget when unmounting this component.
        window.wpwl.unload();
      }
    };
  }, []);

  if (!checkoutId) {
    return <p>Please submit a Checkout ID</p>;
  }

  return (
    <div style={{ marginTop: '5rem' }} className="AciComponent my-l-2xs" data-testid="AciComponent">
      <h2>Form number: {formNumber}</h2>
      <form
        action={`${window.location.origin}/confirmation-page/`}
        className="paymentWidgets"
        data-brands="VISA"
      />

      <div ref={aciScriptContainer} />
    </div>
  );
};

export default withRouter(AciComponent);
