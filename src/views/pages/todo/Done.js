import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { findAllDones, deleteTodo, filter } from 'src/store/features/ToDoSlice'

import {
  CButton,
  CCard,
  CCardBody,
  CTable,
  CTableBody,
  CInputGroup,
  CTableDataCell,
  CTableHead,
  CFormInput,
  CTableHeaderCell,
  CTableRow,
  CContainer,
  CRow,
  CImage,
} from '@coreui/react'
import { cilPeople, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import high from '../../../assets/images/high.png'
import medium from '../../../assets/images/medium.png'
import low from '../../../assets/images/low.png'
const Done = () => {
  const todos = useSelector((state) => state.todo.toDoListDone)
  const isChanged = useSelector((state) => state.todo.isCreated)
  const token = localStorage.getItem('token')
  const [keyword, setKeyword] = useState('')

  const dispatch = useDispatch()

  const definePriority = (expression) => {
    switch (expression) {
      case 'HIGH':
        return high
        break
      case 'MEDIUM':
        return medium
        break
      default:
        return low
    }
  }

  const deleteToDo = async (value) => {
    console.log(value)
    dispatch(
      deleteTodo({
        id: value,
        token: token,
      }),
    )
  }
  const filterTodo = async () => {
    keyword === ''
      ? dispatch(
          findAllDones({
            token: token,
          }),
        )
      : dispatch(
          filter({
            token: token,
            status: 'DONE',
            keyword: keyword,
          }),
        )
  }

  useEffect(() => {
    dispatch(
      findAllDones({
        token: token,
      }),
    )
  }, [isChanged])

  return (
    <>
      <CCard className="mb-4 backCardSecondary">
        <CCardBody>
          <CRow className="titleText2 m-4">{'Done To Do List'}</CRow>
          <CRow>
            <CInputGroup className="mb-3">
              <CFormInput
                placeholder="Search any for.."
                aria-label="Search any for.."
                aria-describedby="button-addon2"
                onChange={(event) => {
                  setKeyword(event.target.value)
                }}
              />
              <CButton
                type="button"
                color="secondary"
                variant="outline"
                id="button-addon2"
                onClick={filterTodo}
              >
                Search
              </CButton>
            </CInputGroup>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard className="mb-3 backCard">
        <CCardBody>
          <CContainer>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilPeople} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Title</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Desciption</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Date</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {todos.map((type, index) => (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell className="text-center">
                      <CImage className="avatar-circle-size" src={definePriority(type?.priority)} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{type?.title}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{type?.description}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{type?.date}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{type?.status}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="dark"
                        shape="rounded-pill"
                        onClick={(e) => deleteToDo(type.id)}
                        style={{ backgroundColor: 'black' }}
                      >
                        <CIcon icon={cilTrash} />
                        Delete
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CContainer>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Done
