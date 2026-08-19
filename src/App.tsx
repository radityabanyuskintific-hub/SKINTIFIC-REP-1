import { useEffect, useMemo, useState } from "react"
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronRight,
  FlaskConical,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react"
import CircularProductGallery from "./components/CircularProductGallery"
import { concerns, type Product } from "./data/products"
import { matrixCategories as categories, matrixProducts as products } from "./data/matrixProducts"

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function App() {
  const [category, setCategory] = useState("Semua")
  const [concern, setConcern] = useState("Semua")
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<Product | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory = category === "Semua" || product.category === category
      const matchesConcern = concern === "Semua" || product.concerns.includes(concern)
      const matchesQuery =
        !needle ||
        [
          product.name,
          product.category,
          product.family,
          product.benefit,
          ...product.concerns,
          ...product.ingredients.map((item) => item.name),
        ]
          .join(" ")
          .toLowerCase()
          .includes(needle)

      return matchesCategory && matchesConcern && matchesQuery
    })
  }, [category, concern, query])

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    const fromHash = products.find((product) => product.id === hash)
    if (fromHash) {
      setSelected(fromHash)
      return
    }

    if (hash) {
      const scrollToHash = () => document.getElementById(hash)?.scrollIntoView()
      window.requestAnimationFrame(scrollToHash)
      window.setTimeout(scrollToHash, 500)
    }
  }, [])

  useEffect(() => {
    if (!selected) return
    document.body.classList.add("modal-open")
    window.history.replaceState(null, "", `#${selected.id}`)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.classList.remove("modal-open")
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [selected])

  const closeProduct = () => {
    setSelected(null)
    window.history.replaceState(null, "", window.location.pathname)
  }

  const chooseConcern = (name: string) => {
    setConcern(name)
    setCategory("Semua")
    scrollToId("catalogue")
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="SKINTIFIC home">
          SKINTIFIC
        </a>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          <button onClick={() => { scrollToId("catalogue"); setMenuOpen(false) }}>Products</button>
          <button onClick={() => { scrollToId("concerns"); setMenuOpen(false) }}>Skin concerns</button>
          <button onClick={() => { scrollToId("science"); setMenuOpen(false) }}>Our science</button>
        </nav>
        <div className="header-actions">
          <button className="header-search" onClick={() => scrollToId("catalogue")} aria-label="Search products">
            <Search size={18} strokeWidth={1.8} />
          </button>
          <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu">
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />
          <div className="hero-grid" aria-hidden="true" />

          <div className="hero-copy">
            <div className="hero-kicker">
              <span>SKIN BARRIER SCIENCE</span>
              <span>EST. FOR THE FUTURE</span>
            </div>
            <h1>
              Future skin.
              <br />
              <em>Barrier first.</em>
            </h1>
            <p className="hero-lead">
              Formula presisi untuk hasil yang terasa cepat—dirancang tetap lembut, terukur, dan selalu berpihak pada skin barrier.
            </p>
            <div className="hero-buttons">
              <button className="primary-button" onClick={() => scrollToId("catalogue")}>
                Jelajahi produk <ArrowUpRight size={17} />
              </button>
              <button className="text-button" onClick={() => scrollToId("concerns")}>
                Temukan concern-mu <ArrowDown size={16} />
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-frame">
              <img src="/products/hero-lineup.jpg" alt="Pilihan produk SKINTIFIC" />
            </div>
            <div className="hero-badge">
              <span className="pulse-dot" />
              Barrier intelligence
            </div>
            <div className="hero-index" aria-hidden="true">01 / 03</div>
          </div>

          <div className="hero-bottom-line">
            <span>BPOM REGISTERED</span>
            <span>VEGAN FORMULAS</span>
            <span>DERMATOLOGICALLY TESTED*</span>
          </div>
        </section>

        <section className="manifesto" id="science">
          <div className="section-label">[ OUR FORMULA ]</div>
          <div className="manifesto-copy">
            <p>
              Bukan sekadar active ingredients. Kami merancang <strong>keseimbangan</strong> antara efektivitas, hidrasi, dan ketahanan barrier.
            </p>
          </div>
          <div className="science-grid">
            <article>
              <span>01</span>
              <FlaskConical />
              <h3>Right actives</h3>
              <p>Bahan aktif terarah untuk setiap kebutuhan kulit.</p>
            </article>
            <article>
              <span>02</span>
              <Sparkles />
              <h3>Fast response</h3>
              <p>Formula yang dirancang terasa ringan dan bekerja efisien.</p>
            </article>
            <article>
              <span>03</span>
              <ShieldCheck />
              <h3>Barrier safe</h3>
              <p>Hidrasi dan calming support selalu masuk perhitungan.</p>
            </article>
          </div>
        </section>

        <section className="concern-section" id="concerns">
          <div className="concern-heading">
            <div>
              <div className="section-label">[ START WITH YOUR SKIN ]</div>
              <h2>What does your skin<br />need right now?</h2>
            </div>
            <p>Pilih kebutuhan kulitmu. Sistem akan membawa kamu ke formula yang paling relevan.</p>
          </div>
          <div className="concern-list">
            {concerns.map((item) => (
              <button key={item.name} onClick={() => chooseConcern(item.name)}>
                <span className="concern-index">{item.index}</span>
                <span className="concern-name">{item.name}</span>
                <span className="concern-copy">{item.copy}</span>
                <span className="concern-arrow"><ArrowUpRight size={21} /></span>
              </button>
            ))}
          </div>
        </section>

        <section className="catalogue-section orbit-matrix" id="catalogue">
          <div className="matrix-topline">
            <span>PRODUCT MATRIX</span>
            <span>IN DEPTH WITH OUR PRODUCT</span>
          </div>

          <div className="matrix-toolbar">
            <label className="search-box">
              <Search size={18} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari nama, concern, atau ingredients"
                aria-label="Cari produk"
              />
              {query && (
                <button onClick={() => setQuery("")} aria-label="Clear search"><X size={16} /></button>
              )}
            </label>
            <div className="matrix-result-count">
              <strong>{String(filteredProducts.length).padStart(2, "0")}</strong>
              <span>UNIQUE<br />FORMULAS</span>
            </div>
          </div>

          {concern !== "Semua" && (
            <div className="active-filter matrix-filter">
              <span>Concern: {concern}</span>
              <button onClick={() => setConcern("Semua")}><X size={14} /> Reset</button>
            </div>
          )}

          {filteredProducts.length ? (
            <CircularProductGallery
              items={filteredProducts}
              category={category}
              categories={categories}
              onCategoryChange={setCategory}
              onSelect={setSelected}
            />
          ) : (
            <div className="empty-state matrix-empty">
              <span>0 results</span>
              <h3>Belum ada formula yang cocok.</h3>
              <p>Coba kata kunci atau filter lain untuk memperluas pencarian.</p>
              <button onClick={() => { setCategory("Semua"); setConcern("Semua"); setQuery("") }}>Reset filters</button>
            </div>
          )}
        </section>

        <section className="future-section">
          <div className="future-copy">
            <div className="section-label light">[ NEXT-GEN BRIGHTENING ]</div>
            <h2>Meet the PDRN<br /><em>regeneration system.</em></h2>
            <p>5000 PPM PDRN bertemu microbiome-friendly actives untuk tekstur halus, hidrasi presisi, dan future glow.</p>
            <button onClick={() => { setCategory("Semua"); setConcern("Dull Skin"); scrollToId("catalogue") }}>
              Explore brightening <ArrowUpRight size={17} />
            </button>
          </div>
          <div className="future-products">
            <div className="future-product jar">
              <img src="/products/pdrn-moisture.png" alt="PDRN Bright & Smooth Moisture Gel" />
            </div>
            <div className="future-product serum">
              <img src="/products/pdrn-serum.png" alt="PDRN Bright & Smooth Serum" />
            </div>
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-wordmark">SKINTIFIC</div>
          <p>Fast results.<br />Barrier safe.</p>
        </div>
        <div className="footer-bottom">
          <span>Digital product catalogue / Indonesia</span>
          <span>Product information sourced from SKINTIFIC product education</span>
          <button onClick={() => scrollToId("top")}>Back to top ↑</button>
        </div>
      </footer>

      {selected && (
        <div className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
          <button className="modal-backdrop" onClick={closeProduct} aria-label="Close product details" />
          <div className={`modal-panel tone-${selected.tone}`}>
            <div className="modal-topbar">
              <span>{selected.family} / {selected.category}</span>
              <button onClick={closeProduct} aria-label="Close"><X size={22} /></button>
            </div>
            <div className="modal-content">
              <div className="modal-product-visual">
                <div className="modal-glow" />
                <img src={selected.image} alt={selected.name} />
                <div className="modal-price">
                  <span>{selected.price}</span>
                  <small>{selected.size}</small>
                </div>
              </div>
              <div className="modal-copy">
                <span className="modal-eyebrow">{selected.eyebrow}</span>
                <h2 id="product-modal-title">{selected.name}</h2>
                <p className="modal-benefit">{selected.benefit}</p>
                <p className="modal-description">{selected.description}</p>

                <div className="modal-section">
                  <h3>Hero ingredients</h3>
                  <div className="ingredient-list">
                    {selected.ingredients.map((ingredient, index) => (
                      <div key={ingredient.name}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <strong>{ingredient.name}</strong>
                        <p>{ingredient.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="modal-grid">
                  <div>
                    <h3>How to use</h3>
                    <p>{selected.usage}</p>
                  </div>
                  <div>
                    <h3>Made for</h3>
                    <ul>
                      {selected.concerns.map((item) => <li key={item}><Check size={14} /> {item}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="source-note">Product education source: slides {selected.sourceSlides.join(", ")}</div>
              </div>
            </div>
            <button className="modal-next" onClick={() => {
              const index = products.findIndex((product) => product.id === selected.id)
              setSelected(products[(index + 1) % products.length])
            }}>
              Next formula <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
