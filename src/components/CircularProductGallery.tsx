import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react"
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import type { Product } from "../data/products"

type CircularProductGalleryProps = {
  items: Product[]
  category: string
  categories: string[]
  onCategoryChange: (category: string) => void
  onSelect: (product: Product) => void
}

const ease = 0.085

function wrap(value: number, length: number) {
  return ((value % length) + length) % length
}

function shortestDistance(index: number, progress: number, length: number) {
  const raw = index - wrap(progress, length)
  if (raw > length / 2) return raw - length
  if (raw < -length / 2) return raw + length
  return raw
}

export default function CircularProductGallery({
  items,
  category,
  categories,
  onCategoryChange,
  onSelect,
}: CircularProductGalleryProps) {
  const [progress, setProgress] = useState(0)
  const [compact, setCompact] = useState(() => window.innerWidth < 720)
  const progressRef = useRef(0)
  const targetRef = useRef(0)
  const pointerRef = useRef<{ id: number; x: number; target: number } | null>(null)
  const snapTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    progressRef.current = 0
    targetRef.current = 0
    setProgress(0)
  }, [items])

  useEffect(() => {
    let frame = 0
    const update = () => {
      const next = progressRef.current + (targetRef.current - progressRef.current) * ease
      progressRef.current = Math.abs(targetRef.current - next) < 0.0005 ? targetRef.current : next
      setProgress(progressRef.current)
      frame = window.requestAnimationFrame(update)
    }
    frame = window.requestAnimationFrame(update)
    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const onResize = () => setCompact(window.innerWidth < 720)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const scheduleSnap = () => {
    window.clearTimeout(snapTimer.current)
    snapTimer.current = window.setTimeout(() => {
      targetRef.current = Math.round(targetRef.current)
    }, 130)
  }

  useEffect(() => () => window.clearTimeout(snapTimer.current), [])

  const move = (amount: number) => {
    targetRef.current += amount
    scheduleSnap()
  }

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointerRef.current = { id: event.pointerId, x: event.clientX, target: targetRef.current }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current
    if (!pointer || pointer.id !== event.pointerId) return
    targetRef.current = pointer.target + (pointer.x - event.clientX) / (compact ? 105 : 180)
  }

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerRef.current?.id !== event.pointerId) return
    pointerRef.current = null
    targetRef.current = Math.round(targetRef.current)
    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  const categoryIndex = categories.indexOf(category)
  const previousCategory = categories[wrap(categoryIndex - 1, categories.length)]
  const nextCategory = categories[wrap(categoryIndex + 1, categories.length)]
  const activeIndex = items.length ? wrap(Math.round(progress), items.length) : 0
  const activeProduct = items[activeIndex]
  const radius = compact ? 2.15 : 3.7

  const visibleItems = useMemo(() => {
    if (!items.length) return []
    return items.flatMap((product, index) => {
      const distance = shortestDistance(index, progress, items.length)
      if (Math.abs(distance) > radius + 0.7) return []

      const pathProgress = (distance + radius) / (radius * 2)
      const angle = Math.PI - pathProgress * Math.PI
      const edgeFade = Math.max(0, Math.sin(pathProgress * Math.PI))
      const scale = 0.72 + edgeFade * 0.28
      const opacity = Math.pow(edgeFade, 0.86)
      const x = 50 + Math.cos(angle) * (compact ? 48 : 45)
      const y = 69 - Math.sin(angle) * 34
      const rotation = (pathProgress - 0.5) * (compact ? 18 : 24)

      return [{ product, index, distance, x, y, rotation, scale, opacity }]
    })
  }, [compact, items, progress, radius])

  return (
    <div
      className="circular-gallery"
      tabIndex={0}
      role="region"
      aria-label="Circular product gallery. Drag, scroll, or use arrow keys to navigate."
      onWheel={(event) => {
        if (!items.length || Math.abs(event.deltaX) < 0.5) return
        event.preventDefault()
        move(event.deltaX * 0.008)
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") { event.preventDefault(); move(1) }
        if (event.key === "ArrowLeft") { event.preventDefault(); move(-1) }
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="gallery-orbit" aria-hidden="true" />

      {visibleItems.map(({ product, index, distance, x, y, rotation, scale, opacity }) => (
        <button
          className={`orbit-product ${Math.abs(distance) < 0.5 ? "is-active" : ""}`}
          key={product.id}
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onPointerUp={(event) => event.stopPropagation()}
          onClick={() => onSelect(product)}
          aria-label={`Lihat ${product.name}`}
          style={{
            left: `${x}%`,
            top: `${y}%`,
            opacity,
            zIndex: 20 - Math.round(Math.abs(distance)),
            transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
          }}
        >
          <span className="orbit-product-image">
            <img src={product.image} alt="" draggable="false" loading={Math.abs(distance) < 2 ? "eager" : "lazy"} />
          </span>
          <span className="orbit-product-label">
            <small>{String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</small>
            <strong>{product.name}</strong>
            <ArrowUpRight size={15} />
          </span>
        </button>
      ))}

      <div className="gallery-center">
        <div className="gallery-category-rail" aria-label="Product category">
          <button
            type="button"
            onPointerDown={(event) => event.stopPropagation()}
            onPointerUp={(event) => event.stopPropagation()}
            onClick={() => onCategoryChange(previousCategory)}
            aria-label={`Previous category: ${previousCategory}`}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <strong>{category === "Semua" ? "ALL" : category}</strong>
          <button
            type="button"
            onPointerDown={(event) => event.stopPropagation()}
            onPointerUp={(event) => event.stopPropagation()}
            onClick={() => onCategoryChange(nextCategory)}
            aria-label={`Next category: ${nextCategory}`}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
        {activeProduct && (
          <button
            className="gallery-active-product"
            type="button"
            onPointerDown={(event) => event.stopPropagation()}
            onPointerUp={(event) => event.stopPropagation()}
            onClick={() => onSelect(activeProduct)}
          >
            <span>{activeProduct.category}</span>
            <strong>{activeProduct.name}</strong>
            <small>{activeProduct.price} · {activeProduct.size}</small>
          </button>
        )}
      </div>

      <div className="gallery-footer">
        <div className="gallery-progress">
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          <i><b style={{ width: `${items.length ? ((activeIndex + 1) / items.length) * 100 : 0}%` }} /></i>
          <span>{String(items.length).padStart(2, "0")}</span>
        </div>
        <span>DRAG / SCROLL TO EXPLORE</span>
        <div className="gallery-arrows">
          <button type="button" onPointerDown={(event) => event.stopPropagation()} onClick={() => move(-1)} aria-label="Previous product"><ArrowLeft size={17} /></button>
          <button type="button" onPointerDown={(event) => event.stopPropagation()} onClick={() => move(1)} aria-label="Next product"><ArrowRight size={17} /></button>
        </div>
      </div>
    </div>
  )
}
