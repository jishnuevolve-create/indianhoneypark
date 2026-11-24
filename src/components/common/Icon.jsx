import {
  Award,
  Factory,
  FlaskConical,
  MessageCircle,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TreePine,
  Users,
} from 'lucide-react';

/*
  Lets data files choose an icon by name, e.g. icon: 'Search' (used by "How to Order").
  To use a new icon, import it from lucide-react (https://lucide.dev/icons) and add it below.
*/
const iconsByName = {
  Award,
  Factory,
  FlaskConical,
  ShieldCheck,
  TreePine,
  Users,
  MessageCircle,
  Search,
  ShoppingBag,
  Sparkles,
};

function Icon({ name, ...props }) {
  const IconComponent = iconsByName[name] || Sparkles;
  return <IconComponent aria-hidden="true" {...props} />;
}

export default Icon;
