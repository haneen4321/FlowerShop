import "../styles/global.css";
import "../styles/home.css";

import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { flowersData } from "../../infrastructure/data/flowersData";

export default function Home() {
  const { addToCart } = useCart();
  const { translations } = useLanguage();
  const t = translations.home;

  // نختار Best Sellers (مثال: أول 4 منتجات)
  const bestSellers = flowersData.slice(0, 4);

  return (
    <div className="home">
      {/* ===== Hero Section ===== */}
      <section className="hero">
        <div className="hero__text">
          <h1>
            {t.mineTitleLine}
          </h1>

          <button className="btn-primary">{t.browse}</button>
        </div>

        <div className="hero__images">
          <img src="/images/flowers/SunFlower.png" alt="SunFlower" />
          <img src="/images/flowers/CherryBlossom.png" alt="Cherry Blossom" />
          <img src="/images/flowers/Lotus.png" alt="Lotus" />
          <img src="/images/flowers/Jasmine.png" alt="Jasmine" />
          <img src="/images/flowers/Periwinkle.png" alt="Periwinkle" />
          <img src="/images/flowers/Rose.png" alt="Rose" />
        </div>
      </section>

      {/* ===== Best Sellers ===== */}
      <section className="best-sellers">
        <h2 className="section-title">{t.bestSellers}</h2>

        <div className="products">
          {bestSellers.map((flower) => (
            <div key={flower.id} className="product-card">
              <img src={flower.image} alt={flower.name} />
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
      </section>
    </div>
  );
}