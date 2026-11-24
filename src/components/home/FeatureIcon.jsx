/*
  Illustrated icons for the "We Provide The Best Quality" cards.
  Each one is a small coloured illustration: glossy honey gradients, wooden browns and soft
  highlights, with outlines in the current text colour.
  To use one, set `icon` in homeContent.js -> whyChooseUsContent to one of the names below.
*/

const outline = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};
const gloss = '#FFFFFF';

// Gradients shared by the icons (ids are prefixed so they never clash with other SVGs on the page).
function Gradients() {
  return (
    <defs>
      <linearGradient id="fi-honey" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFD35A" />
        <stop offset="0.55" stopColor="#F4A91F" />
        <stop offset="1" stopColor="#D9780B" />
      </linearGradient>
      <linearGradient id="fi-honey-light" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFE9A8" />
        <stop offset="1" stopColor="#FBC945" />
      </linearGradient>
      <linearGradient id="fi-wood" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#B87333" />
        <stop offset="0.5" stopColor="#D9954F" />
        <stop offset="1" stopColor="#A5622B" />
      </linearGradient>
      <linearGradient id="fi-lid" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#9A5A22" />
        <stop offset="0.45" stopColor="#CC8A45" />
        <stop offset="1" stopColor="#8A4E1D" />
      </linearGradient>
    </defs>
  );
}

// Flat-topped hexagon (same shape as the logo) centred on x, y.
function hexagonPath(x, y, radius) {
  const h = radius * 0.866;
  return `M${x - radius} ${y} L${x - radius / 2} ${y - h} L${x + radius / 2} ${y - h} L${x + radius} ${y} L${x + radius / 2} ${y + h} L${x - radius / 2} ${y + h} Z`;
}

// A honeycomb cell: wax rim plus an optional honey fill and a shine.
function Cell({ x, y, fill }) {
  return (
    <g>
      {fill && <path d={hexagonPath(x, y, 7.1)} fill={fill} />}
      <path d={hexagonPath(x, y, 7.1)} {...outline} strokeWidth="1.5" />
      {fill && (
        <path
          d={`M${x - 3.6} ${y - 1.2} L${x - 1.7} ${y - 4.4}`}
          stroke={gloss}
          strokeOpacity="0.75"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      )}
    </g>
  );
}

