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
          <h3>Произошла ошибка. Пожалуйста, попробуйте еще раз.</h3>
          <button onClick={resetError}>Перезагрузить</button>
        </div>
      ) : (
        <button onClick={handleError}>ErrorButton</button>
      )}
    </div>
  );
};

export default ErrorButton;
