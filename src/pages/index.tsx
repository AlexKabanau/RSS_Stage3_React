import dynamic from 'next/dynamic';

const ErrorButton = dynamic(() => import('@/components/ErrorButton'), {
  ssr: false,
});
export default function HomePage() {
  return (
    <>
      Hello
      <ErrorButton />
    </>
  );
}
