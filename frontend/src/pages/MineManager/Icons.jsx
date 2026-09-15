const paths = {
  arrow: "M5 12h14m-6-6 6 6-6 6",
  bars: "M5 20V10m7 10V4m7 16v-7",
  bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4",
  calendar: "M5 4h14v16H5zM8 2v4m8-4v4M5 9h14",
  check: "m5 12 4 4L19 6",
  chevron: "m6 9 6 6 6-6",
  doc: "M6 3h9l3 3v15H6zM9 12h6m-6 4h6",
  expand: "M8 3H3v5m13-5h5v5M8 21H3v-5m18 0v5h-5",
  file: "M6 3h9l3 3v15H6zM15 3v4h4",
  gear: "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM19 12l-2-1 2-3-2-1a7 7 0 0 0-2-1l-.5-2h-3l-.5 2a7 7 0 0 0-2 1L7 8l-2 3 2 1v2l-2 1 2 3 2-1a7 7 0 0 0 2 1l.5 2h3l.5-2a7 7 0 0 0 2-1l2 1 2-3-2-1z",
  home: "m3 11 9-8 9 8v9H3zM9 20v-6h6v6",
  leaf: "M20 4C10 4 4 9 4 17c0 2 1 3 3 3 8 0 13-6 13-16ZM4 20c3-5 7-8 12-10",
  map: "M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15m6-12v15",
  moon: "M20 15.5A8 8 0 0 1 8.5 4 8 8 0 1 0 20 15.5Z",
  people:
    "M16 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1m7-9a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm6-7a4 4 0 0 1 0 8m1 4h1a4 4 0 0 1 4 4v1",
  refresh:
    "M20 11a8 8 0 0 0-14-4L3 10m0-5v5h5M4 13a8 8 0 0 0 14 4l3-3m0 5v-5h-5",
  signal: "M4 19v-2m4 2v-5m4 5V9m4 10V6m4 13V3",
  shield: "M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4",
  sun: "M12 3V1m0 22v-2M4.2 4.2 2.8 2.8m18.4 18.4-1.4-1.4M3 12H1m22 0h-2M4.2 19.8l-1.4 1.4M21.2 2.8l-1.4 1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
};

export default function Icon({ name, size = 18, strokeWidth = 1.8 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.check} />
    </svg>
  );
}
