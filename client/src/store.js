import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { teamListReducer } from './reducers/teamReducers.js'
import { expensesListReducer, expenseDeleteReducer, createExpenseReducer, updateExpenseReducer } from './reducers/expenseReducers.js'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, deleteUserReducer } from './reducers/userReducers.js'
import { carAddReducer, carDeleteReducer, carListReducer, carNumberReducer } from './reducers/carReducers.js'
import { agencyAddReducer, agencyListReducer } from './reducers/agencyReducer.js'
import { addContractReducer, contractListReducer } from './reducers/contractReducer.js'

const reducer = combineReducers({
    teamList: teamListReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    deleteUser: deleteUserReducer,
    expensesList: expensesListReducer,
    expenseDelete: expenseDeleteReducer,
    expenseCreate: createExpenseReducer,
    updateExpense: updateExpenseReducer,
    carList: carListReducer,
    carDelete: carDeleteReducer,
    carAdd: carAddReducer,
    carNumber: carNumberReducer,
    agencyAdd: agencyAddReducer,
    agencyList: agencyListReducer,
    contractList: contractListReducer,
    addContract: addContractReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store