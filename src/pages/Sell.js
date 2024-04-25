import React, { useContext, useState } from 'react';
import UserContext from '../UserContext';
import ItemCard from './ItemCard';
import Modal from './Modal';
import SearchBar from '../SearchBar';
import Filters from '../Filters';

export default function Sell() {
    const { inventory } = useContext(UserContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const [filters, setFilters] = useState({
        color: '',
        rarity: '',
        quality: '',
        type: '',
        minPrice: 0,
        maxPrice: Infinity
    });

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
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
                [name]: Infinity
            }));
        } else {
            setFilters(prevFilters => ({
                ...prevFilters,
                [name]: parseFloat(value) || 0
            }));
        }
    };

    const filteredItems = inventory.filter(item => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase())
            && item.color.toLowerCase().includes(filters.color.toLowerCase())
            && item.rarity.toLowerCase().includes(filters.rarity.toLowerCase())
            && item.quality.toLowerCase().includes(filters.quality.toLowerCase())
            && item.type.toLowerCase().includes(filters.type.toLowerCase())
            && item.price >= filters.minPrice
            && item.price <= filters.maxPrice;
    });

    const endIndex = currentPage * itemsPerPage;
    const startIndex = endIndex - itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const goToNextPage = () => {
        setCurrentPage(current => Math.min(current + 1, totalPages));
    };

    const goToPreviousPage = () => {
        setCurrentPage(current => Math.max(current - 1, 1));
    };

    return (
        <div>
            <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
            <div className='sell-container'>
                <div className="filter-container">
                    <Filters filters={filters} handleFilterChange={handleFilterChange} handleResetFilters={() => setFilters({ color: '', rarity: '', quality: '', type: '', minPrice: 0, maxPrice: Infinity })} />
                </div>
                <div className="items-grid">
                    {currentItems.map(item => (
                        <ItemCard key={item.id} item={item} handleItemClick={() => handleItemClick(item)} buttonText="List" pageType="sell" />
                    ))}
                    {isModalOpen && <Modal item={selectedItem} closeModal={closeModal} buttonText="List" />}
                </div>
                <div className="pagination">
                    <button className="prev" onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
                    <span className="page-number">Page {currentPage} of {totalPages}</span>
                    <button className="next" onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
                </div>
            </div>
        </div>
    );
}
