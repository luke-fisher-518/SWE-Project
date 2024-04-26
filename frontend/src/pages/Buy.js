// Buy.js
import React, { useState, useContext } from 'react';
import ItemCard from './ItemCard';
import Modal from './Modal';
import SearchBar from '../SearchBar';
import Filters from '../Filters';
import useFetchItems from '../hooks/useFetchItems';
import UserContext from '../UserContext';

export default function Buy() {
    const { addToInventory } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageType, setPageType] = useState('buy');
    const itemsPerPage = 20;
    const [filters, setFilters] = useState({
        color: '',
        rarity: '',
        quality: '',
        type: '',
        minPrice: 0,
        maxPrice: Infinity
    });

    const handleResetFilters = (newFilters) => {
        setFilters(newFilters);
    };

    const items = useFetchItems();

    const handleBuy = (item) => {
        addToInventory(item);
    };

    const handleItemClick = (item, pageType) => {
        setSelectedItem(item);
        setIsModalOpen(true);
        setPageType(pageType);  // Assuming you have a state called pageType
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        if (name === "maxPrice" && value === "") {
            setFilters(prevFilters => ({
                ...prevFilters,
                [name]: Infinity // Set to Infinity if max price is empty
            }));
        } else {
            setFilters(prevFilters => ({
                ...prevFilters,
                [name]: name.includes("Price") ? parseFloat(value) : value
            }));
        }
    };

    const filteredItems = items.filter(item => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase())
            && item.color.toLowerCase().includes(filters.color.toLowerCase())
            && item.rarity.toLowerCase().includes(filters.rarity.toLowerCase())
            && item.quality.toLowerCase().includes(filters.quality.toLowerCase())
            && item.type.toLowerCase().includes(filters.type.toLowerCase())
            && item.price >= (filters.minPrice || 0)
            && item.price <= (filters.maxPrice || Infinity);
    });


    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const itemsOnCurrentPage = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const goToNextPage = () => {
        setCurrentPage(page => Math.min(page + 1, totalPages));
    };

    const goToPreviousPage = () => {
        setCurrentPage(page => Math.max(page - 1, 1));
    };

    return (

        <div>
            <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
            <div className='buy-container'>
                <div className="filter-container">
                    <Filters filters={filters} handleFilterChange={handleFilterChange} handleResetFilters={handleResetFilters} />
                </div>
                <div className="items-grid">
                    {itemsOnCurrentPage.map(item => (
                        <ItemCard key={item.id} item={item} handleItemClick={handleItemClick} handleBuy={handleBuy} buttonText="Buy" pageType="buy" />
                    ))}
                    {isModalOpen && <Modal item={selectedItem} closeModal={closeModal} />}
                </div>
                <div className="pagination">
                    <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
                </div>
            </div>
        </div>
    );
}