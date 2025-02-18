import React from 'react';
import { ToastProvider, useToast } from './ToastContext';

const ToastDemo: React.FC = () => {
  const { addToast } = useToast();
  return (
    <div>
      <button onClick={() => addToast('Test toast')}>Show Toast</button>
    </div>
  );
};

const App: React.FC = () => (
  <ToastProvider>
    <ToastDemo />
  </ToastProvider>
);

export default App;
