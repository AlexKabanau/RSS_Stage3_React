import React from 'react';

interface ToastProps {
  content: React.ReactNode;
}

const Toast: React.FC<ToastProps> = ({ content }) => {
  // console.log('Rendering Toast with content:', content);
  return <div className="toast">{content}</div>;
};

export default Toast;
