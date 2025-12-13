'use client';

import { useRouter } from 'next/navigation';
import { useFrameStore, Layout } from '@/stores/useFrameStore';
import FrameLayoutCard from './FrameLayoutCard';
import FrameLayoutPreview from './FrameLayoutPreview';

const LAYOUTS: { id: Layout; title: string; sub: string }[] = [
  { id: '1x4', title: 'Layout A', sub: '4 Pose' },
  { id: '1x3', title: 'Layout B', sub: '3 Pose' },
  { id: '1x2', title: 'Layout C', sub: '2 Pose' },
  { id: '2x2', title: 'Layout D', sub: '4 Pose' },
];

export default function FrameLayoutGrid() {
  const router = useRouter();
  const layout = useFrameStore(state => state.layout);
  const setLayout = useFrameStore(state => state.setLayout);

  const handlePick = (next: Layout) => {
    setLayout(next);
    router.push('/frame/view');
  };

  return (
    <div className="grid grid-cols-2 gap-6 w-full max-w-[380px]">
      {LAYOUTS.map(item => (
        <FrameLayoutCard
          key={item.id}
          active={layout === item.id}
          title={item.title}
          sub={item.sub}
          onClick={() => handlePick(item.id)}
        >
          <FrameLayoutPreview layout={item.id} />
        </FrameLayoutCard>
      ))}
    </div>
  );
}
