import { siteConfig } from '../../data/siteConfig';
import { useWhatsApp } from '../../hooks/useWhatsApp';
import Button from './Button';
import SocialIcon from './SocialIcon';

const DEFAULT_MESSAGE = `Hello ${siteConfig.brandName}, I would like to know more about your honey.`;

// A ready-made "Order on WhatsApp" button. Pass a custom message if needed.
function WhatsAppButton({
  label = 'Order on WhatsApp',
  message = DEFAULT_MESSAGE,
  variant = 'whatsapp',
  ...buttonProps
}) {
  const { openWhatsApp } = useWhatsApp();

  return (
    <Button variant={variant} onClick={() => openWhatsApp(message)} {...buttonProps}>
      <SocialIcon name="whatsapp" className="size-[18px]" />
      {label}
    </Button>
  );
}

export default WhatsAppButton;
