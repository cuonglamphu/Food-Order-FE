import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap';
import './ListDiscountComponent.css';

const ListDiscountComponent = () => {
    const [discounts, setDiscounts] = useState([]);
    const [id, setId] = useState(0);
    const [code, setCode] = useState('');
    const [usageCount, setUsageCount] = useState(0);
    const [discountPercent, setDiscountPercent] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const discount = { id, code, usageCount, discountPercent, isActive, setCode, setUsageCount, setDiscountPercent, setIsActive };

    useEffect(() => {
        loadMockData();
    }, []);

    const loadMockData = () => {
        const mockData = [
            { id: 1, code: 'DISCOUNT10', usageCount: 5, discountPercent: 10, isActive: true },
            { id: 2, code: 'DISCOUNT20', usageCount: 10, discountPercent: 20, isActive: false },
        ];
        setDiscounts(mockData);
    };

    const handleClose = () => {
        setShow(false);
        discount.setCode('');
        discount.setUsageCount(0);
        discount.setDiscountPercent(0);
        discount.setIsActive(true);
    };

    const handleCloseEdit = () => {
        setShowEdit(false);
        discount.setCode('');
        discount.setUsageCount(0);
        discount.setDiscountPercent(0);
        discount.setIsActive(true);
    };

    const handleShow = () => {
        setShow(true);
        setId(null);
    };

    const handleShowEdit = (discount) => {
        setShowEdit(true);
        setId(discount.id);
        setCode(discount.code);
        setUsageCount(discount.usageCount);
        setDiscountPercent(discount.discountPercent);
        setIsActive(discount.isActive);
    };

    const handleSubmitEdit = () => {
        if (discount.code.trim() === "" || discount.discountPercent <= 0) {
            alert("Invalid input");
            return;
        }

        const updatedDiscount = { id, code, usageCount, discountPercent, isActive };
        setDiscounts((prevDiscounts) =>
            prevDiscounts.map((discount) => (discount.id === id ? updatedDiscount : discount))
        );

        alert("Successfully updated discount!");
        handleCloseEdit();
    };

    const handleSubmit = () => {
        if (discount.code.trim() === "" || discount.discountPercent <= 0) {
            alert("Invalid input");
            return;
        }

        const newDiscount = {
            id: discounts.length + 1,
            code,
            usageCount,
            discountPercent,
            isActive,
        };
        setDiscounts([...discounts, newDiscount]);

        alert("Successfully created discount!");
        handleClose();
    };

    const deleteDiscount = (discountId) => {
        setDiscounts((prevDiscounts) => prevDiscounts.filter((discount) => discount.id !== discountId));
        alert("Successfully deleted discount!");
    };

    const alertAreYouSureDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "If you click yes, discount will be deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteDiscount(id);
            }
        });
    };

    return (
        <>
            <div className="container">
                <h2 className="text-center">Discount Code Management (Mock Data)</h2>
                <button className="btn btn-success mb-2" onClick={handleShow}>Create new discount</button>
                <table id="table" className="table table-hover">
                    <thead className="thead-name">
                        <tr>
                            <th className="theadth">ID</th>
                            <th className="theadth">Code</th>
                            <th className="theadth">Usage Count</th>
                            <th className="theadth">Discount (%)</th>
                            <th className="theadth">Active</th>
                            <th className="theadth">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {discounts.map((discount) => (
                            <tr key={discount.id}>
                                <td className="td-content">{discount.id}</td>
                                <td className="td-content">{discount.code}</td>
                                <td className="td-content">{discount.usageCount}</td>
                                <td className="td-content">{discount.discountPercent}</td>
                                <td className="td-content">{discount.isActive ? 'Yes' : 'No'}</td>
                                <td className="td-content">
                                    <button className="btn btn-success" >Update</button>
                                    <button className="btn btn-danger" >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ListDiscountComponent;
