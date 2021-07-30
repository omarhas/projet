import {
    TEAM_LIST_REQUEST,
    TEAM_LIST_SUCCESS,
    TEAM_LIST_FAIL
} from "../constants/TeamConstants";

export const teamListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case TEAM_LIST_REQUEST:
            return { loading: true, users: [] }
        case TEAM_LIST_SUCCESS:
            return { loading: false, users: action.payload, numberofusers: action.payload.length }
        case TEAM_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}