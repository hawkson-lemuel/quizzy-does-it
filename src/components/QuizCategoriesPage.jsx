import searchIcon from '../assets/search.png';
import quizIcon from '../assets/quiz.png';
import "../quizCategoriesPage.css";
import { useEffect, useState } from 'react';
import { QUIZ_HISTORY, QUIZ_SETTINGS } from '../utils/routes';
import { useNavigate } from 'react-router-dom';
import { useQuizSettingsStore } from '../store/quizSettingsStore';
import Header from './Header';
import Loader from './Loader';
import Warning from './Warning';
import React from 'react';

/**
 * Fetches quiz categories from the Open Trivia Database API.
 * returns an array of trivia categories or false if the fetch fails.
 */
const fetchCategories = async () => {
    try {
        const response = await fetch('https://opentdb.com/api_category.php');
        const data = await response.json();
        return data.trivia_categories;
    } catch (error) {
        return false;
    }
}

export default function QuizCategoriesPage() {
    // State variables
    const [categories, setCategories] = useState([]); // this stores the filtered list that is displayed
    const [fullCategoriesList, setFullCategoriesList] = useState([]); //this stores the full list that is returned from the API and is what we filter from
    const [searchTerm, setSearchTerm] = useState('');
    const [isFailed, setIsFailed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const { setCategory } = useQuizSettingsStore();

    // Fetch categories on component mount
    useEffect(() => {
        setIsFailed(false);
        fetchCategories()
            .then((categories) => {
                // If fetch fails, throw an error
                if (!categories)
                    throw new Error('Failed to fetch categories');

                setCategories(categories);
                setFullCategoriesList(categories);
            })
            // If fetch fails, set isFailed to true
            .catch(() => setIsFailed(true))
            // Set isLoading to false after fetch is done, whether it's successful or not
            .finally(() => setIsLoading(false));
    }, []);

    // Filter categories based on search term
    useEffect(() => {
        // If there are no categories to filter, do nothing
        if (fullCategoriesList.length === 0) return;

        // Filter categories based on search term
        const filteredCategories = fullCategoriesList.filter((category) => category.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setCategories(filteredCategories);
    }, [searchTerm]);

    // Handle search input change
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    }

    // Handle category click
    const handleCategoryClick = (category) => {
        // Set category in the store
        setCategory(category);
        // Navigate to category question settings page
        navigate(QUIZ_SETTINGS);
    }

    return (
        <>
            <Header button={{ text: "Past Questions", route: QUIZ_HISTORY }} />
            <div className="content-wrapper">
                <h2 className="page-title">Quizzy Does It!</h2>
                {
                    // If loading, show loader; if failed, show warning; else show categories
                    isLoading ? <Loader message="Loading categories" /> : isFailed ? <Warning message="Failed to fetch categories" /> : (
                        <>
                            <div className="search-bar-wrapper">
                                <input className="search-bar-input" type="text" value={searchTerm} onChange={handleInputChange} placeholder="Search Trivia Topics" />
                                <button className="search-bar-button"><img src={searchIcon} style={{ width: '25px' }} /></button>
                            </div>
                            {
                                categories.length > 0 ? (
                                    <div className="categories-grid">
                                        {
                                            categories.map((category) => (
                                                <div key={category.id} className="categories-card-wrapper" onClick={() => handleCategoryClick(category)}>
                                                    <img src={quizIcon} style={{ height: '40px', marginRight: '10px' }} />
                                                    {category.name}
                                                </div>
                                            ))
                                        }
                                    </div>
                                ) : (
                                    <div style={{ marginTop: '40px' }}>No categories found</div>
                                )
                            }
                        </>
                    )
                }
            </div>
        </>
    )
}