import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { listContract } from "../actions/contractAction"
import axios from 'axios'

const Essaii = () => {
    const dispatch = useDispatch();
    const contractList = useSelector(state => state.contractList)
    const { contracts } = contractList

    const [datefin, setDatefin] = useState('')
    const [datedebut, setDatedebut] = useState('')

    useEffect(() => {
        var isCancelled = false;
        if (!isCancelled) {
            dispatch(listContract())
        }
        isCancelled = true;
    }, [])
    useEffect(() => {
        axios.get('/api/contrat/calendardates')
            .then(res => {
                for (const property in res.data.data) {
                    console.log('gg', res.data.data)
                    if (`${property}` === 'datedeb') {
                        setDatedebut(res.data.data[property])
                        console.log('date début fff', datedebut)
                    } else if (`${property}` === 'datefn') {
                        setDatefin(res.data.data[property])
                        console.log('date fin', datefin)
                    }
                }
            })
    })
    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={[
                { title: 'event 1', date: '2021-06-06' },
                { title: 'event 2', date: '2021-06-06' }
            ]}
        />
    )
}
export default Essaii