import {
  Droplets,
  Flower2,
  Gift,
  Leaf,
  MessageCircle,
  Package,
  Search,
  ShoppingBag,
  Sparkles,
  Truck,
} from 'lucide-react';

/*
  Lets data files choose an icon by name, e.g. icon: 'Flower2'.
  To use a new icon, import it from lucide-react above and add it to this list.
*/
const iconsByName = {
  Droplets,
  Flower2,
  Gift,
  Leaf,
  MessageCircle,
  Package,
  Search,
  ShoppingBag,
  Sparkles,
  Truck,
};

function Icon({ name, ...props }) {
  const IconComponent = iconsByName[name] || Sparkles;
  return <IconComponent aria-hidden="true" {...props} />;
}

export default Icon;
