import { Layout } from '@/stores/useFrameStore';

interface Props {
  layout: Layout;
}

export default function FrameLayoutPreview({ layout }: Props) {
  const isGrid = layout === '2x2';
  const count = layout === '1x2' ? 2 : layout === '1x3' ? 3 : 4;

  return (
    <div className="rounded-xl bg-white p-3 shadow-sm">
      <div className="rounded-lg bg-violet-50 p-3">
        <div className={isGrid ? 'grid grid-cols-2 gap-2' : 'flex flex-col gap-2'}>
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className={`
                bg-neutral-300/70 rounded-md
                ${isGrid ? 'aspect-square' : 'aspect-[3/2]'}
              `}
            />
          ))}
        </div>

        <div className="mt-2 text-center text-[10px] text-neutral-400">Time Film</div>
      </div>
    </div>
  );
}
