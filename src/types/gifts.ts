import { Award, Gift, Package, LucideIcon } from 'lucide-react';

export interface GiftOption {
  id: 'free' | 'hat' | 'wrap-box';
  name: string;
  description: string;
  price: number;
  priceLabel: string;
  icon?: LucideIcon;
  emoji?: string;
}

export const GIFT_OPTIONS: GiftOption[] = [
  {
    id: 'free',
    name: 'Calltime Pro',
    description: '60 days free access',
    price: 0,
    priceLabel: 'Free',
    icon: Award
  },
  {
    id: 'hat',
    name: 'HOURS ON SET HAT',
    description: 'Hat with embroidered stats',
    price: 19,
    priceLabel: '$19',
    emoji: '🧢'
  },
  {
    id: 'wrap-box',
    name: 'Wrap Box',
    description: 'Exclusive wrap box collection',
    price: 599.99,
    priceLabel: '$599.99',
    icon: Package
  }
];

export interface CollaboratorGift {
  collaboratorName: string;
  giftOptionId: GiftOption['id'];
}
