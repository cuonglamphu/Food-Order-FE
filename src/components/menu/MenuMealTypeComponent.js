import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";  // Dùng useSelector để lấy từ khóa tìm kiếm từ Redux
import MealTypeService from "../../services/MealTypeService";
import { Link } from "react-router-dom";
import "./MenuMealTypeComponent.css";

const MenuMealTypeComponent = () => {
    const [mealTypes, setMealTypes] = useState([]);
    const searchTerm = useSelector((state) => state.search.searchTerm);  // Lấy từ khóa tìm kiếm từ Redux

    useEffect(() => {
        getAllMealTypes();  // Lấy tất cả loại món ăn khi component được render lần đầu
    }, []);

    const getAllMealTypes = () => {
        MealTypeService.getAllMealTypes()
            .then((response) => {
                setMealTypes(response.data);
                console.log(response)  // Cập nhật danh sách mealTypes
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Lọc mealTypes theo từ khóa tìm kiếm
    const filteredMealTypes = mealTypes.filter((mealType) =>
        mealType.typeName.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    return (
        <div className="container-mealType">
            {/* Hiển thị các loại món ăn đã lọc */}
            {filteredMealTypes.length > 0 ? (
                filteredMealTypes.map((mealType) => (
                    <div className="card-meal-type" key={mealType.id}>
                        <img
                            className="image"
                            src={`http://localhost:8080${mealType.image}`} 
                            alt=""
                        />
                        <div className="name-container">
                            <h4 className="name-content">{mealType.typeName}</h4>
                        </div>
                        <div className="description-container">
                            <p>{mealType.description}</p>
                        </div>
                        <Link
                            className="btn-see-items"
                            to={`/meals-by-meal-type/${mealType.id}`}
                        >
                            Show offers
                            <svg
                                className="show-items-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 512 512"
                            >
                                <path d="M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32" />
                            </svg>
                        </Link>
                    </div>
                ))
            ) : (
                <div className="no-products-message">
                    <p>There are no food types that match the search keyword.</p>
                </div>
            )}
        </div>
    );
};

export default MenuMealTypeComponent;
