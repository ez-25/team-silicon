import Image, { type ImageProps } from 'next/image';
import { Button } from '@repo/ui/button';
import { css } from '../../styled-system/css';

type Props = Omit<ImageProps, 'src'> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

const pageStyles = css({
  display: 'grid',
  gridTemplateRows: '20px 1fr 20px',
  alignItems: 'center',
  justifyItems: 'center',
  minHeight: '100svh',
  padding: '80px',
  gap: '64px',
  fontSynthesis: 'none',
  '@media (max-width: 600px)': {
    padding: '32px',
    paddingBottom: '80px',
  },
});

const mainStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  gridRowStart: 2,
  '& ol': {
    fontFamily: 'var(--font-geist-mono)',
    paddingLeft: 0,
    margin: 0,
    fontSize: '14px',
    lineHeight: '24px',
    letterSpacing: '-0.01em',
    listStylePosition: 'inside',
    '@media (max-width: 600px)': {
      textAlign: 'center',
    },
  },
  '& li:not(:last-of-type)': {
    marginBottom: '8px',
  },
  '& code': {
    fontFamily: 'inherit',
    background: 'rgba(0, 0, 0, 0.05)',
    padding: '2px 4px',
    borderRadius: '4px',
    fontWeight: 600,
    _dark: {
      background: 'rgba(255, 255, 255, 0.06)',
    },
  },
  '@media (max-width: 600px)': {
    alignItems: 'center',
  },
});

const logoStyles = css({
  _dark: {
    filter: 'invert()',
  },
});

const ctasStyles = css({
  display: 'flex',
  gap: '16px',
  '@media (max-width: 600px)': {
    flexDirection: 'column',
  },
});

const buttonBaseStyles = css({
  appearance: 'none',
  borderRadius: '128px',
  height: '48px',
  padding: '0 20px',
  border: 'none',
  fontFamily: 'var(--font-geist-sans)',
  border: '1px solid transparent',
  transition: 'background 0.2s, color 0.2s, border-color 0.2s',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  lineHeight: '20px',
  fontWeight: 500,
  '@media (max-width: 600px)': {
    fontSize: '14px',
    height: '40px',
    padding: '0 16px',
  },
});

const primaryButtonStyles = css(buttonBaseStyles.raw, {
  background: 'foreground',
  color: 'background',
  gap: '8px',
  '@media (hover: hover) and (pointer: fine)': {
    '&:hover': {
      background: '#383838',
      borderColor: 'transparent',
      _dark: {
        background: '#ccc',
      },
    },
  },
});

const secondaryButtonStyles = css(buttonBaseStyles.raw, {
  background: 'transparent',
  borderColor: 'rgba(0, 0, 0, 0.08)',
  minWidth: '180px',
  _dark: {
    borderColor: 'rgba(255, 255, 255, 0.145)',
  },
  '@media (hover: hover) and (pointer: fine)': {
    '&:hover': {
      background: '#f2f2f2',
      borderColor: 'transparent',
      _dark: {
        background: '#1a1a1a',
      },
    },
  },
  '@media (max-width: 600px)': {
    minWidth: 'auto',
  },
});

const footerStyles = css({
  fontFamily: 'var(--font-geist-sans)',
  gridRowStart: 3,
  display: 'flex',
  gap: '24px',
  '& a': {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '@media (hover: hover) and (pointer: fine)': {
      '&:hover': {
        textDecoration: 'underline',
        textUnderlineOffset: '4px',
      },
    },
  },
  '& img': {
    flexShrink: 0,
  },
  '@media (max-width: 600px)': {
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Home() {
  return (
    <div className={pageStyles}>
      <main className={mainStyles}>
        <ThemeImage
          className={logoStyles}
          srcLight="turborepo-dark.svg"
          srcDark="turborepo-light.svg"
          alt="Turborepo logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>apps/docs/app/page.tsx</code>
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={ctasStyles}>
          <a
            className={primaryButtonStyles}
            href="https://vercel.com/new/clone?demo-description=Learn+to+implement+a+monorepo+with+a+two+Next.js+sites+that+has+installed+three+local+packages.&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F4K8ZISWAzJ8X1504ca0zmC%2F0b21a1c6246add355e55816278ef54bc%2FBasic.png&demo-title=Monorepo+with+Turborepo&demo-url=https%3A%2F%2Fexamples-basic-web.vercel.sh%2F&from=templates&project-name=Monorepo+with+Turborepo&repository-name=monorepo-turborepo&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fturborepo%2Ftree%2Fmain%2Fexamples%2Fbasic&root-directory=apps%2Fdocs&skippable-integrations=1&teamSlug=vercel&utm_source=create-turbo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={logoStyles}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://turbo.build/docs?utm_source"
            target="_blank"
            rel="noopener noreferrer"
            className={secondaryButtonStyles}
          >
            Read our docs
          </a>
        </div>
        <Button appName="docs" className={secondaryButtonStyles}>
          Open alert
        </Button>
      </main>
      <footer className={footerStyles}>
        <a
          href="https://vercel.com/templates?search=turborepo&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://turbo.build?utm_source=create-turbo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to turbo.build →
        </a>
      </footer>
    </div>
  );
}
