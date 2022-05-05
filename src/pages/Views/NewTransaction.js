import React from "react";

import Main from "pages/Layout/Main/index";
import AddNewTransaction from "pages/Modules/Transaction/AddNewTransaction";
import { getString } from "localization/config";

const NewTransaction = () => {

  return (
    <Main>
      <div className="flex flex-col md:flex-row w-full items-center h-full gap-4">
        <AddNewTransaction title={getString('addNewIncomes')} type={1} />
        <AddNewTransaction title={getString('addNewOutgoing')} type={2} />
      </div>
    </Main>
  );
};

export default NewTransaction;
