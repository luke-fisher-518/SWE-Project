import { useState } from 'react';
import itemsData from './response.json';
import chroma from 'chroma-js';


const useFetchItems = () => {
    const qualityMap = {
        fn: 'Factory New',
        mw: 'Minimal Wear',
        ft: 'Field Tested',
        ww: 'Well Worn',
        bs: 'Battle Scarred'
    };

    function getColorName(hex) {
        if (!hex) return 'N/A';  // Return 'N/A' if no color provided

        try {
            const color = chroma(hex);
            const h = color.get('hsl.h'); // Hue
            const s = color.get('hsl.s'); // Saturation
            const l = color.get('hsl.l'); // Lightness

            if (l < 0.15) return 'Black'; // Very dark colors
            if (l > 0.85) return 'White'; // Very light colors
            if (s < 0.2) return 'Gray'; // Low saturation

            if (h >= 0 && h < 15) return 'Red';
            if (h >= 15 && h < 45) return 'Orange';
            if (h >= 45 && h < 70) return 'Yellow';
            if (h >= 70 && h < 150) return 'Green';
            if (h >= 150 && h < 200) return 'Cyan';
            if (h >= 200 && h < 260) return 'Blue';
            if (h >= 260 && h < 300) return 'Purple';
            if (h >= 300 && h < 330) return 'Pink';
            if (h >= 330 && h < 360) return 'Red'; // Wrap around to red
            return 'Other';  // Default case
        } catch (e) {
            console.error("Color parsing error:", e);
            return 'Other'; // Fallback in case of an invalid hex code
        }
    }

    const [items, setItems] = useState(() => {
        // Transform the imported data on initial load
        return itemsData.map((item, index) => ({
            id: index + 1,
            name: item.marketname,
            price: item.pricereal,
            image: item.itemimage,
            color: getColorName(item.bordercolor),
            previousPrice: item.pricelatestsell,
            averagePrice: item.priceavg,
            minPrice: item.pricemin,
            maxPrice: item.pricemax,
            type: item.itemgroup || 'N/A',
            rarity: item.rarity || 'N/A',
            quality: qualityMap[item.wear] || item.wear || 'N/A',
        }));
    });

    return items;
};

export default useFetchItems;