const icons = {
  // Honeycomb: a cluster of cells, some brimming with honey, one dripping
  varieties: (
    <>
      <Gradients />
      <Cell x={24} y={24} fill="url(#fi-honey)" />
      <Cell x={24} y={11} fill="url(#fi-honey-light)" />
      <Cell x={35.3} y={17.5} />
      <Cell x={12.7} y={17.5} fill="url(#fi-honey-light)" />
      <Cell x={12.7} y={30.5} />
      <Cell x={35.3} y={30.5} fill="url(#fi-honey)" />
      <Cell x={24} y={37} fill="url(#fi-honey)" />
      <path
        d="M24 42.5c0 2.4-1.7 3.4-1.7 5a1.7 1.7 0 0 0 3.4 0c0-1.6-1.7-2.6-1.7-5Z"
        fill="url(#fi-honey)"
        stroke="currentColor"
        strokeWidth="1"
      />
    </>
  ),

  // Wooden honey dipper loaded with honey, a thread of honey falling to a drop
  flavours: (
    <>
      <Gradients />
      <g transform="rotate(-28 24 22)">
        {/* handle */}
        <rect x="22.2" y="1" width="3.6" height="14" rx="1.8" fill="url(#fi-wood)" />
        <rect x="22.2" y="1" width="3.6" height="14" rx="1.8" {...outline} strokeWidth="1.3" />
        {/* grooved head */}
        <rect x="15.5" y="14" width="17" height="22" rx="7.5" fill="url(#fi-honey)" />
        <path d="M16 20.5h16M15.6 26h16.8M16 31.5h16" {...outline} strokeWidth="1.5" />
        <rect x="15.5" y="14" width="17" height="22" rx="7.5" {...outline} />
        <path
          d="M19 18.5v3.6"
          stroke={gloss}
          strokeOpacity="0.7"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>
      {/* thread and drop */}
      <path
        d="M30.6 38c-.3 3.2.2 5-.1 6.4"
        stroke="#E8921A"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M30.4 41.2c0 2.6-2.2 3.8-2.2 5.6a2.2 2.2 0 0 0 4.4 0c0-1.8-2.2-3-2.2-5.6Z"
        fill="url(#fi-honey)"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <ellipse cx="12" cy="43.5" rx="5.5" ry="1.6" fill="url(#fi-honey-light)" opacity="0.9" />
    </>
  ),

  // Glossy honey jar with a wooden lid and a hexagon label
  packaging: (
    <>
      <Gradients />
      {/* jar body */}
      <path
        d="M14 15.5c-3 .9-5 3.5-5 6.8V37a7.5 7.5 0 0 0 7.5 7.5h15A7.5 7.5 0 0 0 39 37V22.3c0-3.3-2-5.9-5-6.8Z"
        fill="#FFF3D1"
      />
      <path d="M9 28h30v9a7.5 7.5 0 0 1-7.5 7.5h-15A7.5 7.5 0 0 1 9 37Z" fill="url(#fi-honey)" />
      <path
        d="M14 15.5c-3 .9-5 3.5-5 6.8V37a7.5 7.5 0 0 0 7.5 7.5h15A7.5 7.5 0 0 0 39 37V22.3c0-3.3-2-5.9-5-6.8"
        {...outline}
      />
      {/* wooden lid */}
      <rect x="13" y="6" width="22" height="8.5" rx="2.4" fill="url(#fi-lid)" />
      <rect x="13" y="6" width="22" height="8.5" rx="2.4" {...outline} />
      <path
        d="M16 9.5h16"
        stroke={gloss}
        strokeOpacity="0.45"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      {/* label */}
      <rect x="15.5" y="24" width="17" height="12.5" rx="2.5" fill="#FFF9EF" />
      <rect x="15.5" y="24" width="17" height="12.5" rx="2.5" {...outline} strokeWidth="1.4" />
      <path
        d={hexagonPath(24, 30.2, 3.6)}
        fill="url(#fi-honey)"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* glass shine */}
      <path
        d="M12.5 22v9"
        stroke={gloss}
        strokeOpacity="0.85"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  ),

  // Honey-coloured chat bubble with a phone handset: order on WhatsApp
  whatsapp: (
    <>
      <Gradients />
      <path d="M7.5 41.5l2.6-8A17 17 0 1 1 17 39Z" fill="url(#fi-honey)" />
      <path d="M7.5 41.5l2.6-8A17 17 0 1 1 17 39Z" {...outline} />
      <path
        d="M14 13.5a15 15 0 0 1 12-3.2"
        stroke={gloss}
        strokeOpacity="0.7"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M31.2 28.4l-2.8-1a1.7 1.7 0 0 0-1.7.4l-1.1 1.1a11.6 11.6 0 0 1-4.8-4.8l1.1-1.1a1.7 1.7 0 0 0 .4-1.7l-1-2.8a1.7 1.7 0 0 0-1.6-1.1h-1.9a1.7 1.7 0 0 0-1.7 1.9 16.5 16.5 0 0 0 14.4 14.4 1.7 1.7 0 0 0 1.9-1.7v-1.9a1.7 1.7 0 0 0-1.4-1.7Z"
        fill="#FFF9EF"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* sparkle */}
      <path d="M39 6v7M35.5 9.5h7" stroke="#E8921A" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
};

function FeatureIcon({ name, className = '' }) {
  const icon = icons[name];
  if (!icon) return null;
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      {icon}
    </svg>
  );
}

export default FeatureIcon;
