import { Outlet, useNavigation } from 'react-router-dom';

export default function Layout() {
  const navigation = useNavigation();

  return (
    <div className="layout">
      {navigation.state === 'loading' && (
        <div className="loading">Загрузка...</div>
      )}
      <Outlet />
    </div>
  );
}
