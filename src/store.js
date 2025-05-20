import { createSlice, configureStore } from '@reduxjs/toolkit';

// Product slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    Veg: [
      { name: 'Tomatoes', price: 30, image: '/images/tamato.jpg', description: 'Fresh red tomatoes ideal for salads and cooking.' },
      { name: 'Carrots', price: 25, image: '/images/carrot.jpg', description: 'Crunchy carrots packed with beta-carotene.' },
      { name: 'Ladyfinger', price: 40, image: '/images/bendi.jpg', description: 'Tender ladyfinger perfect for stews.' },
      { name: 'Potatoes', price: 20, image: '/images/potato.jpeg', description: 'Versatile potatoes for all recipes.' },
      { name: 'Onions', price: 305, image: '/images/onion.jpeg', description: 'Pungent onions to enhance flavor.' },
      { name: 'Spinach', price: 15, image: '/images/spinach.png', description: 'Leafy spinach rich in iron.' },
      { name: 'Cucumber', price:201, image: '/images/cucumber.png', description: 'Cool cucumber for salads.' },
      { name: 'Beetroot', price: 200, image: '/images/beet.jpg', description: 'Earthy beetroot full of nutrients.' },
      { name: 'Green Peas', price: 28, image: '/images/greenpees.png', description: 'Sweet green peas for soups.' },
      { name: 'Capsicum', price: 138, image: '/images/capsicum.jpg', description: 'Colorful capsicum for stir-fries.' },
      { name: 'Brinjal', price: 70, image: '/images/brinjal.png', description: 'Glossy purple brinjals for curries.' },
      { name: 'Cauliflower', price: 32, image: '/images/califlower.png', description: 'White cauliflower ideal for frying and roasting.' },
  { name: 'Cabbage', price: 20, image: '/images/cabbage.png', description: 'Leafy cabbage great for salads and stir-fries.' },
  { name: 'Drumstick', price: 45, image: '/images/drumsticks.png', description: 'Nutrient-rich drumsticks for sambar.' },
  { name: 'Bottle Gourd', price: 180, image: '/images/bottleguard.png', description: 'Light and healthy bottle gourd for soups.' },
  { name: 'Ridge Gourd', price: 98, image: '/images/ridgegourd.png', description: 'Ridged ridge gourd perfect for curries.' },
  { name: 'Bitter Gourd', price: 30, image: '/images/bittergourd.png', description: 'Bitter gourd for diabetic-friendly meals.' },
  { name: 'Sweet Corn', price: 35, image: '/images/sweetcorn.png', description: 'Juicy sweet corn kernels.' },
  { name: 'Radish', price: 22, image: '/images/radish.png', description: 'Spicy radish for salads and curries.' },
  { name: 'Garlic', price: 150, image: '/images/garlic.png', description: 'Aromatic garlic cloves.' },
  { name: 'Ginger', price: 148, image: '/images/ginger.png', description: 'Fresh ginger root for a zingy kick.' },
  { name: 'Mushroom', price: 60, image: '/images/mashroom.png', description: 'Soft and earthy mushrooms for gravies.' },
  { name: 'Green Beans', price: 34, image: '/images/greenbeans.png', description: 'Crisp green beans for stir-fries.' },
  { name: 'Spring Onion', price: 25, image: '/images/sprinonions.png', description: 'Zesty spring onions to garnish dishes.' },
  { name: 'Turnip', price: 150, image: '/images/turnip.png', description: 'Mild turnip root for stews.' },
  { name: 'Zucchini', price: 40, image: '/images/zuchini.png', description: 'Tender zucchini for sautés and pasta.' },
  { name: 'Pumpkin', price: 250, image: '/images/pumpkin.png', description: 'Sweet pumpkin chunks rich in fiber.' },
  { name: 'Green Chilli', price: 18, image: '/images/greenchilli.png', description: 'Hot green chilies for a spicy flavor.' },
  { name: 'Coriander', price: 12, image: '/images/coriander.png', description: 'Fresh coriander leaves for garnishing.' },
  { name: 'Mint Leaves', price: 10, image: '/images/mintleaves.png', description: 'Cool and refreshing mint leaves.' },
    ],

    
    nonVeg: [
      { name: 'Chicken Breast', price: 100, image: '/images/chiken.png', description: 'Lean chicken breast perfect for healthy meals.' },
      { name: 'Pork Ribs', price: 120, image: '/images/pork.png', description: 'Juicy pork ribs slow-cooked.' },
      { name: 'Fish Fillets', price: 160, image: '/images/fish.png', description: 'Fresh fish fillets for grilling.' },
      { name: 'Mutton Chops', price: 180, image: '/images/mutton.png', description: 'Tender mutton chops for roasting.' },
      { name: 'Duck Meat', price: 250, image: '/images/duckmeat.png', description: 'Rich duck meat with savory flavor.' },
      { name: 'Lamb Shank', price: 220, image: '/images/lamb.png', description: 'Succulent lamb shank for stews.' },
      { name: 'Beef Steak', price: 50, image: '/images/beaf.png', description: 'Premium beef steak for grilling.' },
      { name: 'Chicken Wings', price: 100, image: '/images/chikenwings.png', description: 'Spicy chicken wings for snacking.' },
      { name: 'Salmon Fish', price: 350, image: '/images/salmonfish.png', description: 'Fresh salmon fish rich in omega-3.' },
      { name: 'Turkey Meat', price: 270, image: '/images/turkey.png', description: 'Lean turkey meat ideal for sandwiches.' },
      
  { name: 'Crab Meat', price: 280, image: '/images/crab.png', description: 'Fresh crab meat perfect for seafood dishes.' },
  { name: 'Prawns', price: 320, image: '/images/prawans.png', description: 'Juicy prawns ideal for curry and fry.' },
  { name: 'Squid Rings', price: 260, image: '/images/squaidrings.png', description: 'Tender squid rings for frying and grilling.' },
  { name: 'Quail Meat', price: 200, image: '/images/quailmeat.png', description: 'Delicate quail meat for gourmet dishes.' },
  { name: 'Chicken Thighs', price: 140, image: '/images/chickenthighs.png', description: 'Flavorful chicken thighs perfect for grilling.' },
  { name: 'Goat Meat', price: 230, image: '/images/goatmeat.png', description: 'Lean goat meat ideal for biryani and curry.' },
  { name: 'Fish Curry Cuts', price: 110, image: '/images/fishcuts.png', description: 'Fresh fish curry cuts ready to cook.' },
  { name: 'Buffalo Meat', price: 210, image: '/images/buffellowmeat.png', description: 'Rich and nutritious buffalo meat.' },
  { name: 'Chicken Liver', price: 490, image: '/images/chickenliver.png', description: 'Iron-rich chicken liver for fry.' },
  { name: 'Mutton Liver', price: 130, image: '/images/muttonliver.png', description: 'Nutritious mutton liver perfect for sautéing.' },
  { name: 'Fish Roe', price: 180, image: '/images/fishroe.png', description: 'Delicate fish roe with rich flavor.' },
  { name: 'Clams', price: 70, image: '/images/clams.png', description: 'Fresh clams perfect for soups and pasta.' },
  { name: 'Octopus', price: 320, image: '/images/octopouse.png', description: 'Tender octopus meat for exotic recipes.' },
  { name: 'Rabbit Meat', price: 240, image: '/images/rabbitmeat.png', description: 'Lean rabbit meat, great for slow cooking.' },
  { name: 'Ham Slices', price: 170, image: '/images/hamslice.png', description: 'Raw ham slices ready for curing or cooking.' },
  { name: 'Chicken Mince', price: 90, image: '/images/chickenmince.png', description: 'Ground chicken ideal for kebabs and patties.' },
  { name: 'Mutton Mince', price: 560, image: '/images/muttonmince.png', description: 'Minced mutton for kofta and keema.' },
  { name: 'Chicken Sausages', price: 190, image: '/images/chickensaugs.png', description: 'Raw chicken sausages for grilling.' },
  { name: 'Duck Breast', price: 260, image: '/images/duck.png', description: 'Tender duck breast perfect for roasting.' },
  { name: 'Smoked Salmon (Raw)', price: 360, image: '/images/smokedsalmon.png', description: 'Fresh smoked-style raw salmon.' },
 

    ],
    milk: [
      { name: 'Full Cream Milk', price: 50, image: '/images/fullcreammilk.png', description: 'Rich and creamy full cream milk.' },
      { name: 'Toned Milk', price: 40, image: '/images/tonedmilk.png', description: 'Balanced toned milk.' },
      { name: 'Skimmed Milk', price: 45, image: '/images/skimmedmilk.png', description: 'Low-fat skimmed milk.' },
      { name: 'Organic Milk', price: 80, image: '/images/organicmilk.png', description: 'Pure organic milk from grass-fed cows.' },
      { name: 'Flavored Milk', price: 60, image: '/images/flavouremilk.png', description: 'Delicious flavored milk.' },
      { name: 'Buffalo Milk', price: 55, image: '/images/buffellow.png', description: 'Thick and creamy buffalo milk.' },
      { name: 'Low Fat Milk', price: 55, image: '/images/lowfatmilk.png', description: 'Low fat milk for a healthier diet.' },
      { name: 'Sumul Milk', price: 70, image: '/images/Sumul.png', description: 'High-quality Sumul brand milk.' },
      { name: 'Lactose-Free Milk', price: 90, image: '/images/lactosemilk.png', description: 'Lactose-free milk for sensitive stomachs.' },
      { name: 'Coconut Milk', price: 100, image: '/images/coconutmilk.png', description: 'Vegan coconut milk alternative.' },
      
  { name: 'Almond Milk', price: 110, image: '/images/almondmilk.png', description: 'Nutritious almond milk, dairy-free alternative.' },
  { name: 'Soy Milk', price: 95, image: '/images/soymilk.png', description: 'Protein-rich soy milk for vegans.' },
  { name: 'Oat Milk', price: 105, image: '/images/oatmilk.png', description: 'Creamy oat milk for smoothies and coffee.' },
  { name: 'Rice Milk', price: 90, image: '/images/ricemilk.png', description: 'Light and sweet rice-based milk.' },
  { name: 'Cashew Milk', price: 115, image: '/images/cashewsmilk.png', description: 'Smooth cashew milk, perfect for desserts.' },
  { name: 'Goat Milk', price: 120, image: '/images/goatmilk.png', description: 'Easily digestible goat milk.' },
  { name: 'Sheep Milk', price: 130, image: '/images/sheepmilk.png', description: 'Creamy sheep milk full of nutrients.' },
  { name: 'Camel Milk', price: 150, image: '/images/camel.png', description: 'Exotic camel milk with medicinal properties.' },
  { name: 'Strawberry Milk', price: 70, image: '/images/strawberrymilk.png', description: 'Tasty strawberry-flavored milk.' },
  { name: 'Chocolate Milk', price: 75, image: '/images/chocolatemilk.png', description: 'Sweet chocolate milk loved by kids.' },
  { name: 'Vanilla Milk', price: 70, image: '/images/vennalamilk.png', description: 'Mild vanilla flavored milk.' },
  { name: 'Hazelnut Milk', price: 125, image: '/images/hazelnutmilk.png', description: 'Nutty hazelnut milk for coffee.' },
  { name: 'Peanut Milk', price: 90, image: '/images/peanutmilk.png', description: 'Protein-rich peanut-based milk.' },
  { name: 'Banana Milk', price: 80, image: '/images/bananamilk.png', description: 'Banana-flavored milk for energy.' },
  { name: 'Walnut Milk', price: 135, image: '/images/walnutmilk.png', description: 'Healthy walnut milk packed with omega-3.' },
  { name: 'Quinoa Milk', price: 140, image: '/images/quoinamilk.png', description: 'Grain-based quinoa milk alternative.' },
  { name: 'Macadamia Milk', price: 130, image: '/images/makadamiamilk.png', description: 'Rich macadamia nut milk.' },
  { name: 'Pistachio Milk', price: 125, image: '/images/pistachiomilk.png', description: 'Delicate pistachio-flavored milk.' },
  { name: 'Avocado Milk', price: 150, image: '/images/avacadomilk.png', description: 'Creamy and healthy avocado milk.' },
  { name: 'Mixed Nut Milk', price: 145, image: '/images/mixednutmilk.png', description: 'Blend of multiple nut milks.' },
  

    ],
    chocolates: [
      { name: 'Dairy Milk', price: 20, image: '/images/dairymilk.png', description: 'Classic creamy milk chocolate.' },
      { name: 'Perk', price: 10, image: '/images/perk.png', description: 'Light and crispy perk chocolate.' },
      { name: '5 Star', price: 15, image: '/images/5star.png', description: 'Chewy caramel-filled chocolate.' },
      { name: 'KitKat', price: 20, image: '/images/kitkat.png', description: 'Crispy wafer bars.' },
      { name: 'Ferrero Rocher', price: 250, image: '/images/ferrerorocher.png', description: 'Premium hazelnut chocolate.' },
      { name: 'Munch', price: 10, image: '/images/munch.png', description: 'Crunchy wafer chocolate.' },
      { name: 'Snickers', price: 40, image: '/images/snickers.png', description: 'Peanut caramel chocolate bar.' },
      { name: 'Toblerone', price: 180, image: '/images/toblerenone.png', description: 'Swiss triangular chocolate.' },
      { name: 'Cadbury Silk', price: 120, image: '/images/silk.png', description: 'Smooth and rich chocolate.' },
      { name: 'Bournville Dark', price: 90, image: '/images/Bournville.png', description: 'Intense dark chocolate.' },
      { name: 'Milkybar', price: 25, image: '/images/milkbar.png', description: 'Creamy white chocolate delight.' },
      
  { name: 'Amul Dark Chocolate', price: 100, image: '/images/amuldarkchocolate.png', description: 'Rich and bitter dark chocolate.' },
  { name: 'Galaxy', price: 120, image: '/images/galaxy.png', description: 'Smooth and silky milk chocolate.' },
  { name: 'Lindt Lindor', price: 350, image: '/images/lindit.png', description: 'Premium truffle-filled chocolate.' },
  { name: 'Nestle Classic', price: 50, image: '/images/nestleclassic.png', description: 'Classic milk chocolate bar.' },
  { name: 'Mars Bar', price: 45, image: '/images/marsbar.png', description: 'Caramel and nougat chocolate.' },
  { name: 'Twix', price: 40, image: '/images/twix.png', description: 'Crunchy biscuit with caramel chocolate.' },
  { name: 'Ritter Sport', price: 150, image: '/images/rittersport.png', description: 'German chocolate with various flavors.' },
  { name: 'Bar One', price: 30, image: '/images/barone.png', description: 'Energy-packed caramel chocolate.' },
  { name: 'Alpenliebe Juzt Jelly Choco', price: 10, image: '/images/alpenliebe.png', description: 'Chocolate with fruity jelly inside.' },
  { name: 'Temptations', price: 60, image: '/images/tempatitons.png', description: 'Cadbury’s rich premium chocolate bar.' },
  { name: 'Dairy Milk Roast Almond', price: 45, image: '/images/dairymilkroast.png', description: 'Chocolate with roasted almonds.' },
  { name: 'Hershey’s Kisses', price: 220, image: '/images/kisses.png', description: 'Iconic bite-sized chocolates.' },
  { name: 'Hershey’s Cookies & Cream', price: 90, image: '/images/cream.png', description: 'White chocolate with cookie bits.' },
  { name: 'Chocopie', price: 35, image: '/images/chocopie.png', description: 'Marshmallow-filled chocolate pie.' },
  { name: 'Cadbury Gems', price: 10, image: '/images/gems.png', description: 'Colorful candy-coated chocolate.' },
  { name: 'Tango', price: 15, image: '/images/tango.png', description: 'Chewy chocolate bar.' },
  { name: 'Chocobakes', price: 40, image: '/images/chocobakes.png', description: 'Chocolate-filled cookies by Cadbury.' },
  { name: 'Fabelle', price: 300, image: '/images/febellle.png', description: 'ITC’s luxury handcrafted chocolate.' },
  { name: 'Nutella & Go', price: 160, image: '/images/nutella.png', description: 'Hazelnut spread with sticks.' },
  

    ],
  },
  reducers: {},
});
const savedcart=localStorage.getItem("cart");
const localStoragecart=savedcart?JSON.parse(savedcart):[];
// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: localStoragecart,
  reducers: {
    addToCart: (state, inputItem) => {
      const item = state.find(item => item.name === inputItem.payload.name);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...inputItem.payload, quantity: 1 });
      }
    },
    incrementCart: (state, inputItem) => {
      const item = state.find(item => item.name === inputItem.payload.name);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementCart: (state, inputItem) => {
      const itemIndex = state.findIndex(item => item.name === inputItem.payload.name);
      if (itemIndex > -1) {
        if (state[itemIndex].quantity > 1) {
          state[itemIndex].quantity -= 1;
        } else {
          state.splice(itemIndex, 1);
        }
      }
    },
    removeFromCart: (state, inputItem) => {
      return state.filter(item => item.name !== inputItem.payload.name);
    },
    clearCart: () => {
      return [];
    },
  },
});


// Order Slice
const orderSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {
    ordersDetails: (state, action) => {
      // Adding a unique ID to the order
      state.push(action.payload);
    },
  },
});
// userSlice



const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    isAuthenticated: false,
    currentUser: null,
  },
  reducers: {
    registerUser: (state, action) => {
      state.users.push(action.payload);
    },
    loginUser: (state, inputData) => {
      
      const foundUser = state.users.find(
        user => user.username ===inputData.payload. username && user.password ===inputData.payload. password
      );
      if (foundUser) {
        state.currentUser = foundUser;
        state.isAuthenticated = true;
      }
      else{
        alert("Invalid Credentials");
      }
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    
  },
});



// Configure Store
const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart: cartSlice.reducer,
    orders: orderSlice.reducer,
    users:userSlice.reducer,
  },
});
store.subscribe(()=>{
        const state= store.getState();
        localStorage.setItem("cart",JSON.stringify(state.cart));
        });

// Export Actions
export const { addToCart, incrementCart, decrementCart, removeFromCart, clearCart } = cartSlice.actions;
export const { ordersDetails } = orderSlice.actions;  // Export the correct action
export const {registerUser,loginUser, logoutUser}=userSlice.actions;

// Export Store
export default store;
