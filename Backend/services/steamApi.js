import { useState, useEffect } from 'react';

const useFetchItems = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const apiUrl = `https://www.steamwebapi.com/steam/api/items?key=H2NRIJFFL5E4PR9I&page=5&max=20`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setItems(data.result.items);
            })
            .catch(error => console.error('Error fetching items:', error));
    }, []);

    return items;
};

export default useFetchItems;