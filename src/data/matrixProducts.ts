import matrixData from "./matrix-products.json"
import { products as detailedProducts, type Product } from "./products"

type MatrixRecord = {
  id: string
  name: string
  category: string
  image: string
  price: string
  size: string
  sourceSlide: number
}

export const matrixCategories = [
  "Semua",
  "First Cleanser",
  "Cleanser",
  "Toner",
  "Serum",
  "Moisturizer",
  "Sunscreen",
  "Exfoliator",
  "Treatment",
  "Makeup",
  "Lip",
]

const categoryTone: Record<string, string> = {
  "First Cleanser": "mint",
  Cleanser: "cyan",
  Toner: "green",
  Serum: "lilac",
  Moisturizer: "blue",
  Sunscreen: "gold",
  Exfoliator: "peach",
  Treatment: "rose",
  Makeup: "nude",
  Lip: "pink",
}

function inferConcerns(record: MatrixRecord) {
  const value = record.name.toLowerCase()
  const concerns = new Set<string>()

  if (/acne|mugwort|salicylic|centella|3x acid/.test(value)) concerns.add("Acne Prone")
  if (/bright|glow|radiance|vitamin c|niacinamide|pdrn/.test(value)) concerns.add("Dull Skin")
  if (/377|dark spot|txa|tranexamic/.test(value)) concerns.add("Dark Spot")
  if (/barrier|ceramide|b5|panthenol|ectoin|hyaluronic|truffle/.test(value)) concerns.add("Skin Barrier")
  if (/moist|hydrating|hyaluronic|cream|oil|mask/.test(value)) concerns.add("Dry Skin")
  if (/matte|clay|pore|oil|acne|salicylic/.test(value)) concerns.add("Oily Skin")

  return concerns.size ? [...concerns] : ["Lorem Ipsum"]
}

const detailedById = new Map(detailedProducts.map((product) => [product.id, product]))

export const matrixProducts: Product[] = (matrixData as MatrixRecord[]).map((record) => {
  const detailed = detailedById.get(record.id)
  const placeholder: Product = {
    id: record.id,
    name: record.name,
    category: record.category,
    family: record.category,
    concerns: inferConcerns(record),
    price: record.price,
    size: record.size,
    image: record.image,
    tone: categoryTone[record.category] ?? "cyan",
    eyebrow: `${record.category} / SKINTIFIC`,
    benefit: "Lorem Ipsum",
    description: "Lorem Ipsum",
    ingredients: [{ name: "Lorem Ipsum", description: "Lorem Ipsum" }],
    usage: "Lorem Ipsum",
    sourceSlides: [record.sourceSlide],
  }

  return {
    ...placeholder,
    ...detailed,
    id: record.id,
    name: record.name,
    category: record.category,
    price: record.price,
    size: record.size,
    image: record.image,
    sourceSlides: [record.sourceSlide],
  }
})
