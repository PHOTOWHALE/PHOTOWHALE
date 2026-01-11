export async function replaceDataUrlImages(node: HTMLElement) {
  const imgs = Array.from(node.querySelectorAll('img'));
  const restores: Array<() => void> = [];

  await Promise.all(
    imgs.map(async img => {
      const src = img.getAttribute('src');
      if (!src || !src.startsWith('data:image')) return;

      const res = await fetch(src);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);

      const original = src;
      img.src = blobUrl;

      restores.push(() => {
        img.src = original;
        URL.revokeObjectURL(blobUrl);
      });
    }),
  );

  return () => restores.forEach(r => r());
}
