export const isSaleActive = (sale) => {
  if (!sale?.enabled) return false;

  const now = new Date();
  const start = sale.startDate ? new Date(sale.startDate) : null;
  const end = sale.endDate ? new Date(sale.endDate) : null;

  if (start && now < start) return false;
  if (end && now > end) return false;

  return true;
};

export const calculatePrice = (basePrice, sale) => {
  if (!isSaleActive(sale)) {
    return {
      finalPrice: basePrice,
      originalPrice: null,
      discountPercentage: null
    };
  }

  let finalPrice = basePrice;

  if (sale.discountType === "percentage") {
    finalPrice =
      basePrice - (basePrice * sale.discountValue) / 100;
  }

  return {
    finalPrice: Math.round(finalPrice),
    originalPrice: basePrice,
    discountPercentage: sale.discountValue
  };
};
