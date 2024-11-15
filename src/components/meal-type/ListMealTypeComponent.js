import MealTypeService from '../../services/MealTypeService';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap';
import CreateMealTypeComponent from './CreateMealTypeComponent';
import EditMealTypeComponent from './EditMealTypeComponent';
import './ListMealTypeComponent.css';

const ListMealTypeComponent = () => {
    const [mealTypes, setMealTypes] = useState([]);
    const [id, setId] = useState(0);
    const [typeName, setTypeName] = useState('');
    const [description, setDescription] = useState('');
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedFile, setSelectedFile] = useState(undefined);

    const file = { selectedFile, setSelectedFile };
    const mealType = { id, typeName, description, setTypeName, setDescription };

    useEffect(() => {
        getAllMealTypes();
    }, []);

    const getAllMealTypes = () => {
        MealTypeService.getAllMealTypes()
            .then((response) => {
                setMealTypes(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleClose = () => {
        setShow(false);
        mealType.setTypeName('');
        mealType.setDescription('');
    };

    const handleCloseEdit = () => {
        setShowEdit(false);
        mealType.setTypeName('');
        mealType.setDescription('');
    };

    const handleShow = () => {
        setShow(true);
        setId(null);
    };

    const handleShowEdit = (mealType) => {
        setShowEdit(true);
        setId(mealType.id);
        setTypeName(mealType.typeName);
        setDescription(mealType.description);
    };

    const handleSubmitEdit = () => {
        if (mealType.typeName.trim() === "" || mealType.description.trim() === "") {
            alert("Invalid input");
            return;
        }

        const fd = new FormData();
        fd.append('mealType', JSON.stringify({ id, typeName, description }));

        if (selectedFile) {
            fd.append('image', selectedFile);
        }

        MealTypeService.updateMealType(fd)
            .then((response) => {
                if (response.data === "success") {
                    alert("Successfully updated meal type!");
                    handleCloseEdit();
                    getAllMealTypes();
                } else {
                    alert("Failed to update meal type!");
                }
            })
            .catch((error) => {
                console.error("Error updating meal type:", error);
            });
    };

    const handleSubmit = () => {
        if (mealType.typeName.trim() === "" || mealType.description.trim() === "") {
            alert("Invalid input");
            return;
        }

        const fd = new FormData();
        fd.append('mealType', JSON.stringify({ typeName, description }));

        if (selectedFile) {
            fd.append('image', selectedFile);
        }

        MealTypeService.createMealType(fd)
            .then((response) => {
                if (response.data === "success") {
                    alert("Successfully created meal type!");
                    handleClose();
                    getAllMealTypes();
                } else {
                    alert("Failed to create meal type!");
                }
            })
            .catch((error) => {
                console.error("Error creating meal type:", error);
            });
    };

    const deleteMealType = (mealTypeId) => {
        MealTypeService.deleteMealType(mealTypeId)
            .then((response) => {
                if (response.data === "success") {
                    alert("Successfully deleted meal type!");
                    getAllMealTypes();
                } else {
                    alert("Failed to delete meal type!");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const alertAreYouSureDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "If you click yes, meal type will be deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMealType(id);
            }
        });
    };

    return (
        <>
            <div className="container">
                <h2 className="text-center">Meal type list</h2>
                <button className="btn btn-success mb-2" onClick={handleShow}>Create new meal type</button>
                <table id="table" className="table table-hover nesto">
                    <thead className="thead-name">
                        <tr>
                            <th className="theadth">Meal ID</th>
                            <th className="theadth">Image</th>
                            <th className="theadth">Type name</th>
                            <th className="theadth">Description</th>
                            <th className="theadth">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mealTypes.map((mealType) => (
                            <tr key={mealType.id}>
                                <td className="td-content">{mealType.id}</td>
                                <td className="td-content-img">
                                    <img className="mealPic" src={`http://localhost:8080${mealType.image}`} alt="" />
                                </td>
                                <td className="td-content">{mealType.typeName}</td>
                                <td className="td-content">{mealType.description}</td>
                                <td className="td-content">
                                    <button className="btn btn-success" onClick={() => handleShowEdit(mealType)}>Update</button>
                                    <button className="btn btn-danger" onClick={() => alertAreYouSureDelete(mealType.id)} style={{ marginLeft: "5px" }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new meal type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateMealTypeComponent mealType={mealType} file={file} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleSubmit}>Save changes</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit meal type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditMealTypeComponent mealType={mealType} file={file} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>Close</Button>
                    <Button variant="primary" onClick={handleSubmitEdit}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ListMealTypeComponent;
