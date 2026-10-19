export const CHRISTMAS_PACK_PRICE = 20;

export const COLOR_OPTIONS = [
  { id: 'red', name: 'Red', price: 0, image: '/assets/colors/red.webp', hex: '#C51111' },
  { id: 'blue', name: 'Blue', price: 0, image: '/assets/colors/blue.webp', hex: '#132ED1' },
  { id: 'green', name: 'Green', price: 0, image: '/assets/colors/green.webp', hex: '#117F2D' },
  { id: 'pink', name: 'Pink', price: 0, image: '/assets/colors/pink.webp', hex: '#ED54BA' },
  { id: 'orange', name: 'Orange', price: 0, image: '/assets/colors/orange.webp', hex: '#EF7D0D' },
  { id: 'yellow', name: 'Yellow', price: 0, image: '/assets/colors/yellow.webp', hex: '#F5F557' }
];

export const HAT_OPTIONS = [
  { id: 'none', name: 'None', price: 0, image: null, requiresChristmas: false },
  { id: 'cheese', name: 'Bein Cheesy', price: 10, image: '/assets/hats/cheese.webp', requiresChristmas: false, 
    style: { bottom: '175px', left: '50%', transform: 'translateX(-40%)' }
  },
  { id: 'crown', name: 'Crowned', price: 25, image: '/assets/hats/crown.webp', requiresChristmas: false,
    style: { bottom: '175px', left: '50%', transform: 'translateX(-65%)' }
  },
  { id: 'halo', name: 'Innocence', price: 20, image: '/assets/hats/halo.webp', requiresChristmas: false,
    style: { bottom: '215px', left: '50%', transform: 'translateX(-50%)' }
  },
  { id: 'santa hat', name: 'Presents Dude', price: 5, image: '/assets/hats/santa_hat.webp', requiresChristmas: true,
    style: { bottom: '155px', left: '50%', transform: 'translateX(-50%)' }
  }
];

export const SKIN_OPTIONS = [
  { id: 'none', name: 'None', price: 0, image: null, requiresChristmas: false },
  { id: 'scientist', name: 'Scientist', price: 10, image: '/assets/skins/scientist.webp', requiresChristmas: false,
    style: { bottom: '20px',left: '50%', transform: 'translateX(-42%)', width: '115px' }
  },
  { id: 'business suit', name: 'Business Suit', price: 15, image: '/assets/skins/business_suit.webp', requiresChristmas: false,
    style: { bottom: '20px',left: '50%', transform: 'translateX(-42%)', width: '115px' }
  },
  { id: 'business skirt', name: 'Business Skirt', price: 15, image: '/assets/skins/business_skirt.webp', requiresChristmas: false,
    style: { bottom: '20px',left: '50%', transform: 'translateX(-42%)', width: '115px' }
  },
  { id: 'santa suit', name: "Heeeere's Santa!", price: 5, image: '/assets/skins/santa_suit.webp', requiresChristmas: true,
    style: { bottom: '20px',left: '50%', transform: 'translateX(-45%)', width: '140px' }
  }
];

export const VISOR_OPTIONS = [
  { id: 'none', name: 'None', price: 0, image: null, requiresChristmas: false },
  { id: 'angry', name: 'a n g e r y', price: 5, image: '/assets/visors/angry.webp', requiresChristmas: false,
    style: { bottom: '155px', left: '50%', transform: 'translateX(-15%)' }
  },
  { id: 'shades', name: 'Shades', price: 10, image: '/assets/visors/shades.webp', requiresChristmas: false,
    style: { bottom: '130px', left: '50%', transform: 'translateX(-40%)' }
  },
  { id: 'happy', name: 'Happeh', price: 5, image: '/assets/visors/happy.webp', requiresChristmas: false,
    style: { bottom: '145px', left: '50%' }
  },
  { id: "Santa's beard", name: "Santa's Beard", price: 5, image: '/assets/visors/santa_beard.webp', requiresChristmas: true,
    style: { bottom: '60px', left: '50%', transform: 'translateX(-25%)' }
  }
];