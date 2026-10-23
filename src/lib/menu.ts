export type MenuItem = { name: string; price: number };
export type MenuCategory = { id: string; title: string; items: MenuItem[] };

const c = (title: string, items: [string, number][]): MenuCategory => ({
  id: title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  title,
  items: items.map(([name, price]) => ({ name, price })),
});

export const MENU: MenuCategory[] = [
  c("Coffee & Chocolate", [["Black Coffee", 40], ["Milk Coffee", 50], ["Espresso 2X", 100], ["Americano", 110], ["Latte", 120], ["Mocha", 130], ["Cream Caramel", 75], ["Hot Chocolate", 85]]),
  c("Iced Coffee", [["Iced Americano", 120], ["Iced Latte", 130], ["Iced Mocha", 135], ["Iced Caramel Latte", 135], ["Iced Spanish Latte", 135], ["Coffee Date", 135], ["Honey Cinnamon Latte", 135], ["Iced Biscoff", 150], ["Cocoa Strawberry Milk", 150], ["Iced Oreo Cocoa Milk", 150]]),
  c("Hot Tea", [["Black Tea", 15], ["Milk Tea", 18], ["Masala Milk Tea", 20], ["Lemon Tea", 25], ["Darjeeling 2nd Flush", 25], ["Green Tea", 30], ["Earl Grey", 30], ["Siuli Tea", 35], ["Darjeeling 1st Flush", 35], ["Moringa Green Tea", 45], ["Blue Pea Tea", 45], ["Peach Tea", 45], ["Mango Tea", 45], ["Kashmiri Kawa", 45], ["Hibiscus Tea", 45], ["Chamomile Tea", 45]]),
  c("Iced Tea", [["Lemon Iced Tea", 75], ["Iced Earl Grey", 75], ["Peach Iced Tea", 85], ["Sital Siuli", 75], ["Hibiscus Honey Lemon", 85], ["Blue Pea Honey Lemon", 85]]),
  c("Big Meals", [["White Sauce Pasta — Veg", 230], ["White Sauce Pasta — Non-Veg", 260], ["Chilli Garlic Pasta", 265], ["Aglio-O-Olio", 250], ["Goichujang Chicken", 250], ["Hot Honey BBQ Chicken", 260], ["Hot Nashville Tenders", 270], ["Chicken Popcorns", 200], ["Korean Ramen", 175], ["Miso Ramen", 210], ["Spicy Chicken Ramen", 225], ["Coconut Chilli Ramen", 250], ["Chicken Kimbap", 250], ["Chicken Sausage Kimbap", 245], ["Crab Kimbap", 260], ["Tuna Kimbap", 270], ["Protein Platter", 299], ["Chicken Quesadilla", 180]]),
  c("Bread & Buns", [["Creamy Mushroom Toast", 85], ["Scrambled Egg Toast", 75], ["Whipped Beet Toast", 85], ["French Toast", 85], ["Cocoa French Toast", 100], ["Banana Peanut Butter Toast", 80], ["Egg Salami Sandwich", 135], ["Paneer Mushroom Sandwich", 130], ["Grilled Cheese Sandwich", 85], ["Chicken Loaded Sandwich", 165], ["Chicken Katsu Sandwich", 160], ["Chicken Melt Sandwich", 175]]),
  c("Omelettes", [["Spinach Mushroom Omelette with Toast", 100], ["Salami Cheese Omelette with Toast", 120]]),
  c("Burgers", [["Velociraptor Burger", 169], ["T-Rex Burger", 199], ["Titanosauras Burger", 249]]),
  c("Salads", [["Grilled Chicken Salad", 250], ["Black Bean Salad", 150], ["Chicken Salad w/ Nachos", 250]]),
  c("Fries", [["Peri Peri Fries", 75], ["Fries w/ Sweet Chilli Sauce", 80], ["Loaded Fries", 175]]),
  c("Shakes & Smoothies", [["Strawberry Milkshake", 150], ["Vanilla Milkshake", 150], ["Oreo Milkshake", 150], ["Chocolate Milkshake", 150], ["Chocolate Date Smoothie", 160], ["Oatmeal Banana Smoothie", 160], ["Apple Oat Smoothie", 160], ["Gain Some Energy Smoothie", 160]]),
  c("Refreshers", [["Strawberry Fizz", 85], ["Coffee Cloud", 120], ["Hibiscus Cloud", 120], ["Into The Blues", 120], ["Lemon Soda", 65], ["Mint Lemonade", 65], ["Honey Ginger Lemon", 65]]),
  c("Desserts & More", [["Corn Dog", 99]]),
];

export const SIGNATURES = [
  { name: "T-Rex Burger", note: "The house classic", price: 199 },
  { name: "Iced Biscoff", note: "Cold, creamy, crunchy", price: 150 },
  { name: "Korean Ramen", note: "A warm bowl of comfort", price: 175 },
  { name: "Strawberry Fizz", note: "Bright little bubbles", price: 85 },
  { name: "Protein Platter", note: "Big hunger energy", price: 299 },
  { name: "Corn Dog", note: "A fun one", price: 99 },
];

export function findCategoryOf(itemName: string): string | undefined {
  return MENU.find((cat) => cat.items.some((i) => i.name === itemName))?.id;
}

export function filterMenu(categoryId: string | "all", query: string): MenuCategory[] {
  const q = query.trim().toLowerCase();
  return MENU.filter((cat) => categoryId === "all" || cat.id === categoryId)
    .map((cat) => ({ ...cat, items: cat.items.filter((i) => !q || i.name.toLowerCase().includes(q)) }))
    .filter((cat) => cat.items.length > 0);
}

export const TOTAL_ITEMS = MENU.reduce((n, c) => n + c.items.length, 0);

export const PLACE = {
  name: "Tea Rex Café",
  address: "Boralia Road, opposite of Hijalpukuria Post Office, Hijalpukuria, Habra, West Bengal 743271, India",
  mapsUrl: "https://maps.app.goo.gl/tz3APDcnptYqUzBP7",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent("Tearex, Boralia Road, Hijalpukuria, Habra, West Bengal 743271"),
  embedUrl:
    "https://maps.google.com/maps?q=" +
    encodeURIComponent("Tearex, Boralia Road, Hijalpukuria, Habra, West Bengal 743271") +
    "&z=16&output=embed",
};
