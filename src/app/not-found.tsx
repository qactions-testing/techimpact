import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="chrome-card rounded-3xl p-10 text-center">
      <h1 className="text-2xl font-bold">No encontramos esa página.</h1>
      <p className="mt-2 text-beige/60">Puede que el caso haya cambiado de dirección.</p>
      <Link href="/" className="chrome-button mt-5 inline-block rounded-full px-5 py-2.5 font-semibold">
        Ver todos los casos
      </Link>
    </div>
  );
}
