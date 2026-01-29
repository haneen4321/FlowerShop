import { useMemo, useState } from "react";
import "../styles/global.css";
import "../styles/shop.css";

import { flowersData } from "../../infrastructure/data/flowersData";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

export default function Shop() {
  const { addToCart } = useCart();
  const { translations } = useLanguage();
  const t = translations.shop;

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("cheap");

  const filteredFlowers = useMemo(() => {
    const filtered = flowersData.filter((flower) => {
      const flowerName =
        translations.flowers[flower.nameKey]?.toLowerCase() || "";
      return flowerName.includes(search.toLowerCase());
    });

    return filtered.sort((a, b) =>
      sort === "cheap" ? a.price - b.price : b.price - a.price
    );
  }, [search, sort, translations]);

  return (
    <div className="shop">
      {/* Filter */}
      <div className="shop-filter">
        <div className="filter-left">
          <span className="filter-icon">🔻</span>
          <span>{t.filtering}</span>
        </div>

        <div className="filter-search">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <div
          className="filter-right"
          onClick={() =>
            setSort((prev) => (prev === "cheap" ? "expensive" : "cheap"))
          }
        >
          {sort === "cheap" ? `⬇ ${t.cheap}` : `⬆ ${t.expensive}`}
        </div>
      </div>

      {/* Products */}
      <div className="products">
        {filteredFlowers.map((flower) => (
          <div key={flower.id} className="product-card">
            <img
              src={flower.image}
              alt={translations.flowers[flower.nameKey]}
            />
            <h3>{translations.flowers[flower.nameKey]}</h3>

            <div className="product-footer">
              <span>{flower.price}$</span>
              <button onClick={() => addToCart(flower)}>
                🛒 {t.addToCart}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredFlowers.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "40px" }}>
          {t.noResults}
        </p>
      )}
    </div>
  );
}