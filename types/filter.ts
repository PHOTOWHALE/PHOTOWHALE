interface FilterItem {
  id: string;
  label: string;
  className: string;
}

export const FILTERS: FilterItem[] = [
  { id: 'none', label: 'default', className: '' },
  { id: 'grayscale', label: 'grayscale', className: 'grayscale' },
  { id: 'sepia', label: 'sepia', className: 'sepia' },
  { id: 'saturate', label: 'saturate', className: 'saturate-150' },
  { id: 'contrast', label: 'contrast', className: 'contrast-125' },
  { id: 'brightness', label: 'brightness', className: 'brightness-125' },
  { id: 'invert', label: 'invert', className: 'invert' },
  { id: 'hue-rotate', label: 'hue-rotate', className: 'hue-rotate-90' },
  { id: 'sepia-contrast', label: 'sepia-contrast', className: 'sepia contrast-125' },
  { id: 'vintage', label: 'vintage', className: 'sepia brightness-110 contrast-90' },
  { id: 'cool-tone', label: 'cool-tone', className: 'brightness-110 contrast-90 hue-rotate-180' },
];
