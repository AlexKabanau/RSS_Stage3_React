import React from 'react';
import './PasswordStrengthBar.css';

interface PasswordStrengthBarProps {
  strength: number;
}

function PasswordStrengthBar({ strength }: PasswordStrengthBarProps) {
  const getStrengthLabel = (strength: number) => {
    switch (strength) {
      case 0:
        return 'Very Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Medium';
      case 3:
        return 'Strong';
      case 4:
        return 'Very Strong';
      default:
        return '';
    }
  };

  const getStrengthColor = (strength: number) => {
    switch (strength) {
      case 0:
        return 'red';
      case 1:
        return 'orange';
      case 2:
        return 'yellow';
      case 3:
        return 'lightgreen';
      case 4:
        return 'green';
      default:
        return 'gray';
    }
  };

  const strengthLabel = getStrengthLabel(strength);
  const strengthColor = getStrengthColor(strength);

  return (
    <div className="password-strength-bar-container">
      <div className="password-strength-bar">
        <div
          className="password-strength-bar-fill"
          style={{
            width: `${(strength / 4) * 100}%`,
            backgroundColor: strengthColor,
          }}></div>
      </div>
      <div className="password-strength-bar-label">{strengthLabel}</div>
    </div>
  );
}

export default PasswordStrengthBar;
