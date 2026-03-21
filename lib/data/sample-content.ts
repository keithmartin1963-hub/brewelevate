// Full body content for buying guides
// In production this would come from a CMS (MDX, Sanity, Contentful, etc.)
// Here it's stored as structured content blocks for clean rendering

export interface ContentBlock {
  type: 'paragraph' | 'heading' | 'tip' | 'warning' | 'quote' | 'list'
  level?: 2 | 3
  text?: string
  items?: string[]
}

export const guideContent: Record<string, ContentBlock[]> = {

  'best-espresso-machines-under-1000': [
    { type: 'paragraph', text: 'Espresso is unforgiving. More than any other brewing method, the machine and grinder you choose directly dictates the ceiling on your shot quality. The good news: you no longer need to spend $3,000 to pull genuinely excellent espresso at home. The sub-$1,000 market has matured dramatically over the past three years.' },
    { type: 'paragraph', text: 'We pulled shots on 14 machines over six weeks — different beans, different grind settings, different roast profiles. The five machines in this guide are the ones we\'d actually recommend to people we know.' },
    { type: 'heading', level: 2, text: 'What we tested for' },
    { type: 'paragraph', text: 'Our testing protocol covered five dimensions: shot quality (extraction consistency, crema quality, flavour clarity), ease of use (learning curve, daily workflow), build quality (materials, long-term durability), steam performance (microfoam texture for lattes), and value (price-to-performance ratio at the category level).' },
    { type: 'tip', text: 'The single biggest quality upgrade you can make to any espresso setup is not the machine — it\'s the grinder. A $300 machine with a quality burr grinder will consistently outperform a $800 machine with the included grinder.' },
    { type: 'heading', level: 2, text: 'How to read this guide' },
    { type: 'paragraph', text: 'We\'ve structured the top picks by use case, not just price. The "best overall" pick isn\'t necessarily the most expensive — it\'s the one that delivers the best combination of shot quality, ease of use, and value for the widest range of home baristas.' },
    { type: 'list', items: [
      'Best Overall — the machine we\'d recommend to most people, most of the time',
      'Best Budget — under $300, genuine espresso (not pod) quality',
      'Best for Beginners — lowest learning curve without sacrificing too much quality',
      'Best All-in-One — built-in grinder, one-device workflow',
      'Best Upgrade — for people ready to move beyond entry-level',
    ]},
    { type: 'heading', level: 2, text: 'The pressure myth' },
    { type: 'paragraph', text: 'You\'ll see machines advertised as "15-bar" or "19-bar" pumps. This is almost entirely a marketing number. What matters is the actual brew pressure, which should be 9 bar. Every machine on this list achieves proper 9-bar extraction — either via internal OPV (over-pressure valve) regulation or precise pump calibration.' },
    { type: 'warning', text: 'Any machine that doesn\'t regulate down to 9 bar will over-extract your espresso regardless of how well you grind and dose. This is a non-negotiable spec — not a premium feature.' },
    { type: 'heading', level: 2, text: 'Grinder pairing recommendations' },
    { type: 'paragraph', text: 'If you\'re buying a machine without a built-in grinder, we recommend pairing it with the Baratza Encore ESP ($230) at minimum. For machines in the $400–$700 range, consider the Eureka Mignon Filtro or upgrading to a Niche Zero if budget allows. The quality gap between blade grinders and entry-level burr grinders is far larger than the gap between mid-range and premium espresso machines.' },
  ],

  'best-burr-coffee-grinders': [
    { type: 'paragraph', text: 'If there\'s one piece of advice that applies universally to home espresso: buy the best grinder you can afford before you spend more on a machine. A $200 grinder paired with a $300 machine will produce better espresso than a $700 all-in-one with a compromised built-in grinder.' },
    { type: 'paragraph', text: 'Burr grinders work by crushing beans between two abrasive surfaces, producing particles of consistent size. Consistent particle size means consistent extraction. Blade grinders chop randomly — some particles are dust, some are boulder-sized — and your shot reflects that chaos.' },
    { type: 'heading', level: 2, text: 'Conical vs flat burrs' },
    { type: 'paragraph', text: 'Conical burrs run slower (less heat, less oxidation), retain less coffee between sessions, and are more forgiving of slightly uneven grind settings. They\'re the right choice for most home baristas. Flat burrs produce a more uniform particle distribution at the cost of higher RPM, more heat, and more retention — meaningful for competition use, less so at home.' },
    { type: 'tip', text: 'For espresso, conical burr grinders at 40mm or larger (like the Baratza Encore ESP\'s 40mm burrs or the Niche Zero\'s 63mm burrs) will serve most home baristas extremely well. Flat burr grinders become genuinely impactful at the $600+ range.' },
    { type: 'heading', level: 2, text: 'Stepped vs stepless adjustment' },
    { type: 'paragraph', text: 'Stepped grinders have discrete adjustment positions (the Encore ESP has 40). Stepless grinders allow infinite adjustment between any two points. For dialling in espresso, stepless is theoretically more precise — but 40 well-spaced steps covers the espresso range adequately for most beans and roasts.' },
    { type: 'heading', level: 2, text: 'Single-dose vs hopper workflow' },
    { type: 'paragraph', text: 'Traditional hopper grinders hold 200–400g of beans and grind on demand. Single-dose grinders (like the Niche Zero) are designed to grind exactly what you weigh out — typically 16–20g — with near-zero retention. Single-dose is better for variety: switching beans daily without waste or staleness.' },
    { type: 'list', items: [
      'Hopper workflow: load beans once, grind multiple shots — better for dedicated single-bean setups',
      'Single-dose workflow: weigh each dose, load, grind, pull — better for rotating between beans',
      'Retention matters: even 0.5g of retained coffee from the previous dose affects your next shot',
      'The Niche Zero\'s <0.1g retention is the benchmark the rest of the market is chasing',
    ]},
    { type: 'heading', level: 2, text: 'Grind setting: start here' },
    { type: 'paragraph', text: 'When dialling in with a new grinder, start at the manufacturer\'s recommended espresso setting and adjust from there. Shots pulling in under 20 seconds = grind finer. Over 35 seconds = grind coarser. Change one variable (grind only) until you\'re in the 25–35 second window, then adjust dose and yield to taste.' },
  ],

  'best-milk-frothers': [
    { type: 'paragraph', text: 'The difference between good espresso and a great latte is almost entirely about the milk. Espresso machines with a manual steam wand give you full control — temperature, texture, incorporation. Automatic frothers trade control for convenience. Neither is wrong; it depends entirely on what you value.' },
    { type: 'paragraph', text: 'We tested 11 frothers across three categories: handheld wand frothers, automatic electric frothers (the pitcher-on-a-base style), and steam wands (both standalone and machine-integrated). The results were clear on one thing: if you want latte art, you need a steam wand.' },
    { type: 'heading', level: 2, text: 'Handheld frothers' },
    { type: 'paragraph', text: 'Battery-powered wand frothers (the Aeroccino-style devices) cost $10–$30 and produce decent froth for cappuccinos and simple lattes. The bubbles are larger and less stable than steam-wand microfoam — acceptable for home use, not suitable for latte art. If you\'re pulling espresso on a machine without a steam wand, a $15 handheld frother is a completely reasonable choice.' },
    { type: 'heading', level: 2, text: 'Automatic electric frothers' },
    { type: 'paragraph', text: 'Devices like the Breville Milk Café or Nespresso Aeroccino 4 heat and froth milk automatically, producing consistent results with no learning curve. The texture is between handheld and steam-wand quality — better than a whisk frother, not as good as a practiced steam wand. Ideal for people who want a reliable latte without any barista skill.' },
    { type: 'tip', text: 'Whole milk froths best. Oat milk (specifically Oatly Barista edition) steams almost as well as whole milk. Almond milk is the most difficult — it can separate at high temperatures.' },
    { type: 'heading', level: 2, text: 'Steam wands' },
    { type: 'paragraph', text: 'A machine with a good steam wand and 10 minutes of practice will outperform any automatic frother for latte quality. The learning curve is real but short — most people produce acceptable microfoam within a week of daily practice. The technique: submerge the tip just below the surface, introduce air for the first 2–3 seconds, then submerge fully to heat and spin the milk.' },
    { type: 'warning', text: 'Single boiler machines require you to wait for the boiler to repressurize between pulling a shot and steaming milk. This 30–60 second wait is the primary trade-off of budget machines. If you want simultaneous brewing and steaming, look for thermoblock or dual-boiler machines.' },
  ],
}

