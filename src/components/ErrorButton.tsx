import React, { useState } from 'react';

const ErrorButton: React.FC = () => {
  const [error, setError] = useState<boolean>(false);

  const handleError = () => {
    console.log('error');
    setError(true);
  };

  const resetError = () => {
    setError(false);
  };

  return (
    <div>
      {error ? (
        <div className="error-content">
          <h3>Some error occurred. Please open console and try again.</h3>
          <button onClick={resetError}>Reset</button>
        </div>
      ) : (
        <button data-testid="errorButton" onClick={handleError}>
          ErrorButton
        </button>
      )}
    </div>
  );
};

export default ErrorButton;
