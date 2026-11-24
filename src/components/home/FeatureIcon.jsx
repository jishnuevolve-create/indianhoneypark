import { withBase } from '../../utils/assetUrl';

/*
  Realistic 3D icons for the "We Provide The Best Quality" cards.
  The images live in public/images/features/ (transparent PNGs).
  To use one, set `icon` in homeContent.js -> whyChooseUsContent to one of the names below.
  To replace an icon, save a new transparent PNG with the same file name.
*/

const icons = {
  varieties: '/images/features/varieties.png', // honeycomb with dripping honey
  flavours: '/images/features/flavours.png', // wooden honey dipper
  packaging: '/images/features/packaging.png', // honey jar
  whatsapp: '/images/features/whatsapp.png', // WhatsApp chat bubble
};

// Icons whose blank label gets the Indian Honey logo placed on top.
// left / top / size are percentages of the icon, centred on the label.
const logoOnLabel = {
  packaging: { left: 50, top: 54, size: 28 },
};

function FeatureIcon({ name, className = '' }) {
  const src = icons[name];
  if (!src) return null;

  const image = (
    <img
      src={withBase(src)}
      alt=""
      width="200"
      height="200"
      loading="lazy"
      decoding="async"
      className={logoOnLabel[name] ? 'size-full object-contain' : className}
    />
  );

  const logo = logoOnLabel[name];
  if (!logo) return image;

  return (
    <span className={`relative inline-block ${className}`}>
      {image}
      <img
        src={withBase('/images/logo/indian-honey-logo.png')}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute -translate-x-1/2 -translate-y-1/2 object-contain"
        style={{
          left: `${logo.left}%`,
          top: `${logo.top}%`,
          width: `${logo.size}%`,
          height: `${logo.size}%`,
        }}
      />
    </span>
  );
}

export default FeatureIcon;
