import React from 'react';
import { Link } from 'react-router-dom';

const ConfirmationPage = () => {
  return (
    <div>
      <h1>Thank you for your payment</h1>

      <Link to="/">Go back</Link>
    </div>
  );
};

export default ConfirmationPage;
