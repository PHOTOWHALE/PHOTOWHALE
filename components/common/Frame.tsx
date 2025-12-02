export default function Frame({ code }: { code: string }) {
  switch (code) {
    case '1':
      return <div className="w-65 h-100 bg-gray-500">Frame 1*2</div>;
    case '2':
      return <div className="w-65 h-150 bg-gray-500">Frame 1*3</div>;
    case '3':
      return <div className="w-65 h-200 bg-gray-500">Frame 1*4</div>;
    case '4':
      return <div className="w-100 h-150 bg-gray-500">Frame 2*2</div>;
    default:
      return <div>No frame selected</div>;
  }
}
