import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import Swal from 'sweetalert2'

import { useGetAllCategoriesQuery, useCreateTransactionMutation, useUpdateTransactionMutation } from "redux/slices/user/user";
import { apiResHandler } from "utils/axiosBaseQuery";
import { getString } from "localization/config";

const AddNewTransaction = ({ title, type, data, isEdit, fallback }) => {
    const { data: categories } = useGetAllCategoriesQuery();
    const [createTransaction, { isLoading }] = useCreateTransactionMutation();
    const [updateTransaction, { isLoading: i1 }] = useUpdateTransactionMutation();

    const [transactionInfo, setTransactionInfo] = useState({
        name: "",
        categoryName: "",
        date: "",
        price: "",
        description: "",
        type: type
    });

    useEffect(() => {
        if (data.id) {
            setTransactionInfo(data);
        }
    }, [data])


    const handleOnchange = (e) => {
        setTransactionInfo({ ...transactionInfo, [e.target.name]: e.target.value })
    }

    const handleOnSubmit = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (isEdit) {
            apiResHandler(updateTransaction({ data: transactionInfo }), () => {
                Swal.fire(
                    getString('transactionUpdated'),
                    '',
                    'success'
                );
                setTransactionInfo({
                    name: "",
                    categoryName: "",
                    date: "",
                    price: "",
                    description: "",
                    type: type
                });
                fallback()
            }, () => {
                Swal.fire({
                    title: 'Error!',
                    text: getString('somethingWentWrong'),
                    icon: 'error',
                })
            });
        } else {
            apiResHandler(createTransaction({ data: transactionInfo }), () => {
                Swal.fire(
                    getString('transactionSaved'),
                    '',
                    'success'
                );
                setTransactionInfo({
                    name: "",
                    categoryName: "",
                    date: "",
                    price: "",
                    description: "",
                    type: type
                });
                fallback();
            }, () => {
                Swal.fire({
                    title: 'Error!',
                    text: getString('somethingWentWrong'),
                    icon: 'error',
                })
            });
        }

    }


    return (
        <form onSubmit={handleOnSubmit} className='flex flex-col gap-4 bg-white1 rounded-xl w-full items-center p-4'>
            <label className='text-black font-semibold'>{title}</label>
            <input value={transactionInfo.name} onChange={handleOnchange} name="name" className='border p-2 rounded-xl w-1/2' required placeholder='Name' />
            <textarea value={transactionInfo.description} onChange={handleOnchange} name="description" className='border p-2 rounded-xl w-1/2' required placeholder='description' />
            <input value={transactionInfo.price} onChange={handleOnchange} name="price" type={'number'} className='border p-2 rounded-xl w-1/2' required placeholder='Price$' />
            <input value={transactionInfo.date} onChange={handleOnchange} name="date" type={'month'} className='border p-2 rounded-xl w-1/2' required placeholder='Date' />
            <select
                required
                onChange={handleOnchange}
                className='border p-2 rounded-xl w-1/2'
                name="categoryName"
                id="categories"
                value={transactionInfo.categoryName}>
                <option></option>
                {categories?.data?.map((elem, idx) => <option value={elem.name} key={elem.name + idx}> {elem.name} </option>)}
            </select>
            <button disabled={isLoading || i1} className='w-1/2 px-4 py-2 bg-blue rounded-full text-white' type='submit'> {isEdit ? "Update" : "Submit"} </button>
        </form>
    )
}


AddNewTransaction.propTypes = {
    title: PropTypes.string,
    type: PropTypes.number,
    data: PropTypes.object,
    isEdit: PropTypes.bool,
    fallback: PropTypes.func,
};

AddNewTransaction.defaultProps = {
    data: {},
    isEdit: false,
    fallback: () => { }
}

export default AddNewTransaction;