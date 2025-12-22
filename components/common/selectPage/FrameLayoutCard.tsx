interface Props {
  active: boolean;
  title: string;
  sub: string;
  children: React.ReactNode;
  onClick: () => void;
}

export default function FrameLayoutCard({ active, title, sub, children, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full text-left rounded-2xl p-3 cursor-pointer
        bg-white/70 shadow-md
        transition-all duration-200 ease-out
        hover:shadow-xl
        ${active ? 'hover:-translate-y-1 ring-3 ring-rose-400 shadow-lg scale-[1.01]' : 'hover:-translate-y-2'}
      `}
    >
      {children}

      <div className="mt-3 text-center">
        <div className="font-semibold text-sm">{title}</div>
        <div className="text-xs text-neutral-500">{sub}</div>
      </div>
    </button>
  );
}
