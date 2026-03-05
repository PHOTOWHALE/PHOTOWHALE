interface FilterItem {
  id: string;
  label: string;
  className: string;
}

export const FILTERS: FilterItem[] = [
  { id: 'none', label: 'Default', className: '' },
  {
    id: 'Cool',
    label: 'Cool',
    className: 'brightness-[1.03] contrast-[0.95] saturate-[1.05] hue-rotate-[5deg]',
  },
  {
    id: 'Fade',
    label: 'Fade',
    className: 'brightness-[1.1] contrast-[0.95] saturate-[0.9] sepia-[0.15]',
  },
  { id: 'Fog', label: 'Fog', className: 'brightness-[1.05] contrast-[0.85] saturate-[0.95]' },
  {
    id: 'Fuji',
    label: 'Fuji',
    className: 'brightness-[1.02] contrast-[1.15] saturate-[0.8] hue-rotate-[-5deg]',
  },
  {
    id: 'Milky',
    label: 'Milky',
    className: 'brightness-[1.05] contrast-[0.9] saturate-[1.15] sepia-[0.12] hue-rotate-[-5deg]',
  },
  {
    id: 'Mood',
    label: 'Mood',
    className: 'brightness-[0.98] contrast-[1.2] saturate-[0.9] hue-rotate-[-8deg]',
  },
  { id: 'Mono', label: 'Mono', className: 'grayscale contrast-[1.25] brightness-[1.05]' },
  {
    id: 'Natural',
    label: 'Natural',
    className: 'brightness-[1.05] contrast-[1.05] saturate-[1.02]',
  },
  { id: 'Pure', label: 'Pure', className: 'brightness-[1.06] contrast-[0.92] saturate-[1.05]' },
  {
    id: 'Soft',
    label: 'Soft',
    className: 'brightness-[1.1] contrast-[0.85] saturate-[1.1] sepia-[0.05]',
  },
  {
    id: 'Sunny',
    label: 'Sunny',
    className: 'brightness-[1.05] contrast-[1.02] saturate-[1.1] sepia-[0.1]',
  },
  {
    id: 'Vintage',
    label: 'Vintage',
    className: 'brightness-[1.05] contrast-[1.1] saturate-[0.9] sepia-[0.25]',
  },
];
