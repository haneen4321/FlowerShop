import { useEffect, useMemo, useState } from "react";
import "../styles/global.css";
import "../styles/shop.css";

import { flowersData } from "../../infrastructure/data/flowersData";
import FlowerRepositoryImpl from "../../infrastructure/repositories/FlowerRepositoryImpl";

import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

const flowerRepository = new FlowerRepositoryImpl();

export default function Shop() {
  const { addToCart } = useCart();
  const { translations } = useLanguage();
  const t = translations.shop;

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("cheap");

  // Sort dropdown
  const [sortOpen, setSortOpen] = useState(false);

  // Filter dropdown
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  // Best Sellers
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    setBestSellers(flowerRepository.getBestSellers(8));
  }, []);

  // 🧠 source + search + sort (مع الأبجدي)
  const displayedFlowers = useMemo(() => {
    const source =
      activeFilter === "best" ? bestSellers : flowersData;

    const filtered = source.filter((flower) => {
      const flowerName =
        translations.flowers[flower.nameKey]?.toLowerCase() || "";
      return flowerName.includes(search.toLowerCase());
    });

    return filtered.sort((a, b) => {
      // الأرخص
      if (sort === "cheap") {
        return a.price - b.price;
      }

      // الأغلى
      if (sort === "expensive") {
        return b.price - a.price;
      }

      // 🔤 أبجديًا (حسب اللغة الحالية)
      if (sort === "alpha") {
        const nameA =
          translations.flowers[a.nameKey]?.toLowerCase() || "";
        const nameB =
          translations.flowers[b.nameKey]?.toLowerCase() || "";
        return nameA.localeCompare(nameB);
      }

      return 0;
    });
  }, [activeFilter, bestSellers, search, sort, translations]);

  return (
    <div className="shop">
      {/* ===== Filter Bar ===== */}
      <div className="shop-filter">
        {/* Filter */}
        <div
          className="filter-left"
          onClick={() => setFilterOpen((prev) => !prev)}
        >
          <span className="filter-icon">🔻</span>
          <span>{t.filtering}</span>

          {filterOpen && (
            <div className="filter-dropdown">
              <div
                className={`filter-option ${
                  activeFilter === "best" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveFilter("best");
                  setFilterOpen(false);
                }}
              >
                {t.bestSellers}
              </div>

              <div
                className={`filter-option ${
                  activeFilter === "all" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveFilter("all");
                  setFilterOpen(false);
                }}
              >
                {t.allTypes}
              </div>
            </div>
          )}
        </div>

        {/* Search */}
        <div className="filter-search">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        {/* Sort */}
        <div
          className="filter-right"
          onClick={() => setSortOpen((prev) => !prev)}
        >
          <span className="filter-icon">🔻</span>
          <span>{t.sort}</span>

          {sortOpen && (
            <div className="filter-dropdown sort-dropdown">
              <div
                className={`filter-option ${
                  sort === "cheap" ? "active" : ""
                }`}
                onClick={() => {
                  setSort("cheap");
                  setSortOpen(false);
                }}
              >
                {t.cheap}
              </div>

              <div
                className={`filter-option ${
                  sort === "expensive" ? "active" : ""
                }`}
                onClick={() => {
                  setSort("expensive");
                  setSortOpen(false);
                }}
              >
                {t.expensive}
              </div>

              {/* 🔤 أبجديًا */}
              <div
                className={`filter-option ${
                  sort === "alpha" ? "active" : ""
                }`}
                onClick={() => {
                  setSort("alpha");
                  setSortOpen(false);
                }}
              >
                {t.alphabetical}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===== Products ===== */}
      <div className="products">
        {displayedFlowers.map((flower) => (
          <div key={flower.id} className="product-card">
            <img
              src={flower.image}
              alt={translations.flowers[flower.nameKey]}
            />

            <h3>
              {translations.flowers[flower.nameKey] || flower.name}
            </h3>

            <div className="product-footer">
              <span>{flower.price}$</span>
              <button onClick={() => addToCart(flower)}>
                🛒 {t.addToCart}
              </button>
            </div>
          </div>
        ))}
      </div>

      {displayedFlowers.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "40px" }}>
          {t.noResults}
        </p>
      )}
    </div>
  );
}