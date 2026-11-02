import { useCallback } from 'react';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { useToast } from './useToast';

/*
  Opens WhatsApp with a pre-filled message for the customer to review and send.
  Returns true if WhatsApp was opened. Opening WhatsApp does NOT mean the order is placed —
  the customer still has to press send, and the team confirms the order in the chat.
*/
export function useWhatsApp() {
  const { showToast } = useToast();

  const openWhatsApp = useCallback(
    (message) => {
      const whatsappUrl = buildWhatsAppUrl(message);

      if (!whatsappUrl) {
        showToast(
          'WhatsApp ordering is not set up yet. Please try again later or use our Contact page.',
          'error',
        );
        return false;
      }

      const newWindow = window.open(whatsappUrl, '_blank');
      if (newWindow) {
        newWindow.opener = null; // security: the WhatsApp tab cannot control this page
      } else {
        // Some browsers block pop-ups; fall back to opening in the same tab.
        window.location.href = whatsappUrl;
      }
      return true;
    },
    [showToast],
  );

  return { openWhatsApp };
}
