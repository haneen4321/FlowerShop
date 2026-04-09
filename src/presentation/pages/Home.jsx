import "../styles/global.css";
import "../styles/home.css";
import "../styles/product.css";
import Button from "../components/Button";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { flowersData } from "../../infrastructure/data/flowersData";
export default function Home() {
  const { addToCart } = useCart();
  const { translations } = useLanguage();
  const t = {...translations.global, ...translations.buttons,};
  const bestSellers = flowersData.slice(0, 4);
  return (
    <div>
      <section className="home">
        <div className="mineTitle">
          <h1>{t.home_h1}</h1>
        </div>
        <div className="home_images">
          <img src="/images/flowers/SunFlower.png" alt="SunFlower"/>
          <img src="/images/flowers/CherryBlossom.png" alt="Cherry Blossom"/>
          <img src="/images/flowers/Lotus.png" alt="Lotus"/>
          <img src="/images/flowers/Jasmine.png" alt="Jasmine"/>
          <img src="/images/flowers/Periwinkle.png" alt="Periwinkle"/>
          <img src="/images/flowers/Rose.png" alt="Rose"/>
        </div>
      </section>
      <section className="best-sellers">
        <h2 className="section-title">{t.best_sellers}</h2>
        <div className="products">
          {bestSellers.map((flower) => (
            <div key={flower.id} className="product-card">
              <img src={flower.image} alt={flower.name}/>
              <h3>{translations.flowers[flower.nameKey]}</h3>
              <div className="product-footer">
                <span>{flower.price}$</span>
                <Button className="btn-secondary" onClick={() => addToCart(flower)}>🛒 {t.add_to_cart}</Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}