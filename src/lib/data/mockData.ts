import { ServiceCategory, Provider, Review, Booking } from '../types';

export const SWAT_AREAS = [
  'Mingora City',
  'Saidu Sharif',
  'Kanju Township',
  'Kabal',
  'Matta',
  'Barikot',
  'Khwazakhela',
  'Charbagh',
  'Faizabad (Mingora)',
  'Rahimabad',
  'Makanbagh',
  'Haji Baba Road',
  'Qambar',
  'Landikas'
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'ac_technician',
    title: {
      en: 'AC & Cooling Specialist',
      ur: 'اے سی اور کولنگ ماہرین',
      roman: 'AC & Cooling Specialist'
    },
    description: {
      en: 'Inverter AC repair, gas refilling, master chemical cleaning & PCB diagnosis.',
      ur: 'انویرٹر اے سی مرمت، گیس ری فلنگ، ماسٹر کیمیکل سروس اور سرکٹ بورڈ چیک۔',
      roman: 'Inverter AC repair, gas refilling, chemical washing aur PCB diagnosis.'
    },
    iconName: 'Snowflake',
    startingPricePKR: 1200,
    activeProsCount: 38,
    popularTasks: {
      en: ['Gas Refill R410A/R32', 'Chemical Deep Cleaning', 'Compressor Tripping Issue', 'PCB Board Repair'],
      ur: ['گیس ری فلنگ', 'کیمیکل واش اور صفائی', 'کمپریسر فالٹ ٹیسٹ', 'سرکٹ بورڈ مرمت'],
      roman: ['Gas Refill R410A/R32', 'Chemical Deep Service', 'Compressor Tripping', 'Circuit Board Repair']
    }
  },
  {
    id: 'electrician',
    title: {
      en: 'Electrician & Solar Tech',
      ur: 'الیکٹریشن اور سولر سسٹم',
      roman: 'Electrician & Solar Tech'
    },
    description: {
      en: 'Solar inverter setup, home wiring, short-circuit diagnostics & DB box maintenance.',
      ur: 'سولر ہائبرڈ انویرٹر، گھریلو وائرنگ، شارٹ سرکٹ فالٹ اور مین ڈی بی مرمت۔',
      roman: 'Solar hybrid inverter, wiring fault, short circuit aur main switchboard fix.'
    },
    iconName: 'Zap',
    startingPricePKR: 800,
    activeProsCount: 52,
    popularTasks: {
      en: ['Hybrid Solar Inverter Calibration', 'UPS & Battery Hookup', 'Short Circuit Detection', 'Sub-meter & DB Installation'],
      ur: ['سولر انویرٹر سیٹنگ', 'یو پی ایس وائرنگ', 'شارٹ سرکٹ کی جانچ', 'سب میٹر اور ڈی بی باکس'],
      roman: ['Solar Inverter Setup', 'UPS & Battery Wiring', 'Short Circuit Check', 'DB Breaker Box']
    }
  },
  {
    id: 'plumber',
    title: {
      en: 'Plumber & Water Specialist',
      ur: 'پلمبر اور واٹر سسٹم',
      roman: 'Plumber & Water Specialist'
    },
    description: {
      en: 'Underground leak detection, water pump/motor repair, geyser installation & sanitary fitting.',
      ur: 'پائپ لیکیج تلاش، پانی کی موٹر مرمت، گیزر فٹنگ اور سینیٹری کا کام۔',
      roman: 'Underground leakage check, water motor fix, geyser fitting aur sanitary fittings.'
    },
    iconName: 'Droplet',
    startingPricePKR: 700,
    activeProsCount: 44,
    popularTasks: {
      en: ['Water Pressure Motor Repair', 'Instant/Gas Geyser Fitting', 'Hidden Pipe Leak Finding', 'BATH Commode & Mixer Install'],
      ur: ['پانی کی موٹر وائنڈنگ/مرمت', 'انسٹنٹ گیزر فٹنگ', 'چھپی ہوئی لیکیج کی تلاش', 'مکسر نلکے اور کموڈ'],
      roman: ['Water Motor Repair', 'Geyser Fitting & Service', 'Hidden Leakage Check', 'Bathroom Sanitary Fittings']
    }
  },
  {
    id: 'carpenter',
    title: {
      en: 'Carpenter & Wood Craftsman',
      ur: 'بڑھئی اور لکڑی کا کام',
      roman: 'Carpenter & Wood Craftsman'
    },
    description: {
      en: 'Swati deodar wood repair, kitchen cabinets, door alignment & custom furniture polish.',
      ur: 'سواتی دیودار لکڑی کی مرمت، کچن کیبنٹ، دروازوں کی سیٹنگ اور پالش۔',
      roman: 'Swati deodar lakri ka kaam, kitchen cabinets, darwaze ki setting aur polish.'
    },
    iconName: 'Hammer',
    startingPricePKR: 900,
    activeProsCount: 29,
    popularTasks: {
      en: ['Door Lock & Hinge Fix', 'Kitchen Shutter Repair', 'Wardrobe Sliding Track', 'Antique Deodar Restoration'],
      ur: ['دروازوں کے تالے اور قبضے', 'کچن کیبنٹ مرمت', 'الماری کے ریلنگ پہیے', 'دیودار فرنیچر بحالی'],
      roman: ['Lock & Hinge Alignment', 'Kitchen Cabinet Repair', 'Almari Track & Wheel', 'Deodar Wood Polish']
    }
  },
  {
    id: 'cleaner',
    title: {
      en: 'Deep Cleaning & Tank Wash',
      ur: 'ڈیپ کلیننگ اور واٹر ٹینک واش',
      roman: 'Deep Cleaning & Tank Wash'
    },
    description: {
      en: 'Underground & overhead water tank sanitization, sofa shampooing & post-paint cleanup.',
      ur: 'پانی کے زمینی اور چھت کے ٹینک کی کلورین صفائی، صوفہ واش اور مکان کی صفائی۔',
      roman: 'Water tank deep chlorine wash, sofa carpet shampoo aur makan ki mukammal safai.'
    },
    iconName: 'Sparkles',
    startingPricePKR: 1500,
    activeProsCount: 22,
    popularTasks: {
      en: ['Water Storage Tank Chlorination', 'Sofa & Carpet Vacuum Wash', 'Post-Construction Full Clean', 'Kitchen Degreasing'],
      ur: ['پانی کا ٹینک کلورین واش', 'صوفہ اور کارپٹ واش', 'تعمیر کے بعد صفائی', 'کچن چربی صفائی'],
      roman: ['Overhead Tank Wash', 'Sofa Vacuum & Shampoo', 'Full House Move-in Clean', 'Tile & Grout Deep Scrub']
    }
  },
  {
    id: 'appliance_repair',
    title: {
      en: 'Home Appliances & Generator',
      ur: 'گھریلو سامان اور جنریٹر',
      roman: 'Home Appliances & Generator'
    },
    description: {
      en: 'Washing machines, microwave ovens, water dispensers & portable fuel generator tuning.',
      ur: 'واشنگ مشین، مائیکرو ویو اوون، واٹر ڈسپنسر اور جنریٹر ٹیوننگ۔',
      roman: 'Automatic washing machine, microwave oven, water dispenser aur generator tuning.'
    },
    iconName: 'Wrench',
    startingPricePKR: 800,
    activeProsCount: 31,
    popularTasks: {
      en: ['Automatic Washing Machine Sensor Fix', 'Microwave Magnetron Change', 'Water Dispenser Compressor', 'Petrol Generator Carburetor Clean'],
      ur: ['آٹومیٹک واشنگ مشین مرمت', 'مائیکرو ویو پارٹس', 'ڈسپنسر گیس اور کولنگ', 'جنریٹر ٹیوننگ و کاربوریٹر'],
      roman: ['Auto Washing Machine PCB', 'Microwave Repair', 'Water Dispenser Cooling', 'Generator Service']
    }
  }
];

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: 'prov-swat-01',
    name: 'Ustad Tariq Khan Swati',
    title: {
      en: 'Master Inverter AC & Refrigeration Technician',
      ur: 'ماسٹر انویرٹر اے سی اور ریفریجریشن ٹیکنیشن',
      roman: 'Master Inverter AC & Refrigeration Technician'
    },
    category: 'ac_technician',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=260',
    rating: 4.94,
    reviewCount: 142,
    jobsCompleted: 386,
    hourlyRatePKR: 1200,
    calloutFeePKR: 500,
    responseTimeMins: 25,
    yearsExperience: 14,
    area: 'Mingora City',
    serviceAreas: ['Mingora City', 'Saidu Sharif', 'Kanju Township', 'Faizabad (Mingora)'],
    cnicVerified: true,
    tradeVerified: true,
    policeCleared: true,
    phone: '+92 345 9512034',
    bio: {
      en: 'DAE Air Conditioning & Refrigeration certified with 14 years field experience across Swat. Specializing in high-efficiency DC Inverter PCB diagnosis, vacuum pressure gas charging, and silent compressor overhaul.',
      ur: 'ڈی اے ای سند یافتہ ٹیکنیشن، سوات بھر میں 14 سالہ تجربہ۔ ڈی سی انویرٹر کے جدید سرکٹ بورڈ، گیس لیک ڈیٹیکشن اور کمپریسر کی مستند مرمت میری خصوصیت ہے۔',
      roman: 'DAE certified HVAC technician with 14 saal field tajurba. DC Inverter PCB repair aur authentic gas charging meri khas maharat hai.'
    },
    skills: ['DC Inverter PCB Repair', 'R410A / R32 Gas Charge', 'Chemical Coil Wash', 'Ductless Mini-Splits', 'Leak Nitrogen Testing'],
    isAvailableNow: true,
    coordinates: {
      lat: 34.7758,
      lng: 72.3626
    }
  },
  {
    id: 'prov-swat-02',
    name: 'Engr. Junaid Ahmad',
    title: {
      en: 'Licensed Solar & High-Load Electrician',
      ur: 'لائسنس یافتہ سولر اور الیکٹریکل سپیشلسٹ',
      roman: 'Licensed Solar & High-Load Electrician'
    },
    category: 'electrician',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=260',
    rating: 4.89,
    reviewCount: 98,
    jobsCompleted: 247,
    hourlyRatePKR: 1000,
    calloutFeePKR: 400,
    responseTimeMins: 30,
    yearsExperience: 9,
    area: 'Kanju Township',
    serviceAreas: ['Kanju Township', 'Kabal', 'Mingora City', 'Saidu Sharif'],
    cnicVerified: true,
    tradeVerified: true,
    policeCleared: true,
    phone: '+92 313 9081234',
    bio: {
      en: 'PEC registered electrical diploma holder. Expertise in 3kW to 20kW hybrid solar inverter configuration, net-metering compliant breaker panels, and resolving stubborn short-circuits.',
      ur: 'سولر ہائبرڈ انویرٹر، یو پی ایس اور مین وائرنگ کے ماہر۔ کانجو اور مینگورہ میں سینکڑوں گھروں کو محفوظ اور معیاری الیکٹریکل سروس فراہم کر چکے ہیں۔',
      roman: 'Solar hybrid system, net metering panels aur house wiring specialist. 9 saal se Kanju aur Mingora mein kam kar rahe hain.'
    },
    skills: ['Hybrid Solar Setup', 'Distribution Box (DB) Wiring', 'Breaker Tripping Diagnostic', 'Lithium Battery Integration', 'Earth Grounding Testing'],
    isAvailableNow: true,
    coordinates: {
      lat: 34.8021,
      lng: 72.3384
    }
  },
  {
    id: 'prov-swat-03',
    name: 'Mukhtar Alam',
    title: {
      en: 'Senior Sanitary & Motor Plumber',
      ur: 'سینئر سینیٹری اور واٹر پمپ پلمبر',
      roman: 'Senior Sanitary & Motor Plumber'
    },
    category: 'plumber',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=260',
    rating: 4.96,
    reviewCount: 164,
    jobsCompleted: 432,
    hourlyRatePKR: 900,
    calloutFeePKR: 350,
    responseTimeMins: 20,
    yearsExperience: 16,
    area: 'Saidu Sharif',
    serviceAreas: ['Saidu Sharif', 'Mingora City', 'Rahimabad', 'Faizabad (Mingora)'],
    cnicVerified: true,
    tradeVerified: true,
    policeCleared: true,
    phone: '+92 333 9471189',
    bio: {
      en: '16+ years solving Swat’s winter geyser freezing, motor pressure drops, and underground PPRC pipe seepages. Fast emergency arrival across Saidu Sharif and hospital road.',
      ur: '16 سال سے زائد سوات کے سرد موسم میں گیزر مسائل، پریشر موٹر فالٹ اور زیرِ زمین پائپ لیکیج کا مستند حل۔ ہنگامی کال پر 20 منٹ میں حاضری۔',
      roman: '16 saal tajurba. Geyser fitting, water motor pressure drop aur concealed PPRC pipe leakage ka expert.'
    },
    skills: ['PPRC Hot/Cold Pipe Welding', 'Gas & Electric Geyser Repair', 'Italian Water Pressure Pump', 'Drain Unclogging Machine', 'Modern Concealed Commode'],
    isAvailableNow: true,
    coordinates: {
      lat: 34.7512,
      lng: 72.3551
    }
  },
  {
    id: 'prov-swat-04',
    name: 'Haji Sher Zaman',
    title: {
      en: 'Traditional Swati Deodar Wood & Furniture Master',
      ur: 'سواتی دیودار لکڑی اور فرنیچر ماسٹر',
      roman: 'Traditional Swati Deodar Wood & Furniture Master'
    },
    category: 'carpenter',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=260',
    rating: 4.92,
    reviewCount: 79,
    jobsCompleted: 188,
    hourlyRatePKR: 1100,
    calloutFeePKR: 450,
    responseTimeMins: 40,
    yearsExperience: 22,
    area: 'Barikot',
    serviceAreas: ['Barikot', 'Mingora City', 'Saidu Sharif', 'Rahimabad'],
    cnicVerified: true,
    tradeVerified: true,
    policeCleared: true,
    phone: '+92 344 8920112',
    bio: {
      en: 'Generational Swati woodcraftsman. Specialist in bespoke solid Deodar wooden doors, silent kitchen cabinet hardware, sliding wardrobe runners, and heritage furniture polish.',
      ur: 'خاندانی سواتی لکڑی کے کاریگر۔ دیودار کے دروازے، کچن کیبنٹ فٹنگ، وارڈروب ٹریکس اور اصلی سواتی ہاتھ کی پالش کے مستند استاد۔',
      roman: 'Khandani lakri karigar. Solid Deodar doors, modern kitchen shutter hinges aur natural polish ke master.'
    },
    skills: ['Deodar Solid Wood Carving', 'Hydraulic Kitchen Hinges', 'Multi-point Door Locks', 'Sliding Wardrobe Tracks', 'Danish Oil & Lacquer Polish'],
    isAvailableNow: false,
    coordinates: {
      lat: 34.6811,
      lng: 72.2467
    }
  },
  {
    id: 'prov-swat-05',
    name: 'Hazrat Bilal Cleaners Crew',
    title: {
      en: 'Sanitization & Deep Chlorine Tank Cleaning Specialist',
      ur: 'سینیٹائزیشن اور واٹر ٹینک ڈیپ واش سپیشلسٹ',
      roman: 'Sanitization & Deep Chlorine Tank Cleaning Specialist'
    },
    category: 'cleaner',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=260',
    rating: 4.88,
    reviewCount: 110,
    jobsCompleted: 310,
    hourlyRatePKR: 1400,
    calloutFeePKR: 600,
    responseTimeMins: 35,
    yearsExperience: 7,
    area: 'Mingora City',
    serviceAreas: ['Mingora City', 'Saidu Sharif', 'Kanju Township', 'Faizabad (Mingora)', 'Makanbagh'],
    cnicVerified: true,
    tradeVerified: true,
    policeCleared: true,
    phone: '+92 315 7654321',
    bio: {
      en: 'Equipped with industrial high-pressure water jets and food-grade non-toxic disinfectants. Ensuring your family drinks pure sediment-free water in Swat.',
      ur: 'جدید پریشر پمپ اور غیر زہریلی جراثیم کش ادویات سے واٹر ٹینک اور گھروں کی مکمل صفائی۔ سوات میں آپ کی صحت اور صفائی کا ضامن۔',
      roman: 'High-pressure water jet aur safe chemicals ke zariye water storage tanks aur pure ghar ki deep sanitization.'
    },
    skills: ['Underground RCC Tank Scrub', 'Overhead Poly Tank Chlorine Wash', 'Sofa Deep Steam & Shampoo', 'Move-in Sanitization', 'Tile Grout Whitening'],
    isAvailableNow: true,
    coordinates: {
      lat: 34.7801,
      lng: 72.3589
    }
  },
  {
    id: 'prov-swat-06',
    name: 'Waqas Mehmood',
    title: {
      en: 'Automatic Washer & Home Appliance Specialist',
      ur: 'آٹومیٹک واشنگ مشین اور گھریلو آلات کے ماہر',
      roman: 'Automatic Washer & Home Appliance Specialist'
    },
    category: 'appliance_repair',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=260',
    rating: 4.91,
    reviewCount: 84,
    jobsCompleted: 215,
    hourlyRatePKR: 950,
    calloutFeePKR: 400,
    responseTimeMins: 30,
    yearsExperience: 8,
    area: 'Matta',
    serviceAreas: ['Matta', 'Khwazakhela', 'Charbagh', 'Mingora City'],
    cnicVerified: true,
    tradeVerified: true,
    policeCleared: true,
    phone: '+92 346 1239876',
    bio: {
      en: 'Specialized in top-load and front-load inverter washing machines (Dawlance, Haier, Samsung, Kenwood), microwave magnetron tubes, and electric water coolers.',
      ur: 'ڈولینس، ہائیر، سیمسنگ کی مکمل آٹومیٹک واشنگ مشینوں کے الیکٹرانک کارڈز، ڈرین موٹرز اور مائیکرو ویو کی موقع پر تسلی بخش مرمت۔',
      roman: 'Automatic washing machine sensor errors (E1, E2, E3), drain motor aur microwave magnetron specialist.'
    },
    skills: ['Inverter Washing Machine PCB', 'Drain Motor & Clutch Replacement', 'Microwave Heating Diagnostics', 'Water Cooler Compressor', 'Genuine Spares Sourcing'],
    isAvailableNow: true,
    coordinates: {
      lat: 34.9254,
      lng: 72.4182
    }
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    providerId: 'prov-swat-01',
    authorName: 'Dr. Afzal Khan',
    rating: 5,
    date: '2 days ago',
    location: 'Saidu Sharif (near Teaching Hospital)',
    comment: {
      en: 'Tariq bhai diagnosed our Haier 1.5 ton Inverter AC within 10 minutes. The compressor was tripping due to low voltage and sensor error. He fixed the board and refilled authentic R410A gas. Very polite, clean work, and transparent fee.',
      ur: 'طارق بھائی نے ہمارے ہائیر 1.5 ٹن انویرٹر اے سی کا مسئلہ صرف 10 منٹ میں حل کر دیا۔ کمپریسر وولٹیج کم ہونے کی وجہ سے ٹرپ کر رہا تھا۔ بہت بااخلاق اور صاف ستھرا کام۔',
      roman: 'Tariq bhai ne hamare Haier inverter AC ka issue 10 minute mein pakar liya. Original gas bhari aur reasonable charges liye. Highly recommended!'
    },
    serviceCategory: 'ac_technician',
    verifiedBooking: true
  },
  {
    id: 'rev-02',
    providerId: 'prov-swat-02',
    authorName: 'Sardar Ali Advocate',
    rating: 5,
    date: '1 week ago',
    location: 'Kanju Township, Sector C',
    comment: {
      en: 'Junaid installed our 8kW Inverex Nitrox hybrid solar inverter with battery bank. Super neat cabling, proper DC breakers, and excellent earthing pit testing. Truly professional engineering standard!',
      ur: 'جنید صاحب نے ہمارا 8 کلوواٹ کا سولر ہائبرڈ سسٹم لگایا۔ وائرنگ انتہائی صفائی سے کی اور ڈی سی بریکر کے ساتھ حفاظت کو یقینی بنایا۔ کانجو میں بہترین الیکٹریشن۔',
      roman: 'Junaid engineer ne hamare ghar ka solar inverter setup kiya. Professional wiring aur safe earthing. Swat mein aisi service pehle nahi dekhi.'
    },
    serviceCategory: 'electrician',
    verifiedBooking: true
  },
  {
    id: 'rev-03',
    providerId: 'prov-swat-03',
    authorName: 'Haji Mohammad Yousaf',
    rating: 5,
    date: '3 days ago',
    location: 'Mingora, Nishat Chowk',
    comment: {
      en: 'Our water motor started humming and stopped pulling water to the roof tank. Mukhtar Alam arrived in 25 minutes on a Friday evening, replaced the bad capacitor, and replaced the worn impeller. Saved us from immense water trouble.',
      ur: 'ہماری موٹر چلنا بند ہو گئی تھی۔ مختار عالم جمعہ کی شام بھی 25 منٹ میں تشریف لائے اور موقع پر نیا کپیسٹر لگا کر موٹر چالو کر دی۔ زبردست خدمت۔',
      roman: 'Water motor ruk gayi thi. Mukhtar ustad 25 min mein pohonch gaye aur foran fix kiya. KaamSaathi ki wajah se mistri dhoondna bohot aasan ho gaya.'
    },
    serviceCategory: 'plumber',
    verifiedBooking: true
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'KS-SWAT-8901',
    customerId: 'cust-01',
    customerName: 'Kamran Ali',
    customerPhone: '+92 300 9078654',
    providerId: 'prov-swat-01',
    providerName: 'Ustad Tariq Khan Swati',
    providerAvatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=260',
    category: 'ac_technician',
    issueDescription: 'Master chemical wash and gas level check for 2 Kenwood inverter AC units in guest room and master bedroom.',
    urgency: 'today',
    scheduledDate: '2026-11-02',
    scheduledTimeSlot: '11:00 AM - 01:00 PM',
    area: 'Saidu Sharif',
    addressDetail: 'House 42, St. 5, Near Serena Hotel road',
    landmark: 'Opposite Government Girls College',
    status: 'in_transit',
    estimatedCostPKR: {
      min: 2500,
      max: 4500
    },
    finalCostPKR: 3500,
    paymentMethod: 'cash_on_completion',
    createdAt: '2026-11-01T14:30:00Z',
    statusUpdates: [
      {
        status: 'requested',
        timestamp: '02:30 PM',
        note: 'Service request created with AI diagnosis'
      },
      {
        status: 'technician_assigned',
        timestamp: '02:38 PM',
        note: 'Ustad Tariq Khan accepted the job'
      },
      {
        status: 'in_transit',
        timestamp: '03:15 PM',
        note: 'Technician en route on motorbike from Mingora center (ETA 18 mins)'
      }
    ]
  },
  {
    id: 'KS-SWAT-8874',
    customerId: 'cust-01',
    customerName: 'Kamran Ali',
    customerPhone: '+92 300 9078654',
    providerId: 'prov-swat-02',
    providerName: 'Engr. Junaid Ahmad',
    category: 'electrician',
    issueDescription: 'UPS battery not holding backup charge during load shedding, checking inverter charge controller.',
    urgency: 'scheduled',
    scheduledDate: '2026-10-28',
    scheduledTimeSlot: '03:00 PM - 05:00 PM',
    area: 'Mingora City',
    addressDetail: 'Shop 12, Main New Road',
    landmark: 'Behind Bank of Khyber',
    status: 'completed',
    estimatedCostPKR: {
      min: 1000,
      max: 1800
    },
    finalCostPKR: 1200,
    paymentMethod: 'easypaisa',
    createdAt: '2026-10-28T09:00:00Z',
    statusUpdates: [
      {
        status: 'completed',
        timestamp: '04:45 PM',
        note: 'Replaced DC fuse and calibrated charge rate. Paid via Easypaisa.'
      }
    ]
  }
];
