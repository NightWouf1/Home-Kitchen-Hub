// ================================================================
// KITCHEN HUB — recipes.js
// Shared data used by: index.html, kitchen.html, seasonal.html,
//                      tips.html, community.html, planner.html
// ================================================================

// ── SPICE LEVELS ──
// none / mild / medium / hot / very-hot
const SPICE_LABELS = {
  'none':     { label: 'No Spice',  emoji: '⚪', color: '#aaa' },
  'mild':     { label: 'Mild',      emoji: '🟡', color: '#e8b830' },
  'medium':   { label: 'Medium',    emoji: '🟠', color: '#e07030' },
  'hot':      { label: 'Hot 🌶️',   emoji: '🔴', color: '#c82020' },
  'very-hot': { label: 'Very Hot 🌶️🌶️', emoji: '🟣', color: '#8020c8' },
};
function spiceBadgeHTML(spice) {
  const s = SPICE_LABELS[spice] || SPICE_LABELS['none'];
  return `<span class="spice-badge spice-${spice}" title="${s.label}" style="font-size:0.65rem;padding:2px 8px;border-radius:8px;font-weight:600;background:${s.color}18;color:${s.color};border:1px solid ${s.color}40;white-space:nowrap;">${s.emoji} ${s.label}</span>`;
}

// ── ALLERGEN DETECTION ──
const ALLERGEN_DB = {
  gluten:    ['flour','pasta','spaghetti','macaroni','lasagna','bread','breadcrumbs','bun','buns','noodle','noodles','ramen','udon','dumpling','dumplings','wonton','soy sauce','teriyaki','wrapper','wrappers','ladyfinger'],
  dairy:     ['milk','cream','butter','cheese','cheddar','mozzarella','parmesan','pecorino','béchamel','bechamel','cream cheese','sour cream','mascarpone','yogurt','yoghurt'],
  eggs:      ['egg','eggs','yolk'],
  nuts:      ['peanut','peanuts','almond','almonds','walnut','walnuts','cashew','cashews','pecan','pecans','pistachio','pine nut','pine nuts','sesame'],
  soy:       ['soy sauce','tofu','miso','edamame','soy'],
  fish:      ['fish','salmon','tuna','cod','anchovy','anchovies','shrimp','prawn','prawns','crab','lobster','shellfish','seafood','fish sauce'],
  pork:      ['bacon','guanciale','pork','ribs','ham','pancetta','lard','prosciutto'],
  mustard:   ['mustard'],
  celery:    ['celery'],
  sulphites: ['wine','vinegar'],
};
const ALLERGEN_LABELS = {
  gluten:'🌾 Gluten', dairy:'🥛 Dairy', eggs:'🥚 Eggs',
  nuts:'🥜 Nuts/Sesame', soy:'🫘 Soy', fish:'🐟 Fish/Shellfish',
  pork:'🐷 Pork', mustard:'🟡 Mustard', celery:'🌿 Celery', sulphites:'🍷 Sulphites',
};
function detectAllergens(ingredients) {
  const found = new Set();
  ingredients.forEach(ing => {
    const text = ((ing.name || ing) + ' ' + (ing.amt || '')).toLowerCase();
    Object.entries(ALLERGEN_DB).forEach(([allergen, keywords]) => {
      if (keywords.some(k => text.includes(k))) found.add(allergen);
    });
  });
  return [...found];
}
function allergenBadgesHTML(allergens) {
  if (!allergens.length) return '<span style="font-size:0.72rem;color:#1a7a40;font-weight:500;">✅ No major allergens</span>';
  return allergens.map(a => `<span class="allergen-badge" style="font-size:0.62rem;padding:2px 8px;border-radius:8px;font-weight:700;background:#fde0e0;color:#a02020;border:1px solid #e8b0b0;white-space:nowrap;">${ALLERGEN_LABELS[a]}</span>`).join('');
}

