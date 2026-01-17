export default function NebulaLayer() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[1] pointer-events-none overflow-hidden"
    >
      <div className="nebula-base absolute inset-0" />
      <div className="nebula-fog nebula-fog-a absolute -inset-[20%]" />
      <div className="nebula-fog nebula-fog-b absolute -inset-[25%]" />
      <div className="nebula-noise absolute inset-0" />
    </div>
  );
}
