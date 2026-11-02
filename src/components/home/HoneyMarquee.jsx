import { products } from '../../data/products';

function Hexagon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 shrink-0 text-honey" aria-hidden="true">
      <path d="M12 2 21 7v10l-9 5-9-5V7z" fill="currentColor" />
    </svg>
  );
}

/*
  Slowly scrolling band of honey names under the hero (purely decorative).
  The list is repeated twice so the loop is seamless. Pauses on hover.
*/
function HoneyMarquee() {
  const names = products.map((product) => product.name);

  return (
    <div
      className="group overflow-hidden bg-forest py-5 text-warm-white sm:py-6"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {names.map((name) => (
              <li key={name} className="flex items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
                <span className="font-display text-2xl whitespace-nowrap italic sm:text-3xl">
                  {name}
                </span>
                <Hexagon />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default HoneyMarquee;
