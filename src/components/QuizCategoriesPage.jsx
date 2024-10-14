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

const fetchCategories = async () => {
    try{
        const response = await fetch('https://opentdb.com/api_category.php');
        const data = await response.json();
        return data.trivia_categories;
    }catch(error){
        return false;
    }
}

export default function QuizCategoriesPage() {
const [categories, setCategories] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [isFailed, setIsFailed] = useState(false);
const [isLoading, setIsLoading] = useState(true);

const navigate = useNavigate();

const {setCategory} = useQuizSettingsStore();

useEffect(() => {
    setIsFailed(false);
    fetchCategories()
    .then((categories) => {
        //if fetch fails, throw an error
        if(!categories)
            throw new Error('Failed to fetch categories');

        setCategories(categories)
    })
    //if fetch fails, set isFailed to true
    .catch(() => setIsFailed(true))
    //set isLoading to false after fetch is done. whether its succesful or not
    .finally(() => setIsLoading(false));
},[]) 

useEffect(() => {
    //if there are no categories to filter, do nothing
    if(categories.length === 0) return;

    //filter categories based on search term
    const filteredCategories = categories.filter((category) => category.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCategories(filteredCategories);
}, [searchTerm]);

const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
}

const handleCategoryClick = (category) => {
    //set category in redux store
    setCategory(category);
    //navigate to category question settings page
    navigate(QUIZ_SETTINGS);
}

return (
    <>
        <Header button={{text:"Past Questions", route:QUIZ_HISTORY}}/>
        <div className="content-wrapper">
            <h2 className="page-title">Quizzy Does It!</h2>
            {
                //if loading, show loader, if failed, show warning, else show categories
                isLoading ? <Loader message="Loading categories" /> : isFailed ? <Warning message="Failed to fetch categories" /> : (
                    <>
                        <div className="search-bar-wrapper">
                            <input className="search-bar-input" type="text" value={searchTerm} onChange={handleInputChange} placeholder="Search Trivia Topics" />
                            <button className="search-bar-button"><img src={searchIcon} style={{width:'25px'}}/></button>
                        </div>
                        <div className="categories-grid">
                            {
                                categories.map((category) => (
                                    <div key={category.id} className="categories-card-wrapper" onClick={()=>handleCategoryClick(category)}>
                                        <img src={quizIcon} style={{height:'40px', marginRight:'10px'}} />
                                        {category.name}
                                    </div>
                                ))
                            }
                        </div>
                    </>
                )
            }
        </div>
    </>
)
}