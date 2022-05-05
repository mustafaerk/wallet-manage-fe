import React from "react";

import { Chart, BarChart } from "components";
import Main from "pages/Layout/Main/index";
import { useGetAllIncomesQuery, useGetAllOutgoingQuery, useGetAllTransactionQuery } from "redux/slices/user/user";
import { dataCovertToChart, dataCovertToBar } from "utils/object";

const DashBoard = () => {
  const { data: outgings, isLoading: i1 } = useGetAllOutgoingQuery();

  const { data: incomes, isLoading: i2 } = useGetAllIncomesQuery();
  const { data: allTransaction, isLoading: i3 } = useGetAllTransactionQuery();

  const { outgoingData, incomeData, dates } = dataCovertToBar(allTransaction?.data)

  console.log({ outgoingData, incomeData, dates })

  return (
    <Main>
      <div className="space-y-4">
        <div>
          {i3 ? <div> ... </div> :
            <BarChart
              chartTitle="Incomes and Outcomes"
              data={[outgoingData, incomeData]}
              categories={dates}
            />
          }
        </div>
        <div className="flex items-center justify-center gap-x-2 flex-col sm:flex-row">
          {i1 ? <div>... </div> : <Chart ChartData={dataCovertToChart(outgings?.data, 'outgoing')} ChartTitle="Outgoing Summary" />}
          {i2 ? <div>... </div> : <Chart ChartData={dataCovertToChart(incomes?.data, 'incomes')} ChartTitle="Income Summary" />}
        </div>
      </div>
    </Main>
  );
};

export default DashBoard;
