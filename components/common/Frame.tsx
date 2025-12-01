export default function Frame({ code }: { code: string }) {
  switch (code) {
    case '1':
      return <div>Frame 1*2</div>;
    case '2':
      return <div>Frame 1*3</div>;
    case '3':
      return <div>Frame 1*4</div>;
    case '4':
      return <div>Frame 2*2</div>;
    default:
      return <div>No frame selected</div>;
  }
}
