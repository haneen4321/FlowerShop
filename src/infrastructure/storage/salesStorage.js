const SALES_KEY = "flower_sales";
export const getSalesStats = () => {
  const data = localStorage.getItem(SALES_KEY);
  return data ? JSON.parse(data) : {};
};

export const increaseFlowerSales = (flowerId) => {
  const stats = getSalesStats();
  stats[flowerId] = (stats[flowerId] || 0) + 1;
  localStorage.setItem(SALES_KEY, JSON.stringify(stats));
};