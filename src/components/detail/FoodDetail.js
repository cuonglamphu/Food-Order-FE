import React, { useState, useEffect } from 'react';
import MealService from '../../services/MealService';
import './FoodDetail.css';
import CommentsComponent from './Comment';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store-redux/cart/cartSlice';
import Swal from 'sweetalert2';

const FoodDetail = () => {
    const { mealId } = useParams();
    const dispatch = useDispatch();
    const [meal, setMeal] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("mealId from URL:", mealId);

        const fetchMeal = async () => {
            try {
                const response = await MealService.getMealById(mealId);
                console.log('Meal data fetched:', response.data);
                setMeal(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching meal data:', error);
                setLoading(false);
            }
        };

        fetchMeal();
    }, [mealId]);

    const handleAddToCart = () => {
        if (quantity > 0) {
            const orderItem = {
                mealId: meal.id,
                mealName: meal.name,
                mealTypeName: meal.mealType?.typeName,
                mealDescription: meal.description,
                mealImage: meal.image,
                mealImageName: meal.imageName,
                mealPrice: meal.price,
                quantity: quantity
            };

            dispatch(addItem(orderItem));
            alertSuccess(`Successfully added ${quantity} of ${meal.name} to cart!`);
        } else {
            alertInvalidInput("Invalid input, quantity must be a positive number!");
        }
    };

    const alertSuccess = (message) => {
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 1500
        });
    };

    const alertInvalidInput = (message) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!meal) {
        return <div>Meal not found</div>;
    }

    return (
        <div className="product-detail-container">
            <div className="product-detail">
                <div className="product-image">
                    <img src={`http://localhost:8080${meal.image}`} alt={meal.name} />
                </div>

                <div className="product-info">
                    <h2 className="product-category">{meal.mealType?.typeName}</h2>
                    <h1 className="product-name">{meal.name}</h1>
                    <p className="product-description">{meal.description}</p>
                    <div className="product-price">Price: ${meal.price.toFixed(2)}</div>
                    <div className="product-actions">
                        <label>Quantity:</label>
                        <input
                            type="number"
                            value={quantity}
                            min="1"
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />

                    </div>
                    <div>
                        <button className="add-to-cart-btn" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            <CommentsComponent mealId={mealId} />
        </div>
    );
};

export default FoodDetail;
