import { Textarea } from '@/lib/shadcn/components/common/textarea';
import { cn } from '@/lib/utils';

export default function TextArea({ className, ...props }: React.ComponentProps<typeof Textarea>) {
  const baseStyle =
    'border-gray-400 placeholder:text-gray-500 focus-visible:ring-1 field-sizing-fixed resize-none';
  return <Textarea className={cn(baseStyle, className)} {...props} />;
}
