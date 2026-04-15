import { useEffect, useMemo, useState, useRef } from "react";
import "../styles/global.css";
import "../styles/shop.css";
import "../styles/product.css";
import { flowersData } from "../../infrastructure/data/flowersData";
import FlowerRepositoryImpl from "../../infrastructure/repositories/FlowerRepositoryImpl";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
const flowerRepository = new FlowerRepositoryImpl();
export default function Shop() {
  const { addToCart } = useCart();
  const { translations } = useLanguage();
  const t = {
    ...translations.global,
    ...translations.buttons,
    ...translations.shop,
  };
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("cheap");
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [bestSellers, setBestSellers] = useState([]);
  const filterRef = useRef(null);
  const sortRef = useRef(null);
  useEffect(() => {
    setBestSellers(flowerRepository.getBestSellers(8));
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {setFilterOpen(false);}
      if (sortRef.current && !sortRef.current.contains(event.target)) {setSortOpen(false);}
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const getFlowerName = (flower) => {
    return (
      translations.flowers?.[flower.nameKey] ||
      flower.name ||
      ""
    );
  };
  const displayedFlowers = useMemo(() => {
    const source =
      activeFilter === "best"
        ? bestSellers.map((best) =>
            flowersData.find((f) => f.id === best.id) || best
          )
        : flowersData;
    const filtered = source.filter((flower) => {
      const name = getFlowerName(flower).toLowerCase();
      return name.includes(search.toLowerCase());
    });
    return filtered.sort((a, b) => {
      if (sort === "cheap") return a.price - b.price;
      if (sort === "expensive") return b.price - a.price;
      if (sort === "alpha") {
        return getFlowerName(a)
          .toLowerCase()
          .localeCompare(getFlowerName(b).toLowerCase());
      }
      return 0;
    });
  }, [activeFilter, bestSellers, search, sort, translations]);
  return (
    <div className="shop-page">
      <div className="shop-filter">
        <div
          className="filter-left"
          ref={filterRef}
          onClick={() => {
            setFilterOpen((prev) => !prev);
            setSortOpen(false);
          }}>
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
                }}>{t.best_sellers}</div>
              <div
                className={`filter-option ${
                  activeFilter === "all" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveFilter("all");
                  setFilterOpen(false);
                }}>
                {t.all_types}
              </div>
            </div>
          )}
        </div>
        <div className="filter-search">
          <input
            type="text"
            placeholder={t.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}/>
        </div>
        <div
          className="filter-right"
          ref={sortRef}
          onClick={() => {
            setSortOpen((prev) => !prev);
            setFilterOpen(false);
          }}>
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
                }}>{t.cheap}</div>
              <div
                className={`filter-option ${
                  sort === "expensive" ? "active" : ""
                }`}
                onClick={() => {
                  setSort("expensive");
                  setSortOpen(false);
                }}>{t.expensive}</div>
              <div
                className={`filter-option ${
                  sort === "alpha" ? "active" : ""
                }`}
                onClick={() => {
                  setSort("alpha");
                  setSortOpen(false);
                }}>{t.alphabetical}</div>
            </div>
          )}
        </div>
      </div>
      <div className="products">
        {displayedFlowers.map((flower) => {
          const flowerName = getFlowerName(flower);
          return (
            <div key={flower.id} className="product-card">
              <img src={flower.image} alt={flowerName} />
              <h3>{flowerName}</h3>
              <div className="product-footer">
                <span>{flower.price}$</span>
                <button
                  className="btn-secondary"
                  onClick={() => addToCart(flower)}>🛒 {t.add_to_cart}</button>
              </div>
            </div>
          );
        })}
      </div>
      {displayedFlowers.length === 0 && (<p>{t.no_results}</p>)}
    </div>
  );
}