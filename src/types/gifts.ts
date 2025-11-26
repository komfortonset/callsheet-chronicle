export interface GiftOption {
  id: 'free' | 'hat' | 'wrap-box';
  name: string;
  description: string;
  price: number;
  priceLabel: string;
}

export const GIFT_OPTIONS: GiftOption[] = [
  {
    id: 'free',
    name: 'Thank You Card',
    description: 'Digital thank you card',
    price: 0,
    priceLabel: 'Free'
  },
  {
    id: 'hat',
    name: 'Calltime Hat',
    description: 'Premium branded hat',
    price: 19,
    priceLabel: '$19'
  },
  {
    id: 'wrap-box',
    name: 'Wrap Box',
    description: 'Exclusive wrap box collection',
    price: 599.99,
    priceLabel: '$599.99'
  }
];

export interface CollaboratorGift {
  collaboratorName: string;
  giftOptionId: GiftOption['id'];
}
