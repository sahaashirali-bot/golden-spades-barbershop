export const SHOP = {
  name: "Golden Spades Barbershop",
  address: "17000 El Camino Real Ste 210A, Houston, TX 77058",
  phone: "(346) 801-9402",
  phoneHref: "tel:+13468019402",
  email: "goldenspadesbarbershop@gmail.com",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=17000+El+Camino+Real+Ste+210A+Houston+TX+77058",
  instagram: "https://www.instagram.com/goldenspadesbarbershop/",
  hours: [
    { day: "Sunday", hours: "Closed" },
    { day: "Monday", hours: "Closed" },
    { day: "Tuesday", hours: "10:00 AM – 7:00 PM" },
    { day: "Wednesday", hours: "10:00 AM – 7:00 PM" },
    { day: "Thursday", hours: "10:00 AM – 7:00 PM" },
    { day: "Friday", hours: "9:00 AM – 7:00 PM" },
    { day: "Saturday", hours: "9:00 AM – 4:00 PM" },
  ],
  cancellationPolicy:
    "Please reschedule or cancel at least 1 hour before your appointment or you may be charged a cancellation fee of 100% of the scheduled service price. Arriving more than 10 minutes late may result in your appointment being cancelled.",
  cardFeeCents: 200,
} as const;
