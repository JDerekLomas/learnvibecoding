import type { QuizItem } from '@/components/quiz/types';

export const heatQuestions: QuizItem[] = [
  {
    id: 'heat_01',
    domain: 'physics',
    tags: ['temperature-vs-heat', 'conduction'],
    difficulty: 'beginning',
    title: 'Metal Feels Cold',
    question:
      'A metal spoon and a wooden spoon have been sitting on the kitchen counter all night. You pick them both up. The metal spoon feels colder. Why?',
    correctAnswer:
      'They\'re the same temperature, but metal conducts heat away from your hand faster',
    distractors: [
      'Metal is naturally colder than wood',
      'Metal absorbs cold from the air more efficiently',
      'Wood generates a small amount of heat on its own',
    ],
    explanation:
      'Both objects are at room temperature — the same temperature. But metal is a much better conductor of heat. When you grab it, heat flows out of your warm hand and into the metal quickly, making your hand feel cold. Wood conducts heat slowly, so your hand stays warmer. Your skin senses heat flow, not temperature.',
    misconceptions: [
      'Some materials are inherently colder than others at the same temperature',
    ],
  },
  {
    id: 'heat_02',
    domain: 'physics',
    tags: ['temperature-vs-heat'],
    difficulty: 'beginning',
    title: 'Bathtub vs. Cup',
    question:
      'Which has more thermal energy: a bathtub full of warm water (40°C) or a cup of boiling water (100°C)?',
    correctAnswer: 'The bathtub of warm water',
    distractors: [
      'The cup of boiling water, because it\'s hotter',
      'They have the same thermal energy',
      'It depends on what the cup is made of',
    ],
    explanation:
      'Thermal energy depends on both temperature AND the amount of matter. The bathtub has vastly more water molecules, each carrying kinetic energy. Even though each molecule in the cup is moving faster (higher temperature), the bathtub\'s huge number of molecules gives it far more total thermal energy. Temperature is average energy per molecule; thermal energy is the total.',
    misconceptions: [
      'Higher temperature always means more thermal energy',
    ],
  },
  {
    id: 'heat_03',
    domain: 'physics',
    tags: ['insulation'],
    difficulty: 'beginning',
    title: 'Blanket on a Snowman',
    question:
      'If you wrap a blanket around a snowman, what happens?',
    correctAnswer: 'The snowman melts slower — the blanket insulates it from warmer air',
    distractors: [
      'The snowman melts faster because blankets make things warm',
      'Nothing changes — blankets only work on living things',
      'The snowman gets warmer because the blanket traps heat',
    ],
    explanation:
      'Blankets don\'t create heat — they slow down heat transfer. A blanket on you works because YOUR body generates heat and the blanket traps it. A snowman doesn\'t generate heat. So the blanket just slows down the flow of heat FROM the warm air TO the cold snow. The snowman actually lasts longer with a blanket.',
    misconceptions: [
      'Blankets and jackets generate heat',
    ],
  },
  {
    id: 'heat_04',
    domain: 'physics',
    tags: ['convection'],
    difficulty: 'developing',
    title: 'Heat Rises?',
    question:
      'People say "heat rises." What\'s actually happening?',
    correctAnswer:
      'Hot air is less dense, so it floats upward — the heat doesn\'t rise on its own',
    distractors: [
      'Heat naturally moves upward due to gravity',
      'Warm molecules are lighter and float up individually',
      'Heat rises because cold air pushes it up from below',
    ],
    explanation:
      'Heat itself doesn\'t rise — hot air does. When air is heated, its molecules spread out, making it less dense than the cooler air around it. The denser cold air sinks underneath and pushes the warm air up, like a bubble floating in water. This is convection. In space, where there\'s no gravity, "heat rises" doesn\'t happen at all.',
    misconceptions: [
      'Heat is a substance that naturally moves upward',
    ],
  },
  {
    id: 'heat_05',
    domain: 'physics',
    tags: ['radiation'],
    difficulty: 'developing',
    title: 'Sun Through Space',
    question:
      'How does heat from the Sun reach Earth? Space is a vacuum — there\'s nothing in between.',
    correctAnswer:
      'Radiation — electromagnetic waves (mostly infrared and visible light) travel through the vacuum',
    distractors: [
      'Convection — heated space gas carries the warmth',
      'Conduction — heat travels through tiny particles floating in space',
      'Solar wind physically carries hot particles to Earth',
    ],
    explanation:
      'In a vacuum, there\'s no matter for conduction or convection to work with. Instead, the Sun emits electromagnetic radiation — light, infrared, and ultraviolet waves — that travel through empty space at the speed of light. When these waves hit Earth, they\'re absorbed by the atmosphere and surface, converting to thermal energy. Radiation is the only way heat can travel through a vacuum.',
    misconceptions: [
      'Heat can only travel through physical matter',
    ],
  },
  {
    id: 'heat_06',
    domain: 'physics',
    tags: ['phase-changes'],
    difficulty: 'developing',
    title: 'Ice at Zero',
    question:
      'You take ice out of the freezer at -5°C and start heating it. The temperature rises to 0°C, then... stops rising for a while, even though you\'re still adding heat. Why?',
    correctAnswer:
      'The heat energy is being used to break bonds between molecules (melting) instead of raising temperature',
    distractors: [
      'The thermometer is broken or stuck',
      'Ice can\'t absorb heat once it reaches 0°C',
      'The heat is escaping into the air at the same rate you\'re adding it',
    ],
    explanation:
      'During a phase change (melting or boiling), all the heat energy goes into breaking the bonds holding molecules in their solid structure — not into making them move faster. Since temperature measures molecular speed, the temperature plateaus. This "hidden heat" is called latent heat. You\'re adding energy, but the thermometer won\'t budge until all the ice has melted.',
    misconceptions: [
      'Adding heat to something always raises its temperature',
    ],
  },
  {
    id: 'heat_07',
    domain: 'physics',
    tags: ['phase-changes', 'specific-heat'],
    difficulty: 'proficient',
    title: 'Steam Burns',
    question:
      'Why does getting burned by steam at 100°C hurt more than getting burned by boiling water at 100°C?',
    correctAnswer:
      'Steam releases extra energy (latent heat) as it condenses back into liquid on your skin',
    distractors: [
      'Steam is actually hotter than 100°C',
      'Steam has more pressure and pushes harder on your skin',
      'Water vapor molecules move faster than liquid water molecules',
    ],
    explanation:
      'Steam and boiling water are both at 100°C, but steam is carrying a hidden payload of energy. When steam condenses on your skin, it releases all the latent heat that was used to turn it from liquid to gas in the first place. That\'s a LOT of extra energy — about 2,260 joules per gram — dumped directly onto your skin BEFORE the 100°C water then cools down further. Double whammy.',
    misconceptions: [
      'If two things are the same temperature, they can cause the same burn',
    ],
  },
  {
    id: 'heat_08',
    domain: 'physics',
    tags: ['radiation'],
    difficulty: 'beginning',
    title: 'Dark vs. Light Clothing',
    question:
      'Why do people wear light-colored clothing in hot, sunny weather?',
    correctAnswer:
      'Light colors reflect more radiation from the sun, so less heat is absorbed',
    distractors: [
      'Light-colored fabric is thinner and lets more air through',
      'Dark colors trap heat inside the fabric fibers',
      'Light colors produce a cooling effect when sunlight hits them',
    ],
    explanation:
      'Dark colors absorb more electromagnetic radiation (light and infrared) from the sun, converting it to thermal energy — heat in the fabric and your skin underneath. Light colors reflect most of that radiation away. This is why a black car parked in the sun gets scorching hot while a white car stays noticeably cooler. Same sunlight, different absorption.',
    misconceptions: [
      'Color only affects appearance, not temperature',
    ],
  },
  {
    id: 'heat_09',
    domain: 'physics',
    tags: ['conduction', 'insulation'],
    difficulty: 'developing',
    title: 'Double-Pane Windows',
    question:
      'Why are double-pane windows (two layers of glass with air between them) better insulators than single-pane windows?',
    correctAnswer:
      'The trapped air between the panes is a poor conductor, slowing heat transfer',
    distractors: [
      'Two panes of glass are twice as hard to break',
      'The air gap creates a vacuum that blocks all heat',
      'The extra glass reflects heat back inside the room',
    ],
    explanation:
      'Glass conducts heat relatively well. A single pane lets heat flow right through. But air is a terrible conductor — it traps easily and doesn\'t pass heat along well. The air gap between double panes acts as an insulating barrier. It also prevents convection (the gap is too thin for air currents to form). Some windows use argon gas, which conducts even less than air.',
    misconceptions: [
      'More material always means better insulation',
    ],
  },
  {
    id: 'heat_10',
    domain: 'physics',
    tags: ['specific-heat'],
    difficulty: 'proficient',
    title: 'Beach Sand vs. Ocean',
    question:
      'At the beach on a sunny day, the sand is burning hot but the ocean water is still cool. Both get the same sunlight. Why?',
    correctAnswer:
      'Water has a much higher specific heat capacity — it takes more energy to raise its temperature',
    distractors: [
      'Sand is darker and absorbs more sunlight',
      'Ocean waves carry the heat away',
      'Sand is a solid and solids always heat up faster than liquids',
    ],
    explanation:
      'Specific heat capacity measures how much energy it takes to raise the temperature of a substance. Water\'s specific heat is about 5 times higher than sand\'s. So the same amount of sunlight raises sand\'s temperature much more. This is also why coastal cities have milder temperatures than inland ones — the ocean acts as a giant heat buffer, warming slowly and cooling slowly.',
    misconceptions: [
      'Everything heats up at the same rate when given the same energy',
    ],
  },
  {
    id: 'heat_11',
    domain: 'physics',
    tags: ['conduction'],
    difficulty: 'beginning',
    title: 'Stirring a Pot',
    question:
      'You\'re stirring a pot of soup with a metal spoon. After a few minutes, the handle gets hot. How did the heat travel up the spoon?',
    correctAnswer:
      'Conduction — vibrating molecules at the hot end passed energy along to neighboring molecules up the handle',
    distractors: [
      'Convection — hot air from the soup rose up and heated the handle',
      'Radiation — the soup emitted infrared waves that heated the metal',
      'The metal expanded and created friction that generated heat',
    ],
    explanation:
      'Conduction is heat transfer through direct molecular contact. The hot soup makes molecules at the bottom of the spoon vibrate faster. Those molecules bump into their neighbors, passing along kinetic energy, which bumps into the next neighbors, and so on up the handle. This chain reaction of molecular vibration is conduction. Metals are great conductors because they have free-flowing electrons that help pass energy even faster.',
    misconceptions: [
      'Heat can only travel through a material if the material is hollow',
    ],
  },
  {
    id: 'heat_12',
    domain: 'physics',
    tags: ['convection'],
    difficulty: 'developing',
    title: 'Boiling Water Circulation',
    question:
      'When you heat a pot of water from the bottom, the water circulates — hot water rises and cool water sinks. What drives this circulation?',
    correctAnswer:
      'Density differences — heated water expands and becomes less dense, so it rises while cooler, denser water sinks',
    distractors: [
      'The bubbles from the bottom push the water upward',
      'Steam pressure on the surface pushes cool water down',
      'The stove creates magnetic currents in the water',
    ],
    explanation:
      'This is convection — heat transfer through the bulk movement of fluid. Water at the bottom absorbs heat and expands slightly, making it less dense. Less dense things float (like a hot air balloon), so the warm water rises. Meanwhile, the cooler, denser water at the top sinks to take its place. This creates a circular current — a convection cell — that distributes heat throughout the pot.',
    misconceptions: [
      'Convection happens because heat naturally moves upward',
    ],
  },
  {
    id: 'heat_13',
    domain: 'physics',
    tags: ['temperature-vs-heat'],
    difficulty: 'proficient',
    title: 'Spark vs. Bath',
    question:
      'A tiny spark from a campfire is at about 1,500°C. A warm bath is at 40°C. Why can you sit in the bath but a spark barely hurts?',
    correctAnswer:
      'The spark has extremely little thermal energy (tiny mass), even though its temperature is high',
    distractors: [
      'The spark cools down instantly in the air',
      'Your skin can handle any temperature for less than a second',
      'Sparks are not actually that hot — the glow is misleading',
    ],
    explanation:
      'This is the difference between temperature and thermal energy again. The spark has a very high temperature (fast-moving molecules), but it\'s made of a tiny amount of matter. Its total thermal energy is minuscule. The bath has vastly more thermal energy because of its enormous mass. When the spark touches your skin, it has almost no energy to transfer. The bath could burn you badly if it were just 20° hotter.',
    misconceptions: [
      'Temperature alone determines how dangerous something is',
    ],
  },
  {
    id: 'heat_14',
    domain: 'physics',
    tags: ['insulation'],
    difficulty: 'developing',
    title: 'Thermos Bottle',
    question:
      'A thermos keeps hot drinks hot AND cold drinks cold. How does one device do both?',
    correctAnswer:
      'It slows all heat transfer (conduction, convection, and radiation) — keeping whatever temperature is inside',
    distractors: [
      'It has a heater for hot drinks and a cooler for cold drinks',
      'The vacuum inside generates whatever temperature is needed',
      'The special material adapts to detect and maintain the drink\'s temperature',
    ],
    explanation:
      'A thermos doesn\'t add or remove heat — it just prevents heat from moving. The vacuum between the walls eliminates conduction and convection (no matter to transfer through). The reflective coating reduces radiation. Since heat can\'t easily flow in OR out, hot things stay hot and cold things stay cold. It\'s not "smart" — it\'s just a really good insulator that fights all three types of heat transfer.',
    misconceptions: [
      'A thermos actively heats or cools its contents',
    ],
  },
  {
    id: 'heat_15',
    domain: 'physics',
    tags: ['conduction', 'insulation'],
    difficulty: 'proficient',
    title: 'Pot Holders',
    question:
      'Oven mitts are thick and fluffy. Why is trapping air pockets the key to good insulation?',
    correctAnswer:
      'Air is a poor conductor of heat, and small pockets prevent convection — so heat transfer is minimized',
    distractors: [
      'Air absorbs heat and converts it to kinetic energy',
      'The fluffy material reflects heat like a mirror',
      'Air pockets create a cooling effect through expansion',
    ],
    explanation:
      'Air itself is a terrible conductor — heat moves through it very slowly by conduction. The trick is keeping the air still. In an open space, air would circulate (convection) and carry heat anyway. But tiny pockets in fluffy material trap the air so it can\'t circulate. You get the insulating benefit of air without the convection problem. This is the same principle behind down jackets, foam cups, and fiberglass insulation in your walls.',
    misconceptions: [
      'Thick material insulates because it takes heat longer to travel through solid stuff',
    ],
  },
  {
    id: 'heat_16',
    domain: 'physics',
    tags: ['radiation'],
    difficulty: 'developing',
    title: 'Campfire Warmth',
    question:
      'You can feel the warmth of a campfire from several feet away, even though air is a poor conductor. How is the heat reaching you?',
    correctAnswer:
      'Radiation — the fire emits infrared electromagnetic waves that travel through air to your skin',
    distractors: [
      'Convection — the hot air blows toward you',
      'Conduction — heat travels through the ground to your feet',
      'Sound waves from the crackling fire carry thermal energy',
    ],
    explanation:
      'The warmth you feel from a campfire at a distance is almost entirely radiation — infrared electromagnetic waves emitted by the hot flames and coals. These waves travel at the speed of light and don\'t need air (or anything) to travel through. You can test this: put your hand to the side of the fire versus above it. Side = radiation (warm). Above = convection AND radiation (very hot, because rising hot air adds to it).',
    misconceptions: [
      'You can only feel distant heat because hot air drifts toward you',
    ],
  },
  {
    id: 'heat_17',
    domain: 'physics',
    tags: ['specific-heat', 'phase-changes'],
    difficulty: 'proficient',
    title: 'Sweating Works',
    question:
      'Why does sweating cool you down?',
    correctAnswer:
      'Evaporating sweat absorbs latent heat from your skin as liquid water changes to water vapor',
    distractors: [
      'The wet layer of sweat blocks heat from the sun',
      'Moving air blows the heat off your wet skin',
      'Sweat is cooler than your body temperature',
    ],
    explanation:
      'When liquid water evaporates, it needs energy to break the bonds holding molecules together (latent heat of vaporization). That energy comes from your skin. Each gram of sweat that evaporates removes about 2,260 joules of heat from your body. This is incredibly efficient cooling. It\'s also why humid days feel so miserable — when the air is already saturated with water vapor, your sweat can\'t evaporate easily, and the cooling mechanism fails.',
    misconceptions: [
      'Sweating cools you because the liquid itself is cold',
    ],
  },
  {
    id: 'heat_18',
    domain: 'physics',
    tags: ['temperature-vs-heat', 'conduction'],
    difficulty: 'beginning',
    title: 'Tile Floor vs. Carpet',
    question:
      'Your bathroom tile floor feels much colder than the carpet in your bedroom in the morning. Are they actually different temperatures?',
    correctAnswer:
      'No — they\'re the same temperature, but tile conducts heat away from your feet faster',
    distractors: [
      'Yes — tile is colder because it\'s closer to the ground',
      'Yes — carpet absorbs heat from the room while tile doesn\'t',
      'No — but your feet are wetter in the bathroom so they feel colder',
    ],
    explanation:
      'Overnight, everything in your house reaches the same temperature (thermal equilibrium). The tile and carpet are the same temperature! But tile is a good conductor — when your warm foot touches it, heat rushes out quickly, making it FEEL cold. Carpet is a poor conductor (all those fluffy fibers trap air), so heat leaves your foot slowly. Your brain interprets the rate of heat loss as "temperature," but it\'s really about conductivity.',
    misconceptions: [
      'How cold something feels tells you its actual temperature',
    ],
  },
  {
    id: 'heat_19',
    domain: 'physics',
    tags: ['convection', 'insulation'],
    difficulty: 'developing',
    title: 'Layering Clothes',
    question:
      'Why do multiple thin layers keep you warmer than one thick layer of the same total thickness?',
    correctAnswer:
      'Each layer traps a thin layer of air between it, and still air is an excellent insulator',
    distractors: [
      'More layers means more fabric, which always means more warmth',
      'Friction between the layers generates additional heat',
      'Each layer reflects your body heat back like mirrors',
    ],
    explanation:
      'The secret is the air gaps. Each layer of clothing traps a thin layer of still air against the fabric. Since air is a poor conductor and the thin gaps prevent convection, each air layer acts as insulation. Three thin layers create two extra air gaps compared to one thick layer. Plus, you can remove layers to regulate temperature — a thick single layer is all or nothing.',
    misconceptions: [
      'The fabric itself provides all the warmth in clothing',
    ],
  },
  {
    id: 'heat_20',
    domain: 'physics',
    tags: ['radiation', 'specific-heat'],
    difficulty: 'proficient',
    title: 'Land Breeze and Sea Breeze',
    question:
      'During the day, wind blows from the ocean toward land (sea breeze). At night, it reverses (land breeze). Why?',
    correctAnswer:
      'Land heats and cools faster than water, creating changing air pressure differences that drive the wind',
    distractors: [
      'The moon\'s gravity pulls air toward the ocean at night',
      'Ocean waves create wind that reverses with the tides',
      'Trees on land release gases at night that push air toward the sea',
    ],
    explanation:
      'Water has a high specific heat — it heats up and cools down slowly. Land has a low specific heat — it heats up and cools down fast. During the day, land gets much hotter than the ocean. Hot air over land rises, and cooler ocean air rushes in to fill the gap (sea breeze). At night, land cools quickly while the ocean stays relatively warm. Now the warm air over the ocean rises, and cool land air flows out to replace it (land breeze). Specific heat drives weather.',
    misconceptions: [
      'Wind patterns are random and not connected to heat transfer',
    ],
  },
];
