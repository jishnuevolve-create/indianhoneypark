/*
  The heading used at the top of every section, so they all look the same:
  a handwritten label (eyebrow), a Fraunces heading and an optional description.
  tone="light" is for dark backgrounds.
*/
function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'dark',
  titleAs: TitleTag = 'h2',
  id,
  className = '',
}) {
  const isCentered = align === 'center';
  const isOnDarkBackground = tone === 'light';

  return (
    <div className={`${isCentered ? 'mx-auto max-w-3xl text-center' : 'max-w-xl'} ${className}`}>
      {eyebrow && (
        <p
          className={`mb-2 font-script text-2xl sm:text-3xl ${
            isOnDarkBackground ? 'text-honey' : 'text-amber'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <TitleTag
        id={id}
        className={`text-[2rem] sm:text-5xl lg:text-[3.25rem] ${
          isOnDarkBackground ? 'text-warm-white' : 'text-ink'
        }`}
      >
        {title}
      </TitleTag>
      {description && (
        <p
          className={`mt-5 text-base sm:text-lg ${
            isCentered ? 'mx-auto max-w-xl' : ''
          } ${isOnDarkBackground ? 'text-warm-white/70' : 'text-ink-soft'}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
