import axios from 'axios'

import {
    TEAM_LIST_REQUEST,
    TEAM_LIST_SUCCESS,
    TEAM_LIST_FAIL
} from '../constants/TeamConstants'

export const listTeam = () => async (dispatch) => {
    try {
        dispatch({ type: TEAM_LIST_REQUEST })
        const { data } = await axios.get('/api/users')

        dispatch({ type: TEAM_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: TEAM_LIST_FAIL, payload: error.message })
    }
}