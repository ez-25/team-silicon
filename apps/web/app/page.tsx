import Image from 'next/image';
import { css } from '@/styled-system/css';

export default function Home() {
  return (
    <main className={css({ minH: '100vh', display: 'flex', flexDir: 'column', alignItems: 'center', justifyContent: 'space-between', p: '24px' })}>
      <div className={css({ zIndex: 10, w: 'full', maxW: '1200px', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px', lg: { display: 'flex' } })}>
        <p className={css({ position: 'fixed', left: 0, top: 0, display: 'flex', w: 'full', justifyContent: 'center', pb: '24px', pt: '32px', borderBottom: '1px solid #eaeaea', background: 'linear-gradient(to bottom, white, rgba(255,255,255,0))', lg: { position: 'static', w: 'auto', p: 0, background: 'none' } })}>
          Get started by editing&nbsp;
          <code className={css({ fontFamily: 'var(--font-geist-mono)', fontWeight: 'bold' })}>app/page.tsx</code>
        </p>
        <div className={css({ position: 'fixed', bottom: 0, left: 0, display: 'flex', h: '64px', w: 'full', alignItems: 'end', justifyContent: 'center', background: 'linear-gradient(to top, white, rgba(255,255,255,0))', lg: { position: 'static', h: 'auto', background: 'none' } })}>
          <a
            className={css({ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', p: '4px 12px', pointerEvents: 'none', lg: { pointerEvents: 'auto' } })}
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={css({ filter: 'invert(1)' })}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={css({ position: 'relative', display: 'flex', placeItems: 'center', _before: { content: '""', position: 'absolute', h: '300px', w: '480px', rounded: '50%', filter: 'blur(24px)', bgGradient: 'radial(rgba(var(--callout-rgb), 0.2), transparent 80%)', zIndex: -1 }, _after: { content: '""', position: 'absolute', w: '240px', h: '180px', zIndex: -1, bgGradient: 'radial(rgba(var(--callout-rgb), 0.2), transparent 80%)', transform: 'translate(240px, -180px)', rounded: '50%', filter: 'blur(24px)' } })}>
        <Image
          className={css({ position: 'relative', filter: 'drop-shadow(0 0 0.75rem #61dafb)' })}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={css({ display: 'grid', mb: '32px', gridTemplateColumns: '1fr', maxW: '1200px', textAlign: 'center', lg: { mb: 0, gridTemplateColumns: 'repeat(4, 1fr)' } })}>
        <a
          className={css({ p: '4px 12px', borderRadius: '8px', bg: 'rgba(var(--card-rgb), 0)', border: '1px solid rgba(var(--card-border-rgb), 0)', transition: 'background 0.3s ease, border 0.3s ease', _hover: { bg: 'rgba(var(--card-rgb), 0.1)', border: '1px solid rgba(var(--card-border-rgb), 0.2)' } })}
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={css({ fontWeight: 'semibold', mb: '8px' })}>
            Docs{' '}
            <span className={css({ display: 'inline-block', transition: 'transform 0.2s ease', _groupHover: { transform: 'translateX(4px)' } })}>
              &rarr;
            </span>
          </h2>
          <p className={css({ m: 0, maxW: '30ch', fontSize: '14px', opacity: 0.6 })}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          className={css({ p: '4px 12px', borderRadius: '8px', bg: 'rgba(var(--card-rgb), 0)', border: '1px solid rgba(var(--card-border-rgb), 0)', transition: 'background 0.3s ease, border 0.3s ease', _hover: { bg: 'rgba(var(--card-rgb), 0.1)', border: '1px solid rgba(var(--card-border-rgb), 0.2)' } })}
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={css({ fontWeight: 'semibold', mb: '8px' })}>
            Learn{' '}
            <span className={css({ display: 'inline-block', transition: 'transform 0.2s ease', _groupHover: { transform: 'translateX(4px)' } })}>
              &rarr;
            </span>
          </h2>
          <p className={css({ m: 0, maxW: '30ch', fontSize: '14px', opacity: 0.6 })}>
            Learn about Next.js in an interactive course with quizzes!
          </p>
        </a>

        <a
          className={css({ p: '4px 12px', borderRadius: '8px', bg: 'rgba(var(--card-rgb), 0)', border: '1px solid rgba(var(--card-border-rgb), 0)', transition: 'background 0.3s ease, border 0.3s ease', _hover: { bg: 'rgba(var(--card-rgb), 0.1)', border: '1px solid rgba(var(--card-border-rgb), 0.2)' } })}
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={css({ fontWeight: 'semibold', mb: '8px' })}>
            Templates{' '}
            <span className={css({ display: 'inline-block', transition: 'transform 0.2s ease', _groupHover: { transform: 'translateX(4px)' } })}>
              &rarr;
            </span>
          </h2>
          <p className={css({ m: 0, maxW: '30ch', fontSize: '14px', opacity: 0.6 })}>
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          className={css({ p: '4px 12px', borderRadius: '8px', bg: 'rgba(var(--card-rgb), 0)', border: '1px solid rgba(var(--card-border-rgb), 0)', transition: 'background 0.3s ease, border 0.3s ease', _hover: { bg: 'rgba(var(--card-rgb), 0.1)', border: '1px solid rgba(var(--card-border-rgb), 0.2)' } })}
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={css({ fontWeight: 'semibold', mb: '8px' })}>
            Deploy{' '}
            <span className={css({ display: 'inline-block', transition: 'transform 0.2s ease', _groupHover: { transform: 'translateX(4px)' } })}>
              &rarr;
            </span>
          </h2>
          <p className={css({ m: 0, maxW: '30ch', fontSize: '14px', opacity: 0.6 })}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
