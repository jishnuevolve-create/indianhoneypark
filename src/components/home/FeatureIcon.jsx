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
// fit: how much of the icon box the picture fills (the jar fills its picture edge to edge,
// so it is shrunk to look the same size as the other icons).
// left / top / size: percentages of the picture, centred on the label.
const logoOnLabel = {
  packaging: { fit: 94, left: 50, top: 54, size: 28 },
};

function FeatureIcon({ name, className = '' }) {
  const src = icons[name];
  if (!src) return null;

  const logo = logoOnLabel[name];
  if (!logo) {
    return (
      <img
        src={withBase(src)}
        alt=""
        width="200"
        height="200"
        loading="lazy"
        decoding="async"
        className={className}
      />
    );
  }

  const inset = (100 - logo.fit) / 2;
  return (
    <span className={`relative block shrink-0 ${className}`}>
      <span
        className="absolute block"
        style={{
          left: `${inset}%`,
          top: `${inset}%`,
          width: `${logo.fit}%`,
          height: `${logo.fit}%`,
        }}
      >
        <img
          src={withBase(src)}
          alt=""
          width="200"
          height="200"
          loading="lazy"
          decoding="async"
          className="block"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
        <img
          src={withBase('/images/logo/indian-honey-logo.png')}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute"
          style={{
            left: `${logo.left}%`,
            top: `${logo.top}%`,
            width: `${logo.size}%`,
            height: `${logo.size}%`,
            transform: 'translate(-50%, -50%)',
            objectFit: 'contain',
          }}
        />
      </span>
    </span>
  );
}

export default FeatureIcon;
