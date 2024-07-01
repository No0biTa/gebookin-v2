// src/utils/formatPrice.js
export const formatPriceToMillion = (price) => {
    if (typeof price !== 'number') {
        return 'Invalid price';
    }

    if (price >= 1000000) {
        return (price / 1000000).toFixed(1) + 'M'; // misal: 1.2M untuk 1.200.000
    }

    return price.toLocaleString(); // misal: 1.000.000 untuk 1.000.000
};
