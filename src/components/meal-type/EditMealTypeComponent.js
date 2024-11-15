import React, { useEffect } from 'react';

const EditMealTypeComponent = (props) => {
    const { mealType, file } = props; // Receiving props for mealType and file

    const onChoseFile = (e) => {
        file.setSelectedFile(e.target.files[0]); // Set selected file in parent state
        console.log("Selected file:", e.target.files[0]);
    };

    return (
        <div className="container-add-meal">
            <form>
                <div className="form-group mb-2">
                    <label className="form-label">Type Name: </label>
                    <input
                        type="text"
                        placeholder="Insert name"
                        name="typeName"
                        className="form-control"
                        value={mealType.typeName}
                        onChange={(e) => mealType.setTypeName(e.target.value)}
                    />
                </div>

                <div className="form-group mb-2">
                    <label className="form-label">Description: </label>
                    <input
                        type="text"
                        placeholder="Insert description"
                        name="description"
                        className="form-control"
                        value={mealType.description}
                        onChange={(e) => mealType.setDescription(e.target.value)}
                    />
                </div>

                <div className="form-group mb-2">
                    <label className="form-label">Upload Image</label>
                    <input
                        type="file"
                        name="image"
                        className="form-control"
                        onChange={onChoseFile}
                    />
                </div>
            </form>
        </div>
    );
};

export default EditMealTypeComponent;
