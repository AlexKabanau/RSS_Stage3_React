import './PasswordStrengthBar.css';

interface PasswordStrengthBarProps {
  strength: number;
}

function PasswordStrengthBar({ strength }: PasswordStrengthBarProps) {
  const getStrengthLabel = (strength: number) => {
    switch (strength) {
      case 0:
        return 'Weak';
      case 1:
        return 'Medium';
      case 2:
        return 'Strong';
      case 3:
        return 'Strong';
      case 4:
        return 'Strong';
      default:
        return 'Weak';
    }
  };

  const getStrengthColor = (strength: number) => {
    switch (strength) {
      case 0:
        return 'red';
      case 1:
        return 'yellow';
      case 2:
        return 'green';
      case 3:
        return 'green';
      case 4:
        return 'green';
      default:
        return 'red';
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
          }}
        ></div>
      </div>
      <div className="password-strength-bar-label">{strengthLabel}</div>
    </div>
  );
}

export default PasswordStrengthBar;
