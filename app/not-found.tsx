import Link from 'next/link';
import css from '../components/Home/Home.module.css';
import { Metadata } from 'next';

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">Go back home</Link>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Not found 404',
  description: 'Notes not found',
  openGraph: {
    title: 'Not found 404',
    description: 'Notes not found',
    url: 'https://08-zustand-ten-indol.vercel.app/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Manage personal notes',
      },
    ],
  },
};
