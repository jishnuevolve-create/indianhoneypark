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

function FeatureIcon({ name, className = '' }) {
  const src = icons[name];
  if (!src) return null;
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

export default FeatureIcon;
