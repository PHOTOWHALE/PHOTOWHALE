import { Input as ShadcnInput } from '@/lib/shadcn/components/common/input';

export default function Input({ ...props }: React.ComponentProps<typeof ShadcnInput>) {
  return <ShadcnInput {...props} />;
}
