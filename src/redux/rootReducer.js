
import { userApiReducer, userApiReducerName } from "redux/slices/user/user";
import { TransactionSliceReducerName, TransactionSliceReducer } from "redux/slices/user/TransactionSlice";

const rootReducer = {
  [userApiReducerName]: userApiReducer,
  [TransactionSliceReducerName]: TransactionSliceReducer,
};

export default rootReducer;
