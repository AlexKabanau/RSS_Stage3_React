import reactLogo from '../../public/react.svg';

export default function Loading() {
  return (
    <div
      style={{
        fontSize: '24px',
        color: 'red',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <p>⏳ Loading...</p>
      <img src={reactLogo.src} className="logo" alt="loading" />
    </div>
  );
}
