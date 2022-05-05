import React, { useState } from "react";
import Swal from 'sweetalert2'

import { Table, Modal } from "components";
import { getString } from "localization/config";
import Main from "pages/Layout/Main/index";
import AddCategory from "pages/Modules/Category/AddCategory";
import { useGetAllCategoriesQuery, useDeleteCategoryMutation } from "redux/slices/user/user";
import { objectToArray } from "utils/object";
import { apiResHandler } from "utils/axiosBaseQuery";

const Category = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const [deleteCategory] = useDeleteCategoryMutation();

  const { data, isLoading } = useGetAllCategoriesQuery();

  const cols = [{ title: "Name" }];

  const handleDeleteCategory = () => {
    apiResHandler(deleteCategory({ data: { name: selectedCategory } }), () => {
      Swal.fire(
        getString('transactionDeleted'),
        '',
        'success'
      );
      setShowDeleteModal(false);
    }, () => {
      Swal.fire({
        title: 'Error!',
        text: getString('somethingWentWrong'),
        icon: 'error',
      })
    });
  };

  const handleEditClick = (data) => {
    setSelectedCategory(data[0])
    setIsOpen(true)
  }

  const handleDeleteClick = (data) => {
    setSelectedCategory(data[0])
    setShowDeleteModal(true)
  }


  return isLoading ? <div>...</div> : (
    <Main>
      <Modal
        isOpen={isOpen}
        handleModalClose={() => {
          setIsOpen(false);
          setSelectedCategory(null)
        }}>
        <div className="h-60 w-full overflow-y-auto p-2 bg-darkGray ">
          <AddCategory isEdit defaultCategoryName={selectedCategory} />
        </div>
      </Modal>
      <Modal
        isOpen={showDeleteModal}
        handleModalClose={() => setShowDeleteModal(false)}>
        <div className="flex items-center justify-center  h-40 overflow-y-auto p-2 bg-darkGray">
          <div className="flex flex-col items-center gap-2">
            <strong className="text-black font-semibold text-md">{getString('areYouSureDelete')}</strong>
            <div className="p-2 space-x-4">
              <button className="bg-ligthBlack px-4 py-2 text-white ml-auto rounded-xl" onClick={() => setShowDeleteModal(false)}>No</button>
              <button className="bg-blue px-4 py-2 text-white ml-auto rounded-xl" onClick={handleDeleteCategory}>Yes</button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="flex flex-col w-full items-center sm:justify-center gap-4 h-full ">
        <AddCategory />
        <Table handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} data={objectToArray(data?.data || [[]])} tableCols={cols} columnDefs={[]} />
      </div>
    </Main>
  );
};

export default Category;
