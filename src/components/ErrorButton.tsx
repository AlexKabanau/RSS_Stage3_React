import React, { useEffect, useState } from 'react';

const ErrorButton: React.FC = () => {
  const [error, setError] = useState<boolean>(false);

  const handleError = () => {
    console.log('error');
    setError(true);
  };

  useEffect(() => {
    if (error) {
      throw new Error('Error');
    }
  }, [error]);

  return <button onClick={() => handleError()}>ErrorButton</button>;
};

export default ErrorButton;
