/*
  Hand-drawn style icons for the "We Provide The Best Quality" cards.
  Outlines use the current text colour; the honey-gold accents use --color-honey.
  To use one, set `icon` in homeContent.js -> whyChooseUsContent to one of the names below.
*/

const outline = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};
const honey = 'var(--color-honey)';

// Flat-topped hexagon (same shape as the logo) centred on x, y.
function hexagonPath(x, y, radius) {
  const h = radius * 0.866;
  return `M${x - radius} ${y} L${x - radius / 2} ${y - h} L${x + radius / 2} ${y - h} L${x + radius} ${y} L${x + radius / 2} ${y + h} L${x - radius / 2} ${y + h} Z`;
}

const icons = {
  // Honeycomb: three cells, one filled with honey that drips
  varieties: (
    <>
      <path d={hexagonPath(30.5, 22.5, 9.5)} fill={honey} fillOpacity="0.9" stroke="none" />
      <path d={hexagonPath(16.25, 14.3, 9.5)} {...outline} />
      <path d={hexagonPath(30.5, 22.5, 9.5)} {...outline} />
      <path d={hexagonPath(16.25, 30.7, 9.5)} {...outline} />
      <path
        d="M32.8 30.8c0 3.2-1.9 4.5-1.9 7a1.9 1.9 0 0 0 3.8 0c0-2.5-1.9-3.8-1.9-7Z"
        fill={honey}
      />
    </>
  ),

  // Honey dipper with a drop falling from it
  flavours: (
    <>
      <g transform="rotate(-30 24 24)">
        <path d="M24 1v13" {...outline} />
        <rect x="16" y="14" width="16" height="23" rx="7" fill={honey} fillOpacity="0.9" />
        <rect x="16" y="14" width="16" height="23" rx="7" {...outline} />
        <path d="M16.4 20h15.2M16 25.5h16M16.4 31h15.2" {...outline} />
      </g>
      <path
        d="M31 37.5c0 3-2.3 4.4-2.3 6.6a2.3 2.3 0 0 0 4.6 0c0-2.2-2.3-3.6-2.3-6.6Z"
        fill={honey}
      />
    </>
  ),

  // Honey jar with lid, honey level and a label
  packaging: (
    <>
      <path d="M12 27h24v9a7 7 0 0 1-7 7h-10a7 7 0 0 1-7-7Z" fill={honey} fillOpacity="0.9" />
      <rect x="15" y="6" width="18" height="6" rx="2" {...outline} />
      <path
        d="M17 12v2.5c-3.2.8-5 3.4-5 6.5v15a7 7 0 0 0 7 7h10a7 7 0 0 0 7-7V21c0-3.1-1.8-5.7-5-6.5V12"
        {...outline}
      />
      <rect x="17.5" y="24" width="13" height="10" rx="2" fill="var(--color-warm-white)" />
      <rect x="17.5" y="24" width="13" height="10" rx="2" {...outline} />
      <path d={hexagonPath(24, 29, 2.6)} {...outline} strokeWidth="1.4" />
    </>
  ),

  // Chat bubble with a phone handset: ordering on WhatsApp
  whatsapp: (
    <>
      <path d="M8.5 39.5l2.4-7.2A15.5 15.5 0 1 1 17 38.1Z" {...outline} />
      <path
        d="M30.4 27.8l-2.6-.9a1.6 1.6 0 0 0-1.6.4l-1 1a11 11 0 0 1-4.5-4.5l1-1a1.6 1.6 0 0 0 .4-1.6l-.9-2.6a1.6 1.6 0 0 0-1.5-1.1h-1.8a1.6 1.6 0 0 0-1.6 1.8 15.6 15.6 0 0 0 13.6 13.6 1.6 1.6 0 0 0 1.8-1.6v-1.8a1.6 1.6 0 0 0-1.3-1.7Z"
        fill={honey}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
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