// Full body content for blog posts
export const postContent: Record<string, ContentBlock[]> = {

  'how-to-dial-in-espresso': [
    { type: 'paragraph', text: 'Every new bag of coffee, every season change, every humidity shift requires a fresh dial-in. This isn\'t a flaw in the process — it\'s the nature of espresso. The variables are real and they interact. Your job is to develop a systematic approach so that \'dialling in\' takes 15 minutes, not 2 hours.' },
    { type: 'heading', level: 2, text: 'The three variables' },
    { type: 'paragraph', text: 'Every espresso shot is defined by three numbers: dose (grams of coffee in), yield (grams of liquid espresso out), and time (seconds from first drop to last). These are your dials. Everything else — grind size, tamp pressure, distribution technique — is a means to controlling these three numbers.' },
    { type: 'list', items: [
      'Dose: typically 17–19g for a double. Start at 18g and don\'t change it until you\'ve locked in grind and yield.',
      'Yield: typically 36–38g out for a 1:2 ratio. 18g in → 36g out is the starting point for most espresso.',
      'Time: 25–35 seconds from first drop. Under 20 seconds is under-extracted (sour). Over 40 seconds is over-extracted (bitter).',
    ]},
    { type: 'heading', level: 2, text: 'Step 1: Fix your dose' },
    { type: 'paragraph', text: 'Weigh 18g of freshly ground coffee into your portafilter. Do this every time, for every shot, until you\'ve dialled in. Eyeballing defeats the purpose — a 1g variation in dose changes your extraction time by 3–5 seconds. Use a scale with 0.1g resolution.' },
    { type: 'heading', level: 2, text: 'Step 2: Fix your target yield' },
    { type: 'paragraph', text: 'Set a scale under your cup. Target 36g of liquid espresso. Stop the shot when you hit it. Don\'t let it run to completion — espresso gets bitter in the last 5–10% of extraction. Pull your double to 36g, regardless of time, for the first few adjustments.' },
    { type: 'tip', text: 'An espresso scale that auto-starts when it detects the first drops makes this dramatically easier. The Acaia Pearl or Timemore Black Mirror Basic Pro are both worth the investment if you\'re serious about dialling in.' },
    { type: 'heading', level: 2, text: 'Step 3: Adjust grind only' },
    { type: 'paragraph', text: 'Pull your first shot and record the time. Under 20 seconds: grind finer by one step. Over 35 seconds: grind coarser by one step. Move in small increments. Don\'t skip steps. Change grind size only — don\'t touch dose or yield until you\'re in the 25–35 second window.' },
    { type: 'heading', level: 2, text: 'Step 4: Taste, then refine' },
    { type: 'paragraph', text: 'Once your shot is pulling in 25–35 seconds, taste it. Sour or sharp? You\'re still slightly under-extracted — grind one step finer. Bitter or dry? You\'re slightly over-extracted — grind one step coarser. A balanced shot has sweetness, some acidity, and a clean finish. Crema should be reddish-brown and persist for at least 30 seconds.' },
    { type: 'heading', level: 2, text: 'When the beans change' },
    { type: 'paragraph', text: 'Fresh beans (roasted within 2 weeks) off-gas CO₂ and resist water — they need a coarser grind. Older beans (4+ weeks) absorb water more readily — they need a finer grind. Light roasts are denser and need finer grinds than dark roasts at the same dose. Every new bag is a fresh dial-in.' },
    { type: 'quote', text: 'Repeatability is the goal, not a perfect single shot. When your process is tight enough to pull the same shot three mornings in a row, you\'ve dialled in.' },
  ],

  'single-origin-vs-blends': [
    { type: 'paragraph', text: 'Specialty coffee culture has developed strong opinions on this. The short version: blends exist for espresso for a reason, single origins are genuinely exciting, and the "right" choice depends entirely on what you want from your cup.' },
    { type: 'heading', level: 2, text: 'Why blends were invented' },
    { type: 'paragraph', text: 'Traditional Italian espresso blends emerged from a practical problem: consistency. A blend of 3–5 coffees from different origins, roasted to complement each other, produces a predictable result year-round regardless of seasonal variation in any single component. The Illycaffè approach — blending up to 9 origins — is an extreme version of the same philosophy.' },
    { type: 'paragraph', text: 'A well-designed espresso blend typically aims for: a base of Brazilian or Colombian for body and chocolate notes, something from Ethiopia or Kenya for acidity and fruit, and sometimes a Robusta component for crema and caffeine. The result is deliberately balanced — not exciting, but consistent.' },
    { type: 'heading', level: 2, text: 'The case for single origins' },
    { type: 'paragraph', text: 'A washed Ethiopian Yirgacheffe pulled as espresso is unlike anything a blend can produce — jasmine, stone fruit, bergamot. A natural Geisha from Panama is equally transformative. Single origins let the terroir of a specific farm, a specific harvest, a specific processing method speak clearly.' },
    { type: 'tip', text: 'Light-roasted single origins are significantly harder to dial in for espresso — they\'re denser, require finer grinds, and have a narrower extraction window. If you\'re newer to espresso, start with a medium-roasted single origin or a quality espresso blend before experimenting with light roasts.' },
    { type: 'heading', level: 2, text: 'Practically speaking' },
    { type: 'paragraph', text: 'For milk drinks (lattes, flat whites, cappuccinos), blends almost always work better. The milk obscures the delicate aromatics that make single origins interesting, while the body and chocolate notes of a well-made blend hold up cleanly through the milk. For black espresso or macchiatos, single origins reward the attention.' },
    { type: 'list', items: [
      'Milk-based drinks → espresso blend (body and chocolate cut through milk better)',
      'Black espresso / macchiato → single origin (aromatics and terroir come through)',
      'Experimenting with flavour → rotate single origins by region',
      'Consistency is the priority → stay with a quality blend',
      'Beginner setup → start with a medium-roasted blend, add single origins later',
    ]},
  ],

  'best-coffee-accessories-under-50': [
    { type: 'paragraph', text: 'Not every improvement to your home coffee setup requires a significant investment. Some of the highest-impact upgrades cost less than a bag of specialty coffee. Here are the accessories we actually use and recommend — ranked by how much they improve the daily experience.' },
    { type: 'heading', level: 2, text: '1. A basic espresso scale ($20–$40)' },
    { type: 'paragraph', text: 'If you\'re pulling espresso without weighing your dose and yield, you\'re guessing. A scale with 0.1g resolution and a timer is the single most impactful piece of gear under $50. The Timemore Black Mirror Nano ($40) and Hario V60 Drip Scale ($35) are both excellent. For espresso specifically, look for fast response time and 0.1g resolution.' },
    { type: 'heading', level: 2, text: '2. A distribution tool / WDT ($15–$35)' },
    { type: 'paragraph', text: 'Channelling — where water finds a path of least resistance through the puck — is the most common cause of uneven extraction. A WDT (Weiss Distribution Technique) tool breaks up clumps and distributes grounds evenly before tamping. At $15–$20 for a decent one, it\'s the cheapest meaningful improvement to shot consistency.' },
    { type: 'heading', level: 2, text: '3. A proper tamper ($25–$45)' },
    { type: 'paragraph', text: 'The tamper that comes with most machines is undersized and awkward. A flat-bottomed tamper that fits your basket diameter (58mm for most commercial-style machines, 54mm for Breville) makes tamping more consistent. The Luxhaus 58mm calibrated tamper at $35 is hard to beat at this price.' },
    { type: 'tip', text: 'Tamping pressure matters less than tamping level. An angled tamp creates a path of least resistance and causes channelling. Focus on keeping the tamper perfectly flat and applying even pressure — 15–20kg is plenty.' },
    { type: 'heading', level: 2, text: '4. A coffee storage container ($20–$45)' },
    { type: 'paragraph', text: 'Freshly roasted coffee degrades significantly with oxygen exposure. An airtight container with a one-way valve (lets CO₂ out, keeps O₂ out) extends peak flavour from days to weeks. The Fellow Atmos or Airscape both work well. Avoid containers that let in light — store on a shelf, not a counter.' },
    { type: 'heading', level: 2, text: '5. A proper milk jug / pitcher ($15–$30)' },
    { type: 'paragraph', text: 'If you\'re steaming milk, the jug matters. A 350ml stainless pitcher for single lattes, or 600ml for doubles. The spout shape affects your ability to pour latte art — a narrower spout gives more control. Rattleware and Motta are reliable at the $20–$25 price point.' },
    { type: 'list', items: [
      'Timemore / Hario scale: immediate improvement to extraction consistency',
      'WDT tool: fixes channelling, the #1 cause of sour shots',
      'Proper tamper: better consistency than a calibrated tamper is a flat-base tamper used consistently',
      'Airtight container: extends bean freshness from days to 2–3 weeks',
      'Good milk pitcher: essential if you want to progress toward latte art',
    ]},
  ],
}

