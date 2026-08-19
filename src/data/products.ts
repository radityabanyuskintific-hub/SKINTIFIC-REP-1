export type Product = {
  id: string
  name: string
  category: string
  family: string
  concerns: string[]
  price: string
  size: string
  image: string
  tone: string
  eyebrow: string
  benefit: string
  description: string
  ingredients: { name: string; description: string }[]
  usage: string
  sourceSlides: number[]
}

export const categories = [
  "Semua",
  "Cleanser",
  "Toner",
  "Serum",
  "Moisturizer",
  "Sunscreen",
  "Makeup",
]

export const concerns = [
  { name: "Acne Prone", index: "01", copy: "Redakan inflamasi & jaga keseimbangan sebum." },
  { name: "Dull Skin", index: "02", copy: "Aktifkan kembali tampilan cerah dan sehat." },
  { name: "Skin Barrier", index: "03", copy: "Pulihkan, tenangkan, dan kunci kelembapan." },
  { name: "Dark Spot", index: "04", copy: "Targetkan noda dengan brightening actives." },
  { name: "Dry Skin", index: "05", copy: "Hidrasi berlapis untuk kulit lebih kenyal." },
  { name: "Oily Skin", index: "06", copy: "Kontrol kilap tanpa mengorbankan barrier." },
]

