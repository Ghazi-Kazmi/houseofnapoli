export type MenuItem = {
  name: string
  slug: string
  price: number
  description: string
  calories?: string
  tag?: string
  /** Path under /public, e.g. `/images/menu/all-that-cheese.webp`. Omit until the asset is ready. */
  image?: string
}

export type MenuCategory = {
  id: string
  label: string
  italian: string
  intro: string
  /** When false, the visual stage is hidden (e.g. Extra Toppings). */
  showStage?: boolean
  items: MenuItem[]
}

export const menuNotice = 'All prices exclusive of GST. Calories are approximate per serving.'

function dish(
  name: string,
  slug: string,
  price: number,
  description: string,
  extras?: Pick<MenuItem, 'calories' | 'tag'> & { withImage?: boolean },
): MenuItem {
  const { withImage = true, ...rest } = extras ?? {}
  return {
    name,
    slug,
    price,
    description,
    ...rest,
    ...(withImage ? { image: `/images/menu/${slug}.webp` } : {}),
  }
}

export const menu: MenuCategory[] = [
  {
    id: 'classics',
    label: 'Wood-Fired Classics',
    italian: 'Le Classiche',
    intro: 'Vegetarian pizzas, hand-stretched and blistered in the brick oven.',
    showStage: true,
    items: [
      dish('All That Cheese', 'all-that-cheese', 1990, 'Mozzarella, ricotta and cottage cheese, topped with Parmesan.', {
        calories: '1050 kcal',
      }),
      dish(
        "Samarita's Margherita",
        'samaritas-margherita',
        1800,
        'Plain cheese with tomatoes, topped with basil and rocket leaves.',
        { calories: '850 kcal', tag: 'Signature' },
      ),
      dish(
        'Walk In The Woods',
        'walk-in-the-woods',
        2200,
        'Artichoke, mushroom and olives with rocket leaves and sun-dried tomatoes, topped with Parmesan.',
        { calories: '900 kcal' },
      ),
      dish('Spring Fling', 'spring-fling', 1400, 'Grilled aubergine and zucchini with fresh basil.', {
        calories: '750 kcal',
      }),
      dish('Sweet and Wild', 'sweet-and-wild', 1900, 'Onions, bell peppers, mushrooms and sweet corn.', {
        calories: '800 kcal',
      }),
      dish('Wilted Spinach', 'wilted-spinach', 1900, 'Roasted garlic and sautéed spinach.', {
        calories: '700 kcal',
      }),
    ],
  },
  {
    id: 'specialty',
    label: 'Specialty Pizzas',
    italian: 'Le Speciali',
    intro: 'Meat and seafood pizzas, finished over open flame.',
    showStage: true,
    items: [
      dish('Miss Pepperoni', 'miss-pepperoni', 1995, 'Beef pepperoni and mozzarella.', {
        calories: '950 kcal',
      }),
      dish(
        'Refined Bovine',
        'refined-bovine',
        2300,
        'Beef, green peppers, fresh basil, onions, olives, mozzarella and rocket.',
        { calories: '1050 kcal' },
      ),
      dish('Chicken On Fire', 'chicken-on-fire', 2150, 'Spicy chicken tikka, bell peppers and onions.', {
        calories: '980 kcal',
      }),
      dish('Fowl Play', 'fowl-play', 2150, 'Shredded chicken, olives, mushrooms and mozzarella.', {
        calories: '950 kcal',
      }),
      dish(
        'Smoking Hot',
        'smoking-hot',
        2200,
        'Tandoori chicken, bell peppers and onions with jalapeños.',
        { calories: '1000 kcal' },
      ),
      dish(
        'Smoke-Filled Oven',
        'smoke-filled-oven',
        3200,
        'Smoked salmon topped with onions, bell peppers and basil/rocket leaves.',
        { calories: '1050 kcal', tag: 'Chef' },
      ),
      dish(
        'Cosa Nostra',
        'cosa-nostra',
        2200,
        'Chicken, beef sausages, onions, bell peppers, mushrooms and olives.',
        { calories: '1100 kcal' },
      ),
      dish(
        'Pizza Alfredo',
        'pizza-alfredo',
        2300,
        'White sauce based crust with roasted chicken, onions, capsicum, mushrooms, olives and roasted garlic.',
        { calories: '1100 kcal' },
      ),
      dish(
        'Seafood Alfredo',
        'seafood-alfredo',
        3200,
        'White sauce based crust with a choice of prawns or smoked salmon, onions, capsicum, mushrooms and olives.',
        { calories: '1150 kcal' },
      ),
    ],
  },
  {
    id: 'antipasti',
    label: 'Starters',
    italian: 'Per Cominciare',
    intro: 'Garlic breads baked in our wood-burning brick oven.',
    showStage: true,
    items: [
      dish(
        'Garlic Bread',
        'garlic-bread',
        560,
        'French bread pasted with garlic butter, baked in our wood-burning brick oven.',
        { calories: '420 kcal', tag: '6 pcs' },
      ),
      dish(
        'Garlic Bread with Cheese',
        'garlic-bread-with-cheese',
        750,
        'French bread pasted with garlic butter, covered with cheddar cheese, baked in our wood-burning brick oven.',
        { calories: '650 kcal', tag: '6 pcs' },
      ),
      dish(
        'Loaded Garlic Bread',
        'loaded-garlic-bread',
        690,
        'Garlic butter and cheddar, topped with strips of beef pepperoni and black olive with a sprinkle of onions.',
        { calories: '720 kcal', tag: '4 pcs' },
      ),
    ],
  },
  {
    id: 'pasta',
    label: 'Pasta al Forno',
    italian: 'Dal Forno',
    intro: 'Brick oven pastas, baked until bubbling.',
    showStage: true,
    items: [
      dish(
        'Layers of Lasagne',
        'layers-of-lasagne',
        1895,
        'Homemade strips of pasta layered with beef Bolognese and béchamel sauce, with cheese.',
        { calories: '850 kcal' },
      ),
      dish(
        'Spaghetti Bolognese',
        'spaghetti-bolognese',
        1895,
        'Noodles tossed in meat sauce with a top layer of cheddar cheese, baked in our wood-fired brick oven.',
        { calories: '800 kcal' },
      ),
      dish('Mac and Cheese', 'mac-and-cheese', 1560, 'Boiled macaroni with creamy melted cheddar cheese.', {
        calories: '750 kcal',
      }),
      dish(
        'Chicken Ravioli',
        'chicken-ravioli',
        1560,
        'Chicken stuffed in pockets of pasta, covered with white or marinara sauce.',
        { calories: '780 kcal' },
      ),
      dish('Penne Arabiata', 'penne-arabiata', 1795, 'Penne in marinara sauce with sun-dried tomatoes.', {
        calories: '650 kcal',
      }),
      dish('Roman Chicken', 'roman-chicken', 1395, 'Green pasta with strips of chicken in white sauce.', {
        calories: '800 kcal',
      }),
      dish(
        'Fettuccine Alfredo',
        'fettuccine-alfredo',
        1395,
        'Fettuccine white pasta with mushrooms in white sauce.',
        { calories: '850 kcal' },
      ),
      dish('Chicken Stroganoff', 'chicken-stroganoff', 1590, 'A house favourite from the oven.', {
        calories: '900 kcal',
      }),
    ],
  },
  {
    id: 'calzoni',
    label: 'Calzones',
    italian: 'I Calzoni',
    intro: 'Folded, sealed and fired with oozing cheese.',
    showStage: true,
    items: [
      dish(
        'Cosa Nostra',
        'calzone-cosa-nostra',
        990,
        'Chicken, beef sausages, onions, bell peppers, mushrooms and olives with oozing mozzarella cheese.',
        { calories: '850 kcal' },
      ),
      dish(
        'Pollastro',
        'calzone-pollastro',
        990,
        'Roasted chicken, onions, capsicum, mushrooms, olives and roasted garlic with honey mustard sauce.',
        { calories: '820 kcal' },
      ),
      dish('Refined Bovine', 'calzone-refined-bovine', 990, 'Beef, green peppers, onions and mushrooms.', {
        calories: '850 kcal',
      }),
      dish(
        'Smoking Hot',
        'calzone-smoking-hot',
        990,
        'Tandoori chicken, bell peppers, onions with jalapeños, with melted cheddar cheese.',
        { calories: '800 kcal' },
      ),
    ],
  },
  {
    id: 'extras',
    label: 'Extra Toppings',
    italian: 'Aggiunte',
    intro: 'Make any pizza your own.',
    showStage: false,
    items: [
      dish('Cheese', 'cheese', 225, 'Mozzarella / Parmesan / Ricotta', { withImage: false }),
      dish(
        'Vegetables',
        'vegetables',
        180,
        'Olives / Mushrooms / Capers / Sun-dried Tomatoes / Cherry Tomatoes / Jalapeños',
        { withImage: false },
      ),
      dish('Meat', 'meat', 260, 'Chicken / Pepperoni / Sausages', { withImage: false }),
      dish('Seafood', 'seafood', 380, 'Smoked Salmon / Tuna', { withImage: false }),
    ],
  },
]

export function formatPrice(price: number) {
  return `Rs ${price.toLocaleString('en-IN')}`
}