// ================================================================
// ALL RECIPES
// Fields: id, emoji, title, cuisine, diff, time, servings,
//         spice, season, desc, fact, ingredients, steps
// spice: 'none' | 'mild' | 'medium' | 'hot' | 'very-hot'
// season: array of 'spring','summer','autumn','winter','all'
// ================================================================
const ALL_RECIPES = [

  // ── ITALIAN ──
  {
    id:'carbonara', emoji:'🍝', title:'Spaghetti Carbonara',
    cuisine:'Italian', diff:'Medium', time:25, servings:2,
    spice:'none', season:['all'],
    desc:'A classic Roman pasta dish with eggs, cheese, and crispy bacon — no cream needed.',
    fact:'Carbonara was popularized in Rome after WWII. The original never had cream.',
    ingredients:[{amt:'200g',name:'spaghetti'},{amt:'2',name:'eggs'},{amt:'100g',name:'guanciale or bacon'},{amt:'50g',name:'Pecorino Romano'},{amt:'1 tsp',name:'black pepper'}],
    steps:['Boil salted water and cook spaghetti al dente.','Fry the guanciale until crispy.','Beat eggs with grated Pecorino and black pepper.','Take pasta off heat, mix in egg mixture quickly.','Add pasta water to make it creamy. Serve immediately.']
  },
  {
    id:'bolognese', emoji:'🍝', title:'Bolognese',
    cuisine:'Italian', diff:'Easy', time:60, servings:4,
    spice:'none', season:['autumn','winter'],
    desc:'Rich slow-cooked meat sauce from Bologna.',
    fact:'The original 1982 registered Bolognese contains no garlic and barely any tomato.',
    ingredients:[{amt:'400g',name:'spaghetti'},{amt:'300g',name:'minced beef'},{amt:'1',name:'onion, finely diced'},{amt:'2',name:'carrots, finely diced'},{amt:'400g',name:'crushed tomatoes'},{amt:'100ml',name:'red wine'}],
    steps:['Fry onion and carrot until soft, about 8 min.','Add mince, cook until browned.','Pour in wine, simmer 5 min.','Add tomatoes, season, simmer 40 min on low heat.','Cook pasta and serve with sauce on top.']
  },
  {
    id:'pesto', emoji:'🌿', title:'Pesto Pasta',
    cuisine:'Italian', diff:'Easy', time:15, servings:2,
    spice:'none', season:['spring','summer'],
    desc:'The quickest Italian dinner you can make.',
    fact:'Traditional Ligurian pesto uses a marble mortar, never a blender.',
    ingredients:[{amt:'200g',name:'spaghetti or trofie'},{amt:'4 tbsp',name:'pesto'},{amt:'30g',name:'Parmesan, grated'},{amt:'handful',name:'cherry tomatoes'}],
    steps:['Cook pasta in salted water until al dente.','Reserve a cup of pasta water.','Drain pasta, toss with pesto and pasta water.','Serve with Parmesan and halved cherry tomatoes.']
  },
  {
    id:'lasagna', emoji:'🫕', title:'Classic Lasagna',
    cuisine:'Italian', diff:'Hard', time:90, servings:6,
    spice:'none', season:['autumn','winter'],
    desc:'Layers of pasta, rich bolognese, creamy béchamel, and melted cheese.',
    fact:'Lasagna is one of the oldest pasta dishes in Italy, dating back to the Middle Ages.',
    ingredients:[{amt:'12',name:'lasagna sheets'},{amt:'500g',name:'minced beef'},{amt:'400g',name:'crushed tomatoes'},{amt:'500ml',name:'béchamel sauce'},{amt:'200g',name:'mozzarella'},{amt:'1',name:'onion'}],
    steps:['Make bolognese: fry onion, brown mince, add tomatoes, simmer 30 min.','Make béchamel: melt butter, whisk in flour, add warm milk slowly.','Preheat oven to 190°C.','Layer: pasta → bolognese → béchamel → cheese. Repeat 3 times.','Bake 35–40 min until golden and bubbling.']
  },
  {
    id:'risotto', emoji:'🍚', title:'Mushroom Risotto',
    cuisine:'Italian', diff:'Medium', time:40, servings:3,
    spice:'none', season:['autumn','winter'],
    desc:'Creamy, silky risotto packed with earthy mushrooms.',
    fact:'Risotto must be stirred constantly — friction releases starch from the rice, creating the creamy texture.',
    ingredients:[{amt:'300g',name:'Arborio rice'},{amt:'250g',name:'mixed mushrooms, sliced'},{amt:'1',name:'onion, finely diced'},{amt:'2 cloves',name:'garlic'},{amt:'150ml',name:'white wine'},{amt:'1L',name:'hot vegetable stock'},{amt:'50g',name:'Parmesan, grated'},{amt:'2 tbsp',name:'butter'}],
    steps:['Fry onion and garlic in butter until soft.','Add mushrooms, cook until golden, set aside.','Toast rice in the pan 2 min, pour in wine, stir until absorbed.','Add stock one ladle at a time, stirring constantly, about 20 min.','Stir in mushrooms, Parmesan and a knob of butter. Rest 2 min before serving.']
  },
  {
    id:'tiramisu', emoji:'🍮', title:'Tiramisu',
    cuisine:'Italian', diff:'Medium', time:30, servings:6,
    spice:'none', season:['all'],
    desc:'The iconic Italian dessert — layers of espresso-soaked biscuits and mascarpone cream.',
    fact:'Tiramisu means "pick me up" in Italian, referring to the coffee and sugar energy boost.',
    ingredients:[{amt:'500g',name:'mascarpone cheese'},{amt:'4',name:'eggs, separated'},{amt:'80g',name:'caster sugar'},{amt:'200ml',name:'strong espresso, cooled'},{amt:'200g',name:'ladyfinger biscuits'},{amt:'2 tbsp',name:'cocoa powder'}],
    steps:['Beat egg yolks with sugar until pale and thick.','Fold in mascarpone until smooth.','Whisk egg whites to stiff peaks, fold into mascarpone mix.','Dip ladyfingers briefly in espresso, layer in dish.','Spread mascarpone cream on top, repeat layers.','Refrigerate at least 4 hours. Dust with cocoa before serving.']
  },

  // ── AMERICAN ──
  {
    id:'burger', emoji:'🍔', title:'Classic Smash Burger',
    cuisine:'American', diff:'Easy', time:20, servings:2,
    spice:'none', season:['spring','summer'],
    desc:'Crispy-edged, juicy smash burgers with special sauce.',
    fact:'Smash burgers get their flavour from the Maillard reaction when beef hits a very hot flat surface.',
    ingredients:[{amt:'300g',name:'80/20 minced beef'},{amt:'2',name:'brioche buns'},{amt:'2',name:'slices American cheese'},{amt:'1 tbsp',name:'butter'},{amt:'1',name:'onion, thinly sliced'},{amt:'Lettuce, pickles, ketchup',name:'to serve'}],
    steps:['Divide beef into 2 loose balls, season well.','Heat a cast iron pan until very hot, add butter.','Add beef ball, smash flat immediately with a spatula.','Cook 2 min, flip, add cheese, cook 1 more min.','Toast buns, build burger with sauce. Serve hot.']
  },
  {
    id:'mac', emoji:'🧀', title:'Baked Mac & Cheese',
    cuisine:'American', diff:'Medium', time:45, servings:4,
    spice:'none', season:['autumn','winter'],
    desc:'Creamy stovetop mac with a golden breadcrumb crust.',
    fact:'Macaroni and cheese became popular after Thomas Jefferson served it at a White House dinner.',
    ingredients:[{amt:'300g',name:'macaroni'},{amt:'3 tbsp',name:'butter'},{amt:'3 tbsp',name:'flour'},{amt:'600ml',name:'whole milk'},{amt:'250g',name:'cheddar, grated'},{amt:'50g',name:'breadcrumbs'}],
    steps:['Cook macaroni until just underdone, drain.','Melt butter, whisk in flour, cook 2 min.','Add warm milk gradually, stir until thick.','Off heat, stir in cheddar. Season.','Mix with pasta, top with breadcrumbs and remaining cheese.','Bake at 200°C for 20–25 min until golden.']
  },
  {
    id:'ribs', emoji:'🥩', title:'BBQ Baby Back Ribs',
    cuisine:'American', diff:'Hard', time:180, servings:4,
    spice:'mild', season:['spring','summer'],
    desc:'Fall-off-the-bone tender ribs with a sticky homemade BBQ glaze.',
    fact:'The term "barbecue" comes from the Taíno word "barbacoa".',
    ingredients:[{amt:'2 racks',name:'baby back pork ribs'},{amt:'2 tbsp',name:'brown sugar'},{amt:'1 tsp each',name:'smoked paprika, garlic powder, onion powder'},{amt:'200ml',name:'BBQ sauce'},{amt:'1 tbsp',name:'apple cider vinegar'}],
    steps:['Remove membrane from back of ribs.','Mix sugar and spices, rub all over ribs. Rest 1 hour.','Wrap in foil, bake at 150°C for 2.5 hours.','Unwrap, brush with BBQ sauce mixed with vinegar.','Grill 10 min, basting twice, until sticky and caramelised.']
  },
  {
    id:'chicken', emoji:'🍗', title:'Garlic Butter Chicken Rice',
    cuisine:'American', diff:'Easy', time:40, servings:3,
    spice:'none', season:['all'],
    desc:'One-pan garlic butter chicken served on fluffy rice.',
    fact:'Rice became a staple American side dish from cultivation in South Carolina from the 1600s.',
    ingredients:[{amt:'3',name:'chicken thighs'},{amt:'1.5 cups',name:'long grain rice'},{amt:'4 cloves',name:'garlic, minced'},{amt:'2 tbsp',name:'butter'},{amt:'500ml',name:'chicken stock'},{amt:'1 tbsp',name:'soy sauce'}],
    steps:['Season chicken thighs, sear skin-side down in butter until golden, set aside.','In same pan, fry garlic 1 min, add rice, stir 2 min.','Pour in stock and soy sauce, bring to boil.','Place chicken on top, cover, simmer 18–20 min.','Rest 5 min before serving.']
  },
  {
    id:'chili', emoji:'🌶️', title:'Classic Beef Chili',
    cuisine:'American', diff:'Easy', time:60, servings:5,
    spice:'hot', season:['autumn','winter'],
    desc:'Thick, hearty beef chili loaded with beans and spices. Perfect for cold nights.',
    fact:'Texas-style chili famously contains no beans — but most of the world disagrees.',
    ingredients:[{amt:'500g',name:'minced beef'},{amt:'2 cans',name:'kidney beans, drained'},{amt:'400g',name:'crushed tomatoes'},{amt:'1',name:'onion, diced'},{amt:'3 cloves',name:'garlic'},{amt:'2 tsp',name:'chili powder'},{amt:'1 tsp each',name:'cumin, smoked paprika'},{amt:'1 tbsp',name:'tomato paste'}],
    steps:['Brown mince in a large pot, drain excess fat.','Add onion and garlic, cook 5 min.','Stir in spices and tomato paste, cook 2 min.','Add crushed tomatoes and beans, stir well.','Simmer 40 min on low heat, stirring occasionally.','Season and serve with rice or cornbread.']
  },
  {
    id:'pancakes', emoji:'🥞', title:'Fluffy American Pancakes',
    cuisine:'American', diff:'Easy', time:20, servings:4,
    spice:'none', season:['all'],
    desc:'Thick, fluffy pancakes perfect for weekend brunch with maple syrup.',
    fact:'Americans eat approximately 700 million pounds of pancakes per year.',
    ingredients:[{amt:'200g',name:'plain flour'},{amt:'2 tsp',name:'baking powder'},{amt:'1 tbsp',name:'sugar'},{amt:'1',name:'egg'},{amt:'250ml',name:'whole milk'},{amt:'2 tbsp',name:'melted butter'},{amt:'1 tsp',name:'vanilla extract'}],
    steps:['Mix flour, baking powder and sugar in a bowl.','Whisk egg, milk, butter and vanilla separately.','Combine wet and dry — lumps are fine, don\'t overmix.','Heat a non-stick pan on medium, lightly butter.','Pour small ladles of batter, cook until bubbles form, flip once.','Serve with maple syrup and fresh berries.']
  },

  // ── BAKING ──
  {
    id:'cake', emoji:'🍰', title:'Chocolate Fudge Cake',
    cuisine:'Baking', diff:'Medium', time:60, servings:8,
    spice:'none', season:['all'],
    desc:'A deeply chocolatey, fudgy layered cake with silky ganache frosting.',
    fact:'Chocolate cake became popular in America in the 1880s after cocoa powder became widely available.',
    ingredients:[{amt:'200g',name:'plain flour'},{amt:'200g',name:'caster sugar'},{amt:'50g',name:'cocoa powder'},{amt:'1.5 tsp',name:'baking powder'},{amt:'2',name:'eggs'},{amt:'200ml',name:'whole milk'},{amt:'100ml',name:'vegetable oil'},{amt:'200g',name:'dark chocolate'},{amt:'200ml',name:'double cream'}],
    steps:['Preheat oven to 180°C. Grease two 20cm round tins.','Mix all dry ingredients in a large bowl.','Whisk wet ingredients separately, combine with dry.','Pour into tins, bake 30–35 min.','Heat cream to simmer, pour over chopped chocolate. Stir smooth.','Cool cakes, sandwich and frost with ganache.']
  },
  {
    id:'cookies', emoji:'🍪', title:'Brown Butter Cookies',
    cuisine:'Baking', diff:'Easy', time:30, servings:20,
    spice:'none', season:['all'],
    desc:'Chewy, nutty cookies made with browned butter.',
    fact:'Brown butter gets its nutty flavour from the Maillard reaction of milk solids.',
    ingredients:[{amt:'225g',name:'butter'},{amt:'200g',name:'brown sugar'},{amt:'50g',name:'caster sugar'},{amt:'2',name:'eggs'},{amt:'2 tsp',name:'vanilla extract'},{amt:'280g',name:'plain flour'},{amt:'1 tsp',name:'baking soda'},{amt:'200g',name:'chocolate chips'}],
    steps:['Brown butter in a saucepan until golden and nutty. Cool 15 min.','Beat browned butter with both sugars until fluffy.','Add eggs and vanilla, beat until pale.','Fold in flour and baking soda, then chocolate chips.','Roll into balls, bake at 175°C for 11–13 min.','Cool on tray — they firm up as they cool.']
  },
  {
    id:'banana_bread', emoji:'🍌', title:'Banana Bread',
    cuisine:'Baking', diff:'Easy', time:70, servings:8,
    spice:'none', season:['all'],
    desc:'Super moist banana bread with a caramelised top.',
    fact:'Banana bread first appeared in cookbooks during the 1930s Great Depression.',
    ingredients:[{amt:'3',name:'very ripe bananas'},{amt:'175g',name:'self-raising flour'},{amt:'150g',name:'caster sugar'},{amt:'75g',name:'butter, melted'},{amt:'2',name:'eggs'},{amt:'1 tsp',name:'vanilla extract'}],
    steps:['Preheat oven to 170°C. Line a loaf tin.','Mash bananas well with a fork.','Mix in melted butter, sugar, eggs, and vanilla.','Fold in flour until just combined.','Pour into tin, bake 55–60 min until a skewer comes out clean.','Cool in tin 10 min, then turn out.']
  },
  {
    id:'cheesecake', emoji:'🎂', title:'New York Cheesecake',
    cuisine:'Baking', diff:'Hard', time:90, servings:10,
    spice:'none', season:['all'],
    desc:'Dense, creamy New York–style cheesecake with a buttery biscuit base.',
    fact:'New York cheesecake uses extra egg yolks and cream cheese for its distinctive dense texture.',
    ingredients:[{amt:'200g',name:'digestive biscuits, crushed'},{amt:'80g',name:'butter, melted'},{amt:'600g',name:'cream cheese'},{amt:'150g',name:'caster sugar'},{amt:'3',name:'eggs + 1 yolk'},{amt:'200ml',name:'sour cream'},{amt:'1 tsp',name:'vanilla extract'}],
    steps:['Mix crushed biscuits with melted butter, press into springform tin. Chill 20 min.','Preheat oven to 160°C.','Beat cream cheese and sugar until smooth. Add eggs one at a time.','Mix in sour cream and vanilla. Pour over base.','Bake 55–60 min until just set with a slight wobble.','Turn oven off, leave door ajar, cool inside 1 hour. Refrigerate overnight.']
  },
  {
    id:'scones', emoji:'🫖', title:'Classic Scones',
    cuisine:'Baking', diff:'Easy', time:30, servings:8,
    spice:'none', season:['spring','summer'],
    desc:'Light, fluffy scones perfect with clotted cream and jam.',
    fact:'The correct pronunciation of "scone" divides the UK — rhymes with "gone" or "bone" depending on region.',
    ingredients:[{amt:'225g',name:'self-raising flour'},{amt:'1 tsp',name:'baking powder'},{amt:'50g',name:'cold butter, cubed'},{amt:'25g',name:'caster sugar'},{amt:'150ml',name:'whole milk'},{amt:'1',name:'egg, beaten'}],
    steps:['Preheat oven to 220°C. Line a baking tray.','Rub butter into flour and baking powder until breadcrumbs.','Stir in sugar, then add milk gradually to form soft dough.','Pat to 2.5cm thick, cut rounds with a cutter.','Brush tops with beaten egg, bake 10–12 min until golden.','Serve warm with clotted cream and jam.']
  },
  {
    id:'brownies', emoji:'🍫', title:'Fudgy Chocolate Brownies',
    cuisine:'Baking', diff:'Easy', time:40, servings:12,
    spice:'none', season:['all'],
    desc:'Dense, intensely chocolatey brownies with a crackly top and fudgy centre.',
    fact:'The brownie was reportedly invented in 1893 at the Palmer House Hotel in Chicago.',
    ingredients:[{amt:'200g',name:'dark chocolate, chopped'},{amt:'150g',name:'butter'},{amt:'250g',name:'caster sugar'},{amt:'3',name:'eggs'},{amt:'1 tsp',name:'vanilla extract'},{amt:'90g',name:'plain flour'},{amt:'30g',name:'cocoa powder'},{amt:'pinch',name:'salt'}],
    steps:['Preheat oven to 180°C. Line a 20cm square tin.','Melt chocolate and butter together, cool slightly.','Whisk sugar and eggs until thick and pale, about 3 min.','Fold chocolate mix into eggs, then sift in flour, cocoa and salt.','Pour into tin, bake 22–25 min — centre should have a slight wobble.','Cool completely in tin before cutting.']
  },

  // ── ASIAN ──
  {
    id:'ramen', emoji:'🍜', title:'Tonkotsu-Style Ramen',
    cuisine:'Asian', diff:'Hard', time:90, servings:3,
    spice:'mild', season:['autumn','winter'],
    desc:'Rich, creamy pork bone broth ramen with soft-boiled egg, noodles and toppings.',
    fact:'Tonkotsu ramen originates from Fukuoka, Japan. The cloudy broth comes from boiling pork bones at high heat.',
    ingredients:[{amt:'1kg',name:'pork bones or pork belly'},{amt:'3 portions',name:'ramen noodles'},{amt:'3',name:'soft-boiled eggs'},{amt:'4 cloves',name:'garlic'},{amt:'2 tbsp',name:'soy sauce'},{amt:'1 tbsp',name:'miso paste'},{amt:'Spring onions, nori, corn',name:'to top'}],
    steps:['Blanch pork bones in boiling water 10 min, rinse well.','Simmer bones in fresh water with garlic for 60 min.','Strain broth, season with soy sauce and miso.','Cook ramen noodles per packet, divide into bowls.','Pour hot broth over noodles, add halved soft-boiled egg.','Top with spring onions, corn and nori.']
  },
  {
    id:'fried_rice', emoji:'🍳', title:'Egg Fried Rice',
    cuisine:'Asian', diff:'Easy', time:15, servings:2,
    spice:'none', season:['all'],
    desc:'Quick, smoky wok-fried rice with egg and vegetables. A weeknight lifesaver.',
    fact:'The key to great fried rice is using day-old cold rice — fresh rice turns mushy.',
    ingredients:[{amt:'2 cups',name:'cooked rice (day-old)'},{amt:'2',name:'eggs, beaten'},{amt:'3 tbsp',name:'soy sauce'},{amt:'2 tbsp',name:'vegetable oil'},{amt:'3 cloves',name:'garlic, minced'},{amt:'2',name:'spring onions, sliced'},{amt:'1 cup',name:'frozen peas or sweetcorn'}],
    steps:['Heat oil in a wok until very hot.','Add garlic, stir-fry 30 seconds.','Push to side, pour in eggs, scramble until just set.','Add rice, break up clumps, stir-fry 3 min on high heat.','Pour in soy sauce, toss everything together.','Add peas and spring onions, cook 1 more minute.']
  },
  {
    id:'dumplings', emoji:'🥟', title:'Pan-Fried Pork Dumplings',
    cuisine:'Asian', diff:'Medium', time:50, servings:4,
    spice:'mild', season:['all'],
    desc:'Crispy-bottomed, juicy pork dumplings — perfectly golden on one side, tender on the other.',
    fact:'The dumpling pleating technique can take years to master in Chinese restaurants.',
    ingredients:[{amt:'250g',name:'minced pork'},{amt:'2 tbsp',name:'soy sauce'},{amt:'1 tsp',name:'sesame oil'},{amt:'1 tsp',name:'fresh ginger, grated'},{amt:'2',name:'spring onions, finely chopped'},{amt:'25',name:'dumpling wrappers'},{amt:'2 tbsp',name:'vegetable oil'},{amt:'100ml',name:'water'}],
    steps:['Mix pork, soy sauce, sesame oil, ginger and spring onions well.','Place a teaspoon of filling in each wrapper.','Wet the edges, fold and pleat to seal into half moon shape.','Heat oil in a flat pan on medium-high.','Place dumplings flat side down, cook 2 min until golden.','Pour in water, cover and steam 6–7 min until cooked through.']
  },
  {
    id:'teriyaki', emoji:'🍱', title:'Chicken Teriyaki',
    cuisine:'Asian', diff:'Easy', time:25, servings:2,
    spice:'none', season:['all'],
    desc:'Sticky, glossy teriyaki chicken served over steamed rice. A Japanese classic made at home.',
    fact:'Teriyaki sauce was brought to Hawaii by Japanese immigrants, where it became a local staple.',
    ingredients:[{amt:'2',name:'chicken thighs, boneless'},{amt:'3 tbsp',name:'soy sauce'},{amt:'2 tbsp',name:'honey'},{amt:'1 tbsp',name:'mirin'},{amt:'1 tsp',name:'sesame oil'},{amt:'1 clove',name:'garlic, minced'},{amt:'Steamed rice, sesame seeds',name:'to serve'}],
    steps:['Mix soy sauce, honey, mirin, sesame oil and garlic.','Score the chicken thighs lightly, pat dry.','Heat oil in a pan, cook chicken skin-side down 5–6 min until golden.','Flip, pour teriyaki sauce over, cook 4–5 min, basting constantly.','Sauce should thicken and coat the chicken.','Slice and serve over rice, drizzle remaining sauce, scatter sesame seeds.']
  },
  {
    id:'pad_thai', emoji:'🍜', title:'Pad Thai',
    cuisine:'Asian', diff:'Medium', time:30, servings:2,
    spice:'medium', season:['all'],
    desc:"Thailand's most famous noodle dish — sweet, sour, salty and smoky all at once.",
    fact:'Pad Thai was promoted as a national dish in the 1930s by the Thai government to promote rice noodles.',
    ingredients:[{amt:'200g',name:'flat rice noodles'},{amt:'200g',name:'chicken or prawns'},{amt:'2',name:'eggs'},{amt:'3 tbsp',name:'fish sauce'},{amt:'2 tbsp',name:'tamarind paste'},{amt:'1 tbsp',name:'sugar'},{amt:'2 tbsp',name:'vegetable oil'},{amt:'Bean sprouts, peanuts, lime',name:'to serve'}],
    steps:['Soak rice noodles in cold water 30 min, drain.','Mix fish sauce, tamarind and sugar to make the sauce.','Stir-fry chicken or prawns in hot oil until cooked, push to side.','Add noodles and sauce, toss on high heat.','Push to side, scramble eggs in the pan, mix everything together.','Serve with bean sprouts, crushed peanuts and lime.']
  },
  {
    id:'miso_soup', emoji:'🥣', title:'Miso Soup with Tofu',
    cuisine:'Asian', diff:'Easy', time:10, servings:2,
    spice:'none', season:['all'],
    desc:'A warming Japanese miso soup with silken tofu and seaweed. Ready in 10 minutes.',
    fact:'Miso soup has been eaten in Japan for over 1,000 years and was a breakfast staple for samurai.',
    ingredients:[{amt:'600ml',name:'dashi or vegetable stock'},{amt:'2 tbsp',name:'white miso paste'},{amt:'150g',name:'silken tofu, cubed'},{amt:'1 tbsp',name:'dried wakame seaweed'},{amt:'2',name:'spring onions, sliced'}],
    steps:['Bring dashi stock to a gentle simmer — do not boil.','Add wakame, let it rehydrate for 2 min.','Whisk miso paste into a little hot stock first, then add to pot.','Add tofu cubes, warm through gently for 2 min.','Do not boil after adding miso — it kills the probiotics.','Ladle into bowls, top with spring onions.']
  },
  {
    id:'spring_rolls', emoji:'🥢', title:'Crispy Spring Rolls',
    cuisine:'Asian', diff:'Medium', time:45, servings:4,
    spice:'mild', season:['spring','summer'],
    desc:'Golden, crunchy spring rolls filled with pork, cabbage and glass noodles.',
    fact:'Spring rolls get their name from being traditionally eaten during the Chinese New Year Spring Festival.',
    ingredients:[{amt:'200g',name:'minced pork'},{amt:'1 cup',name:'cabbage, shredded'},{amt:'50g',name:'glass noodles, soaked'},{amt:'2 tbsp',name:'soy sauce'},{amt:'1 tsp',name:'sesame oil'},{amt:'12',name:'spring roll wrappers'},{amt:'Vegetable oil',name:'for deep frying'}],
    steps:['Mix pork, cabbage, drained noodles, soy sauce and sesame oil.','Place 2 tbsp filling on lower third of each wrapper.','Fold up, roll tightly, sealing the edge with water.','Heat oil to 180°C.','Fry spring rolls 3–4 at a time, 4–5 min until golden and crispy.','Drain on paper towels, serve with sweet chilli sauce.']
  },
  {
    id:'gyoza', emoji:'🥟', title:'Crispy Gyoza',
    cuisine:'Asian', diff:'Medium', time:40, servings:4,
    spice:'mild', season:['all'],
    desc:'Japanese pan-fried dumplings with a crispy base and juicy filling.',
    fact:'Gyoza were adapted from Chinese jiaozi after Japanese soldiers returned from China after WWII.',
    ingredients:[{amt:'200g',name:'minced pork'},{amt:'100g',name:'cabbage, very finely chopped'},{amt:'1 tsp',name:'fresh ginger, grated'},{amt:'2 cloves',name:'garlic, minced'},{amt:'2 tbsp',name:'soy sauce'},{amt:'1 tsp',name:'sesame oil'},{amt:'20',name:'gyoza wrappers'},{amt:'2 tbsp',name:'vegetable oil'}],
    steps:['Squeeze excess water from cabbage with a towel.','Mix all filling ingredients well.','Place teaspoon filling in each wrapper, fold and pleat tightly.','Heat oil in a flat pan, place gyoza flat side down.','Fry 2 min until golden, add 3 tbsp water, cover immediately.','Steam 5 min until water evaporates. Serve with soy and rice vinegar dip.']
  },
  {
    id:'katsu_curry', emoji:'🍛', title:'Chicken Katsu Curry',
    cuisine:'Asian', diff:'Medium', time:45, servings:3,
    spice:'mild', season:['all'],
    desc:'Crispy breaded chicken with a rich, fragrant Japanese curry sauce over rice.',
    fact:'Katsu curry was introduced to Japan via the British navy in the Meiji era, making it technically a British dish.',
    ingredients:[{amt:'3',name:'chicken breasts'},{amt:'50g',name:'plain flour'},{amt:'2',name:'eggs, beaten'},{amt:'100g',name:'panko breadcrumbs'},{amt:'1',name:'onion, diced'},{amt:'2 tbsp',name:'curry powder'},{amt:'400ml',name:'chicken stock'},{amt:'1 tbsp',name:'soy sauce'},{amt:'1 tsp',name:'honey'},{amt:'Steamed rice',name:'to serve'}],
    steps:['Flatten chicken breasts to even thickness.','Coat in flour, then egg, then panko breadcrumbs. Press firmly.','Fry in oil on medium heat 5–6 min each side until golden. Rest.','For sauce: fry onion until soft, add curry powder, cook 2 min.','Add stock, soy sauce and honey. Simmer 15 min until thick.','Slice katsu, serve over rice with curry sauce poured over.']
  },
  {
    id:'thai_green_curry', emoji:'🥘', title:'Thai Green Curry',
    cuisine:'Asian', diff:'Medium', time:30, servings:3,
    spice:'hot', season:['all'],
    desc:'Creamy, aromatic Thai green curry with coconut milk and fresh vegetables.',
    fact:'Green curry is considered the spiciest of Thai curries — the colour comes from fresh green chillies.',
    ingredients:[{amt:'400ml',name:'coconut milk'},{amt:'2 tbsp',name:'Thai green curry paste'},{amt:'300g',name:'chicken breast, sliced'},{amt:'1',name:'courgette, sliced'},{amt:'handful',name:'green beans'},{amt:'2 tbsp',name:'fish sauce'},{amt:'1 tsp',name:'sugar'},{amt:'Fresh basil, lime',name:'to serve'}],
    steps:['Heat a splash of coconut milk in a pan, add curry paste, stir-fry 2 min until fragrant.','Add chicken, cook 4–5 min.','Pour in remaining coconut milk, bring to gentle simmer.','Add courgette and green beans, cook 5 min.','Season with fish sauce and sugar. Taste and adjust.','Serve over jasmine rice with fresh basil and a lime wedge.']
  },
];