export const products: Product[] = [
  {
    id: "ceramide-cleanser",
    name: "5X Ceramide Low pH Gel Cleanser",
    category: "Cleanser",
    family: "Barrier Lab",
    concerns: ["Skin Barrier", "Dry Skin"],
    price: "Rp. 99.000",
    size: "80 ml",
    image: "/products/ceramide-cleanser.png",
    tone: "cyan",
    eyebrow: "Gentle cleanse / pH 5.5",
    benefit: "Membersihkan lembut sambil menjaga skin barrier.",
    description:
      "Low pH cleanser dengan 5 tipe ceramide dan amino acid surfactant untuk membersihkan tanpa rasa kering atau tertarik.",
    ingredients: [
      { name: "5X Ceramide", description: "Membantu menjaga protective barrier kulit." },
      { name: "Amino Acid", description: "Surfaktan lembut untuk busa halus dan minim iritasi." },
      { name: "Hyaluronic Acid", description: "Membantu mempertahankan kelembapan alami." },
    ],
    usage: "Gunakan pagi dan malam pada wajah yang lembap, lalu bilas hingga bersih.",
    sourceSlides: [29, 30, 31, 32, 33],
  },
  {
    id: "centella-toner",
    name: "Pure Centella Acne Calming Toner",
    category: "Toner",
    family: "Acne Relief",
    concerns: ["Acne Prone", "Oily Skin", "Skin Barrier"],
    price: "Rp. 116.000",
    size: "80 ml",
    image: "/products/centella-toner.png",
    tone: "green",
    eyebrow: "Organic Centella / calming",
    benefit: "Pertolongan pertama untuk kulit berjerawat dan kemerahan.",
    description:
      "Toner ringan dengan Organic Centella, Ectoin, Panthenol, dan 5X Ceramide untuk menenangkan inflamasi sekaligus mengunci hidrasi.",
    ingredients: [
      { name: "Organic Centella", description: "Menenangkan tanda iritasi dan kemerahan." },
      { name: "Ectoin", description: "Membantu kulit menghadapi pengaruh lingkungan." },
      { name: "Ceramide", description: "Menjaga kelembapan dan barrier kulit." },
    ],
    usage: "Aplikasikan langsung atau dengan kapas setelah membersihkan wajah.",
    sourceSlides: [198, 199, 200, 201],
  },
  {
    id: "dark-spot-serum",
    name: "377 Dark Spot Serum",
    category: "Serum",
    family: "Brightening Lab",
    concerns: ["Dark Spot", "Dull Skin"],
    price: "Rp. 139.000",
    size: "20 ml",
    image: "/products/dark-spot-serum.png",
    tone: "lilac",
    eyebrow: "Precision brightening / 377",
    benefit: "Membantu memudarkan noda hitam dalam 14 hari.",
    description:
      "Serum bermolekul ringan dengan 377, Niacinamide, dan Tranexamic Acid untuk menargetkan noda serta warna kulit tidak merata.",
    ingredients: [
      { name: "Symwhite 377", description: "Membantu menekan produksi melanin." },
      { name: "Niacinamide", description: "Mendukung tampilan kulit cerah dan merata." },
      { name: "Tranexamic Acid", description: "Membantu menyamarkan noda membandel." },
    ],
    usage: "Gunakan 2–3 tetes setelah toner, pagi atau malam hari.",
    sourceSlides: [90, 91, 92, 93, 94],
  },
  {
    id: "pdrn-serum",
    name: "PDRN Bright & Smooth Serum",
    category: "Serum",
    family: "PDRN Regeneration",
    concerns: ["Dull Skin", "Dark Spot", "Dry Skin"],
    price: "Rp.---",
    size: "20 ml",
    image: "/products/pdrn-serum.png",
    tone: "pink",
    eyebrow: "5000 PPM PDRN / glass skin",
    benefit: "Regenerasi presisi untuk tekstur lebih halus dan bercahaya.",
    description:
      "Brightening serum dengan 5000 PPM PDRN dan microbiome-activated technology untuk mendukung regenerasi kulit dengan formula rendah iritasi.",
    ingredients: [
      { name: "PDRN", description: "Mendukung regenerasi dan tampilan kulit lebih kenyal." },
      { name: "Brightenyl®", description: "Membantu menargetkan warna kulit tidak merata." },
      { name: "Illuminyl™ 388", description: "Mendukung tampilan kulit cerah bercahaya." },
    ],
    usage: "Aplikasikan setelah toner dan lanjutkan dengan moisturizer.",
    sourceSlides: [450, 451, 452, 453],
  },
  {
    id: "pdrn-moisture",
    name: "PDRN Bright & Smooth Moisture Gel",
    category: "Moisturizer",
    family: "PDRN Regeneration",
    concerns: ["Dull Skin", "Dark Spot", "Dry Skin"],
    price: "Rp.---",
    size: "30 g",
    image: "/products/pdrn-moisture.png",
    tone: "rose",
    eyebrow: "Microbiome-friendly / 5000 PPM",
    benefit: "Hidrasi ringan untuk tampilan glass skin dalam 14 hari.",
    description:
      "Moisturizer brightening dengan PDRN konsentrasi tinggi, tiga bahan paten, dan tekstur ringan yang dirancang untuk penyerapan optimal.",
    ingredients: [
      { name: "PDRN", description: "Mendukung regenerasi kulit dan pembentukan kolagen." },
      { name: "Symbright Plus", description: "Membantu meratakan tampilan warna kulit." },
      { name: "Chronoglow", description: "Mendukung kilau alami dan tekstur kulit." },
    ],
    usage: "Gunakan sebagai langkah pelembap pada pagi dan malam hari.",
    sourceSlides: [445, 446, 447, 448, 449],
  },
  {
    id: "b5-moisturizer",
    name: "5% B5 Ceramide Barrier Relief Moisturizer",
    category: "Moisturizer",
    family: "Barrier Recovery",
    concerns: ["Skin Barrier", "Acne Prone", "Dry Skin"],
    price: "Rp. 139.000",
    size: "50 g",
    image: "/products/b5-moisturizer.png",
    tone: "blue",
    eyebrow: "Clinical-inspired / barrier calm",
    benefit: "Efek nyaman instan, penguatan barrier jangka panjang.",
    description:
      "Gel-cream breathable dengan 5% Panthenol dan lima ceramide untuk menenangkan kulit bermasalah tanpa rasa lengket.",
    ingredients: [
      { name: "5% Panthenol", description: "Menenangkan dan membantu menjaga kelembapan." },
      { name: "5X Ceramide", description: "Mendukung pemulihan fungsi skin barrier." },
      { name: "Centella Asiatica", description: "Membantu meredakan rasa tidak nyaman." },
    ],
    usage: "Aplikasikan merata setelah serum, pagi dan malam hari.",
    sourceSlides: [482, 483, 484, 485],
  },
  {
    id: "aqua-sunscreen",
    name: "Aqua Light Daily Sunscreen",
    category: "Sunscreen",
    family: "UV Defense",
    concerns: ["Acne Prone", "Oily Skin"],
    price: "Rp. 99.000",
    size: "30 g",
    image: "/products/aqua-sunscreen.png",
    tone: "mint",
    eyebrow: "Water-burst / daily defense",
    benefit: "Proteksi ringan dengan sensasi segar tanpa rasa berminyak.",
    description:
      "Sunscreen bertekstur water-burst dengan Tinosorb® S Lite Aqua, Trehalose, dan Allantoin untuk perlindungan harian yang nyaman.",
    ingredients: [
      { name: "Tinosorb® S Lite Aqua", description: "UV filter stabil untuk perlindungan harian." },
      { name: "Trehalose", description: "Membantu menjaga hidrasi kulit." },
      { name: "Allantoin", description: "Menenangkan dan mengunci kelembapan." },
    ],
    usage: "Gunakan sebagai langkah terakhir skincare dan aplikasikan ulang sesuai kebutuhan.",
    sourceSlides: [244, 245, 246, 247],
  },
  {
    id: "radiance-spray",
    name: "Radiance Booster Serum Spray",
    category: "Serum",
    family: "Glow System",
    concerns: ["Dull Skin", "Dry Skin"],
    price: "Rp.---",
    size: "100 ml",
    image: "/products/radiance-spray.png",
    tone: "gold",
    eyebrow: "Bi-phase / glow on demand",
    benefit: "Spray, hydrate, and glow—kapan saja, di mana saja.",
    description:
      "Serum spray bi-phase dengan rasio minyak dan serum 1:9 untuk hidrasi cepat serta tampilan glow yang ringan.",
    ingredients: [
      { name: "Bifida Ferment", description: "Mendukung skin barrier dan kualitas kulit." },
      { name: "Ectoin", description: "Membantu melindungi dari environmental stressor." },
      { name: "Centella", description: "Menenangkan kulit dan menjaga kenyamanan." },
    ],
    usage: "Kocok hingga tercampur lalu semprotkan sebelum atau setelah makeup.",
    sourceSlides: [343, 344, 345, 346],
  },
  {
    id: "tinted-sunscreen",
    name: "All Day Protect Tinted Serum Sunscreen",
    category: "Makeup",
    family: "Future Complexion",
    concerns: ["Dull Skin"],
    price: "Rp.---",
    size: "Lorem Ipsum",
    image: "/products/tinted-sunscreen.png",
    tone: "peach",
    eyebrow: "SPF 50+ PA++++ / second skin",
    benefit: "Soft glow coverage dan proteksi dalam satu langkah.",
    description:
      "Tinted sunscreen dengan Korean Airflow Technology untuk hasil ringan seperti second skin, dilengkapi perlindungan UVA, UVB, dan visible light.",
    ingredients: [
      { name: "Bifida Ferment", description: "Membantu menjaga skin barrier." },
      { name: "Double Antioxidants", description: "Membantu mencegah tampilan kusam." },
      { name: "SPF 50+ PA++++", description: "Perlindungan harian terhadap spektrum UV." },
    ],
    usage: "Ratakan pada wajah sebagai langkah terakhir skincare sebelum beraktivitas.",
    sourceSlides: [536, 537, 538, 539, 540],
  },
  {
    id: "foundation-stick",
    name: "Cover Smooth Blurring Foundation Stick",
    category: "Makeup",
    family: "Future Complexion",
    concerns: ["Oily Skin"],
    price: "Rp.---",
    size: "Lorem Ipsum",
    image: "/products/foundation-stick.png",
    tone: "nude",
    eyebrow: "Soft matte / precision blur",
    benefit: "Coverage tinggi, creamy, dan mudah di-blend dalam satu swipe.",
    description:
      "Foundation stick presisi dengan NAD Complex dan Hydrolyzed Hyaluronic Acid untuk tampilan soft-matte yang tetap terhidrasi.",
    ingredients: [
      { name: "NAD Complex", description: "Mendukung tampilan makeup yang segar dan halus." },
      { name: "Hyaluronic Acid", description: "Membantu mempertahankan hidrasi kulit." },
      { name: "Vitamin E", description: "Membantu mencegah tampilan kusam dan oksidasi." },
    ],
    usage: "Aplikasikan langsung ke area wajah lalu blend dengan jari, brush, atau sponge.",
    sourceSlides: [541, 542, 543, 544, 545, 546],
  },
]
