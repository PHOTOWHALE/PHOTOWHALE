import { Input as ShadcnInput } from '@/lib/shadcn/components/ui/input';
import { cn } from '@/lib/utils';

export default function Input({ className, ...props }: React.ComponentProps<typeof ShadcnInput>) {
  const baseStyle = 'border-gray-400 placeholder:text-gray-500 focus-visible:ring-1';
  return <ShadcnInput {...props} className={cn(baseStyle, className)} />;
}