// ── TIPS & TRICKS ──
const ALL_TIPS = [
  { id:1, emoji:'🔪', title:'How to chop an onion without crying', category:'Technique', level:'Beginner',
    tip:"Chill the onion in the fridge for 30 minutes before cutting. The cold slows the release of tear-causing compounds. Also keep the root end intact until the very last cut — cutting through the root releases the most irritants." },
  { id:2, emoji:'🧂', title:'Salt your pasta water like the sea', category:'Italian', level:'Beginner',
    tip:"Pasta water should be generously salted — it should taste pleasantly salty. This is your only chance to season the pasta itself. Under-salted pasta can't be fixed with sauce, no matter how good the sauce is." },
  { id:3, emoji:'🍳', title:'Hot pan, then oil — never the other way round', category:'Technique', level:'Beginner',
    tip:"Heat your pan first, THEN add oil. A hot pan with oil added prevents sticking far better than heating both together. If you add oil to a cold pan, the oil breaks down before it reaches proper cooking temperature." },
  { id:4, emoji:'🥩', title:'Always rest meat after cooking', category:'Technique', level:'Beginner',
    tip:"Resting steak or chicken for 5–10 minutes after cooking lets the juices redistribute through the meat. Cut it immediately and all the juice runs out onto your board. Cover loosely with foil — don't wrap tight or it steams." },
  { id:5, emoji:'🧄', title:'Brown garlic slowly — never burn it', category:'Technique', level:'Beginner',
    tip:"Garlic goes from golden and fragrant to black and bitter in seconds. Always add it after your onions are soft, use medium heat, and have your next ingredient ready to go in immediately. Burnt garlic ruins the whole dish." },
  { id:6, emoji:'🍝', title:'Save your pasta water — it\'s liquid gold', category:'Italian', level:'Beginner',
    tip:"A cup of starchy pasta water helps sauce cling to pasta and emulsify. The starch in it is what makes a silky, restaurant-quality sauce. Scoop some out before you drain — you'll almost always use it to finish the dish." },
  { id:7, emoji:'🌡️', title:'Room temperature meat cooks more evenly', category:'Technique', level:'Intermediate',
    tip:"Take chicken, steak or pork out of the fridge 20–30 minutes before cooking. Cold meat in a hot pan means the outside overcooks before the inside reaches safe temperature, leaving you with charred outside and raw inside." },
  { id:8, emoji:'🥚', title:'The egg float test for freshness', category:'Baking', level:'Beginner',
    tip:"Put an egg in cold water. If it sinks and lies flat it's very fresh. If it stands upright it's older but still fine to eat. If it floats, throw it away immediately. The air pocket inside grows as eggs age — that's what you're testing." },
  { id:9, emoji:'🧈', title:'Finish sauces with cold butter off the heat', category:'Technique', level:'Intermediate',
    tip:"Finishing a sauce or risotto with cold butter after removing from the heat adds richness, gloss and body. This technique is called 'monter au beurre' in French cooking. Cut butter into small cubes and swirl in one at a time." },
  { id:10, emoji:'🍜', title:'Maximum heat is the secret to great stir-fry', category:'Asian', level:'Beginner',
    tip:"Stir-fry requires the highest heat your hob can give. This is how restaurants get that smoky 'wok hei' flavour. If your pan isn't smoking hot before you add anything, you're just steaming the vegetables, not frying them." },
  { id:11, emoji:'🧁', title:"Don't overmix cake batter", category:'Baking', level:'Beginner',
    tip:"Once you add flour to wet ingredients, mix only until just combined. Overmixing develops gluten strands which makes cakes dense, rubbery and tough. A few lumps in your batter are completely fine and actually a good sign." },
  { id:12, emoji:'🌶️', title:'Balance heat with acid or dairy, not water', category:'Technique', level:'Intermediate',
    tip:"If a dish is too spicy, adding water actually spreads the capsaicin further. Instead add dairy (cream, yoghurt, cheese, butter) or something acidic (lemon, lime, vinegar). Both neutralise capsaicin molecules effectively." },
  { id:13, emoji:'🍋', title:'Acid brightens every single dish', category:'Technique', level:'Beginner',
    tip:"A squeeze of lemon or lime at the very end of cooking lifts and brightens flavours dramatically. If a dish tastes flat or one-dimensional, try acid before adding more salt. It's the single most underused trick in home cooking." },
  { id:14, emoji:'🫙', title:'Toast your spices before using them', category:'Asian', level:'Intermediate',
    tip:"Dry-toasting whole or ground spices in a pan for 30–60 seconds before using releases their essential oils and deepens their flavour dramatically. Keep them moving constantly and watch carefully — they go from toasted to burnt in seconds." },
  { id:15, emoji:'🍚', title:'Use day-old rice for fried rice — always', category:'Asian', level:'Beginner',
    tip:"Fresh rice is too moist and sticky for frying. It clumps and steams instead of getting those individual, slightly crispy grains. Cook rice the day before, spread it on a tray to cool, then refrigerate uncovered overnight to dry out." },
  { id:16, emoji:'🔥', title:'Actually preheat your oven — fully', category:'Baking', level:'Beginner',
    tip:"Most ovens take 15–20 minutes to fully preheat, not the 5 minutes many people assume. An under-heated oven affects rising times, browning and texture. Get a cheap oven thermometer to discover how accurate (or inaccurate) your oven really is." },
];
