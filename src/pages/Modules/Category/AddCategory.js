import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import Swal from 'sweetalert2'

import { useCreateCategoryMutation, useUpdateCategoryMutation } from "redux/slices/user/user";
import { apiResHandler } from "utils/axiosBaseQuery";
import { getString } from "localization/config";

const AddCategory = ({ defaultCategoryName, isEdit }) => {
    const [categoryName, setCategoryName] = useState('');
    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();

    useEffect(() => {
        if (defaultCategoryName) {
            setCategoryName(defaultCategoryName)
        }
    }, [defaultCategoryName])


    const handleOnSubmit = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!isEdit) {
            apiResHandler(createCategory({ data: { name: categoryName } }), () => {
                Swal.fire(
                    getString('newCategorySaved'),
                    '',
                    'success'
                );
                setCategoryName('')
            }, () => {
                Swal.fire({
                    title: 'Error!',
                    text: getString('somethingWentWrong'),
                    icon: 'error',
                })
            })
        }
        else {
            apiResHandler(updateCategory({ data: { oldCategory: defaultCategoryName, newCategory: categoryName } }), () => {
                Swal.fire(
                    getString('categoryUpdated'),
                    '',
                    'success'
                );
            }, () => {
                Swal.fire({
                    title: 'Error!',
                    text: getString('somethingWentWrong'),
                    icon: 'error',
                })
            })
        }

    }

    return (
        <form onSubmit={handleOnSubmit} className='flex flex-col  gap-4 bg-white1 rounded-xl w-full items-center p-4'>
            <label className='text-black font-semibold'>{isEdit ? 'Edit Category' : 'Create New Category'}</label>
            <input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className={`border p-2 rounded-xl ${isEdit ? 'w-1/2' : 'w-full'}`} required placeholder='New Category' />
            <button type='submit' className={`px-4 py-2 bg-blue rounded-full text-white ${isEdit ? 'w-1/4' : 'w-full'}`}> {isEdit ? 'Update' : 'Submit'} </button>
        </form>
    )
}

AddCategory.propTypes = {
    defaultCategoryName: PropTypes.string,
    isEdit: PropTypes.bool,
};

export default AddCategory