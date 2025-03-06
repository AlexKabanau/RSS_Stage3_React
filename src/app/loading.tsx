export default function Loading() {
  console.log('Loading component rendered');
  return (
    <div
      style={{
        fontSize: '24px',
        color: 'red',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <p>⏳ Загрузка...</p>
      <em>искусственное замедление для демонстрации работоспособности</em>
    </div>
  );
}
