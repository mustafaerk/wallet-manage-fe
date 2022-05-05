import React, { useState } from "react";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

import { Table, Modal } from "components";
import Main from "pages/Layout/Main/index";
import { getString } from "localization/config";
import AddNewTransaction from "pages/Modules/Transaction/AddNewTransaction";
import { useGetAllOutgoingQuery, useDeleteTransactionMutation } from "redux/slices/user/user";
import { objectToArray, moneyTableCols, tableColRef } from "utils/object";
import { apiResHandler } from "utils/axiosBaseQuery";

const Outgoing = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [currentTransactionInfo, setCurrentTransactionInfo] = useState({});

  const { data: transactions, isLoading } = useGetAllOutgoingQuery();
  const [deleteTransaction] = useDeleteTransactionMutation();

  const handleDeleteTransaction = () => {
    apiResHandler(deleteTransaction({ data: { id: deleteId } }), () => {
      Swal.fire(
        getString('transactionDeleted'),
        '',
        'success'
      );
      setShowDeleteButton(false);
    }, () => {
      Swal.fire({
        title: 'Error!',
        text: getString('somethingWentWrong'),
        icon: 'error',
      })
    });
  }

  const handleDeleteClick = (data) => {
    const currentTransaction = transactions?.data.find(transaction => transaction.id == data[0]);
    setDeleteId(currentTransaction.id)
    setShowDeleteButton(true)
  }

  const handleEditClick = (data) => {
    const currentTransaction = transactions?.data.find(transaction => transaction.id == data[0]);
    setCurrentTransactionInfo(currentTransaction)
    setIsOpen(true)
  }

  return isLoading ? <div>...</div> : (
    <Main>
      <Modal isOpen={isOpen}
        handleModalClose={() => {
          setIsOpen(false);
          setCurrentTransactionInfo({})
        }}>
        <div className="h-80 overflow-y-scroll p-2 bg-darkGray ">
          <AddNewTransaction isEdit title={getString('editOutgoing')} type={1} data={currentTransactionInfo} fallback={() => setIsOpen(false)} />
        </div>
      </Modal>
      <Modal
        isOpen={showDeleteButton}
        handleModalClose={() => setShowDeleteButton(false)}>
        <div className="flex items-center justify-center  h-40 overflow-y-auto p-2 bg-darkGray">
          <div className="flex flex-col items-center gap-2">
            <strong className="text-black font-semibold text-md">{getString('areYouSureDelete')}</strong>
            <div className="p-2 space-x-4">
              <button className="bg-ligthBlack px-4 py-2 text-white ml-auto rounded-xl" onClick={() => setShowDeleteButton(false)}>{getString('no')}</button>
              <button className="bg-blue px-4 py-2 text-white ml-auto rounded-xl" onClick={handleDeleteTransaction}>{getString('yes')}</button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="flex flex-col w-full items-center h-full justify-center gap-4">
        <button onClick={() => navigate('/newTransaction')} className="bg-blue px-4 py-2 text-white ml-auto rounded-xl">{getString('addNewOutgoing')}</button>
        <Table data={objectToArray(transactions?.data || [[]])} tableCols={moneyTableCols || []} columnDefs={tableColRef || []} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} />
      </div>
    </Main>
  );
};

export default Outgoing;