// Setup guide content blocks
export const setupContent: Record<string, ContentBlock[]> = {

  'minimalist-espresso-setup': [
    { type: 'paragraph', text: 'The minimalist approach to espresso is about deliberate choices. Every item on the counter should earn its place — not through compromise, but through considered curation. Three pieces of equipment, kept to the essentials, producing shots that rival what most cafés serve.' },
    { type: 'paragraph', text: 'This setup works for people who want a clean counter, a focused workflow, and genuinely excellent espresso — without the complexity of a multi-device professional setup. It\'s not about spending less. It\'s about spending deliberately.' },
    { type: 'heading', level: 2, text: 'The philosophy' },
    { type: 'paragraph', text: 'Choose each piece for what it does exceptionally well, accept its trade-offs, and don\'t buy things you don\'t need. A single grinder, a single machine, a single kettle. Everything else — scales, a tamper, a jug — lives in a drawer when not in use.' },
    { type: 'heading', level: 2, text: 'The anchor: your espresso machine' },
    { type: 'paragraph', text: 'The Breville Barista Express suits this setup well precisely because the grinder is integrated — one device on the counter does two jobs. For a cleaner aesthetic with a separate grinder, the Breville Bambino Plus is narrower (7.5") and pairs well with any burr grinder on the market.' },
    { type: 'heading', level: 2, text: 'The detail: Fellow Stagg EKG kettle' },
    { type: 'paragraph', text: 'The Stagg EKG isn\'t just a kettle — it\'s the thing people notice first on a coffee counter. The matte black finish, the LCD display, the precision pour spout. It earns its counter space by being genuinely useful (the best pour-over kettle available) and genuinely beautiful.' },
    { type: 'tip', text: 'The Stagg EKG holds temperature perfectly for 60 minutes on hold mode. Set it to 93°C when you wake up and it\'s ready for your shot without any waiting.' },
    { type: 'heading', level: 2, text: 'The invisible work: a scale' },
    { type: 'paragraph', text: 'A good scale lives under the group head, not on display. The Acaia Pearl is the professional standard — 0.1g resolution, auto-tare, flow rate display. The Timemore Black Mirror is equally capable at half the price. Either way: weigh your dose in, weigh your yield out, record the time. Every shot.' },
  ],

  'luxury-coffee-station': [
    { type: 'paragraph', text: 'The luxury home coffee station isn\'t about excess. It\'s about removing every constraint — temperature stability, grind consistency, workflow efficiency — so that the only limit on your espresso quality is your technique and your beans. This is the setup professional baristas build when they want to replicate café quality at home.' },
    { type: 'paragraph', text: 'We\'re talking about a proper dual-boiler machine, a standalone precision grinder, a calibrated kettle, a high-resolution scale, and the small accessories that make the daily workflow feel intentional rather than improvised.' },
    { type: 'heading', level: 2, text: 'Why dual boiler changes everything' },
    { type: 'paragraph', text: 'Single boiler machines share one thermal mass for brewing and steaming. You pull your shot, wait 30–45 seconds for the boiler to repressurize, then steam. Dual boiler machines maintain two independent boilers simultaneously — you can steam immediately after pulling a shot, or before. The workflow difference is substantial for any drink involving milk.' },
    { type: 'heading', level: 2, text: 'The grinder is the ceiling' },
    { type: 'paragraph', text: 'At this level, the Niche Zero or a Lagom P64 sets the ceiling for what\'s possible. The Niche Zero\'s near-zero retention means no stale coffee from the previous dose contaminating your next shot. Its 63mm conical burrs produce exceptional grind uniformity across the full espresso range from ristretto to lungo.' },
    { type: 'quote', text: 'The Niche Zero is the grinder I\'d buy if I were building a home setup with no compromise. The stepless adjustment, the zero retention, the build quality — nothing at twice the price does meaningfully better for home use.' },
    { type: 'heading', level: 2, text: 'The accessories that complete it' },
    { type: 'paragraph', text: 'At this level, small details matter. A dosing cup that matches your portafilter size eliminates mess. A quality tamper stand keeps the counter clear. The Acaia Pearl scale under the group head. A Fellow Stagg EKG for pour-over experiments on off days. These aren\'t extras — at this price point, they\'re part of the system.' },
  ],

  'small-space-setup': [
    { type: 'paragraph', text: 'A small kitchen shouldn\'t mean a compromised coffee setup. The constraints of a studio apartment or galley kitchen force better decisions — every piece of equipment has to justify its counter footprint. The result, done well, is often more intentional than a sprawling setup with no limits.' },
    { type: 'paragraph', text: 'The key to a small-space coffee setup is vertical thinking and multi-use equipment. A slim machine, a compact grinder, a kettle that doubles as pour-over and espresso prep tool. Everything else in a drawer.' },
    { type: 'heading', level: 2, text: 'Machine footprint comparison' },
    { type: 'list', items: [
      'Breville Bambino Plus: 7.5" wide × 12.6" deep — the slimmest quality espresso machine available',
      'Breville Barista Express: 13.2" wide × 12.5" deep — wider due to integrated grinder',
      'DeLonghi Dedica: 5.9" wide × 13" deep — the narrowest machine we tested',
      'Gaggia Classic Pro: 9.4" wide × 9.4" deep — almost square, efficient counter use',
    ]},
    { type: 'paragraph', text: 'For genuinely small spaces, the DeLonghi Dedica or Breville Bambino Plus are the right starting points. Both produce real espresso (9-bar extraction, proper steam wand) in a form factor that fits a 6" gap between cabinet and microwave.' },
    { type: 'heading', level: 2, text: 'The grinder question' },
    { type: 'paragraph', text: 'A separate grinder takes counter space. In a small setup, the Baratza Encore ESP (4.7" wide) can sit on top of many machines during use and be moved to a shelf when not needed. The Fellow Ode Gen 2 is slightly wider but flat — it slides under most upper cabinets easily.' },
    { type: 'tip', text: 'Store your grinder on the counter, your scale in a drawer. The grinder gets used twice a day and its height matters. The scale takes 3 seconds to retrieve from a drawer and doesn\'t need permanent counter real estate.' },
    { type: 'heading', level: 2, text: 'The budget reality' },
    { type: 'paragraph', text: 'A small-space setup doesn\'t have to mean a budget setup. The DeLonghi Dedica ($190) + Baratza Encore ESP ($230) combination produces excellent espresso in a combined counter footprint smaller than most all-in-one machines — and the quality ceiling is higher. Total: $420. Total counter width: about 11 inches.' },
  ],
}
