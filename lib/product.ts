export const product = {
  brandName: "WarmBox",
  name: "Portable Food Warmer",
  headline: "Never Eat Cold Lunch Again",
  subheadline:
    "Enjoy warm homemade meals at work, college, while traveling, or on the road without waiting for a microwave.",
  description:
    "WarmBox is a compact plug-in food warmer made for busy students, office workers, drivers, travelers, and anyone who carries food from home.",
  regularPrice: 1499,
  launchPrice: 1199,
  urgencyPrice: 999,
  currency: "Rs.",
  deliveryText: "Free delivery inside Kathmandu Valley",
  images: [
    "/images/portable-warmer-main.png",
    "/images/portable-warmer-features.png",
    "/images/portable-warmer-specs.png",
    "/images/portable-warmer-extra.png"
  ],
  featureHighlights: [
    {
      title: "Invisible Handle",
      body: "Easy to carry daily with a clean fold-away handle design."
    },
    {
      title: "Double-Sided Buckle",
      body: "Secure side locks help keep the warmer closed while carrying."
    },
    {
      title: "Cooling Holes",
      body: "Built-in cooling holes help prevent excessive temperature buildup."
    },
    {
      title: "360° Steam Around Heating",
      body: "Designed to warm meals slowly and evenly from all around."
    },
    {
      title: "Anti-Dry Protection",
      body: "Added protection for safer everyday food warming."
    },
    {
      title: "Leak-Proof Lid",
      body: "Helps keep food covered and convenient while carrying meals."
    },
    {
      title: "Dishwasher Available",
      body: "The stainless-steel food container can be cleaned easily."
    },
    {
      title: "Food-Grade PP Material",
      body: "Made with food-safe PP material for daily meal use."
    }
  ],
  specifications: [
    "2L total capacity with 0.5L containers",
    "304 stainless-steel food bowl",
    "Warmer size: 25cm x 13cm x 21cm",
    "Bowl size: 11cm x 6.2cm",
    "Compact lunch-box style body",
    "Portable plug-in heating design"
  ],
  benefits: [
    "Enjoy hot food anywhere",
    "Save money on outside food",
    "Easy to carry",
    "Simple plug-in use",
    "Better for busy days",
    "Keeps homemade meals convenient",
    "No more cold lunch"
  ],
  detailedBenefits: [
    {
      title: "Enjoy Hot Food Anywhere",
      body: "Warm your meal at work, college, while traveling, or on the road without needing a microwave."
    },
    {
      title: "Save Money on Outside Food",
      body: "Carry homemade food and avoid spending daily on restaurants, canteens, or delivery."
    },
    {
      title: "Easy to Carry",
      body: "Compact, lightweight, and travel-friendly, so you can take it anywhere without hassle."
    },
    {
      title: "Simple Plug-In Use",
      body: "Just plug it in, place your food inside, and let it warm slowly and evenly."
    }
  ],
  testimonials: [
    {
      quote: "Now I don't have to eat cold lunch at office.",
      body: "I used to carry food from home, but by lunchtime it was always cold. This portable food warmer makes my lunch warm and fresh. Very useful for daily office use.",
      author: "Suman, Office Worker, Kathmandu"
    },
    {
      quote: "Simple to use and easy to carry.",
      body: "I just plug it in before lunch and my food becomes warm. It is compact, lightweight, and perfect for my daily routine.",
      author: "Ramesh, Sales Staff, Lalitpur"
    },
    {
      quote: "It helped me save money on outside food.",
      body: "Before, I used to buy lunch almost every day. Now I carry homemade food and warm it easily. Good product for students and working people.",
      author: "Anisha, Student, Bhaktapur"
    },
    {
      quote: "Best for people who travel or work outside.",
      body: "I work long hours outside and finding hot food is not always easy. This food warmer helps me enjoy homemade food wherever I go.",
      author: "Bikash, Driver, Kathmandu"
    },
    {
      quote: "Worth it for the price.",
      body: "For Rs. 1,199 with free delivery inside Kathmandu Valley, it feels like a useful daily product. I would recommend it to anyone who carries lunch from home.",
      author: "Pratik, Small Business Owner, Kathmandu"
    }
  ],
  faqs: [
    {
      question: "How does the portable food warmer work?",
      answer:
        "Just place your food container inside, plug it in, and wait for the food to warm slowly and evenly."
    },
    {
      question: "Do I need a microwave to use it?",
      answer:
        "No. You do not need a microwave. The food warmer heats your meal by itself after plugging it in."
    },
    {
      question: "How long does it take to warm food?",
      answer:
        "It usually takes some time to warm the food properly, depending on the food quantity and temperature. For best results, plug it in before your lunch break."
    },
    {
      question: "Is it easy to carry?",
      answer:
        "Yes. It is compact and easy to carry, making it suitable for office, college, travel, drivers, and daily work use."
    },
    {
      question: "Who is this product best for?",
      answer:
        "It is best for office workers, students, drivers, travelers, construction workers, and anyone who carries homemade lunch."
    },
    {
      question: "What is the price?",
      answer:
        "The price is Rs. 1,199 only with free delivery inside Kathmandu Valley."
    },
    {
      question: "Is delivery available outside Kathmandu Valley?",
      answer:
        "Yes, delivery can be available outside Kathmandu Valley, but delivery charges may depend on the location."
    }
  ]
};

export function formatPrice(amount: number) {
  return `${product.currency} ${amount.toLocaleString("en-IN")}`;
}
