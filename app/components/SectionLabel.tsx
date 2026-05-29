type Props = {
  number: string;
  title: string;
  className?: string;
};

export default function SectionLabel({ number, title, className = "" }: Props) {
  return (
    <div className={`font-mono-cap text-muted ${className}`}>
      <div className="flex items-center gap-3 text-accent">
        <span>§&nbsp;{number}</span>
        <span className="h-px w-10 bg-rule" aria-hidden />
      </div>
      <div className="mt-2 text-ink-soft">{title}</div>
    </div>
  );
}
