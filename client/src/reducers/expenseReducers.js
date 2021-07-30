import {
    EXPENSE_LIST_REQUEST,
    EXPENSE_LIST_SUCCESS,
    EXPENSE_LIST_FAIL,
    EXPENSE_DELETE_REQUEST,
    EXPENSE_DELETE_SUCCESS,
    EXPENSE_DELETE_FAIL,
    CREATE_EXPENSE_REQUEST,
    CREATE_EXPENSE_FAIL,
    CREATE_EXPENSE_SUCCESS,
    UPDATE_EXPENSE_REQUEST,
    UPDATE_EXPENSE_SUCCESS,
    UPDATE_EXPENSE_FAIL
} from '../constants/ExpenseContants.js'

export const expensesListReducer = (state = { expenses: [] }, action) => {
    switch (action.type) {
        case EXPENSE_LIST_REQUEST:
            return { loading: true, expenses: [] }
        case EXPENSE_LIST_SUCCESS:
            return { loading: false, expenses: action.payload }
        case EXPENSE_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const expenseDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case EXPENSE_DELETE_REQUEST:
            return { loading: true }
        case EXPENSE_DELETE_SUCCESS:
            return { loading: false, success: true }
        case EXPENSE_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const createExpenseReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_EXPENSE_REQUEST:
            return { loading: true }
        case CREATE_EXPENSE_SUCCESS:
            return { loading: false, success: true, expenses: action.payload }
        case CREATE_EXPENSE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const updateExpenseReducer = (state = { expenses: {} }, action) => {
    switch (action.type) {
        case UPDATE_EXPENSE_REQUEST:
            return { loading: true }
        case UPDATE_EXPENSE_SUCCESS:
            return { loading: false, success: true, expenses: action.payload }
        case UPDATE_EXPENSE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

