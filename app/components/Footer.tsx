export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-rule/60 bg-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 sm:py-16 md:px-10 md:py-24">
        <div className="grid grid-cols-12 gap-x-3 gap-y-10 sm:gap-x-6">
          <div className="col-span-12 md:col-span-6">
            <p className="font-mono-cap text-muted">Colophon</p>
            <p className="mt-5 max-w-prose font-display text-2xl leading-tight text-ink sm:mt-6 sm:text-3xl md:text-5xl">
              Set in Instrument&nbsp;Serif and Inter. Drawn live with a
              <span className="italic text-accent"> 4-point interpolatory </span>
              subdivision scheme.
            </p>
          </div>
          <div className="col-span-6 md:col-span-3 md:col-start-9">
            <p className="font-mono-cap text-muted">Index</p>
            <ul className="mt-5 space-y-2 sm:mt-6">
              <li>
                <a className="hover:text-accent" href="#about">
                  § 01 · About
                </a>
              </li>
              <li>
                <a className="hover:text-accent" href="#trajectory">
                  § 02 · Trajectory
                </a>
              </li>
              <li>
                <a className="hover:text-accent" href="#writing">
                  § 03 · Writing
                </a>
              </li>
              <li>
                <a className="hover:text-accent" href="#conversation">
                  § 04 · Conversation
                </a>
              </li>
              <li>
                <a className="hover:text-accent" href="#correspondence">
                  § 05 · Correspondence
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-6 md:col-span-3">
            <p className="font-mono-cap text-muted">Elsewhere</p>
            <ul className="mt-5 space-y-2 sm:mt-6">
              <li>
                <a
                  className="hover:text-accent"
                  href="https://medium.com/@uriitai"
                  target="_blank"
                  rel="noreferrer"
                >
                  Medium ↗
                </a>
              </li>
              <li>
                <a
                  className="hover:text-accent"
                  href="https://www.linkedin.com/in/uri-itai-43106316/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  className="break-all hover:text-accent"
                  href="mailto:hello@uriitai.com"
                >
                  hello@uriitai.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-rule pt-6 font-mono-cap text-muted sm:mt-16 md:flex-row md:items-center">
          <span>© {year} Uri Itai · all rights reserved</span>
          <span className="text-left md:text-center">
            Engineered by{" "}
            <a
              href="https://www.itaiwebsolutions.com/"
              target="_blank"
              rel="noreferrer"
              className="text-ink underline decoration-rule decoration-1 underline-offset-[0.25em] transition-colors hover:text-accent hover:decoration-accent/60"
            >
              ITAI Web Solutions
            </a>
          </span>
          <span className="text-left md:text-right">
            Built in Tel Aviv · קוד&nbsp;ומתמטיקה
          </span>
        </div>
      </div>
    </footer>
  );
}
