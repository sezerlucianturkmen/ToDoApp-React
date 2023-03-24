import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { create, findAllToday, checkDone, findInProgress } from 'src/store/features/ToDoSlice'
import {
  CButton,
  CCard,
  CCardBody,
  CTable,
  CFormInput,
  CCol,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CContainer,
  CFormTextarea,
  CRow,
  CForm,
  CFormSelect,
  CImage,
} from '@coreui/react'
import { cilPeople, cilTrash, cilSave, cilPlus, cilCheck } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import high from '../../../assets/images/high.png'
import medium from '../../../assets/images/medium.png'
import low from '../../../assets/images/low.png'
const ToDoList = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [priority, setPriority] = useState('')
  const firstName = localStorage.getItem('firstName')
  const todos = useSelector((state) => state.todo.todoList)
  const todosAll = useSelector((state) => state.todo.toDoListProgress)
  const isChanged = useSelector((state) => state.todo.isCreated)
  const token = localStorage.getItem('token')
  const priorityList = ['HIGH', 'MEDIUM', 'NONE']

  const dispatch = useDispatch()

  const createTodo = async () => {
    dispatch(
      create({
        title: title,
        description: description,
        date: date,
        priorityString: priority,
        token: token,
      }),
    )
  }

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

  const doneStatus = async (value) => {
    console.log(value)
    dispatch(
      checkDone({
        id: value,
        token: token,
      }),
    )
  }

  useEffect(() => {
    dispatch(
      findAllToday({
        token: token,
      }),
    )
    dispatch(
      findInProgress({
        token: token,
      }),
    )
  }, [isChanged])

  return (
    <>
      <CCard className="mb-4 backCardSecondary">
        <CCardBody>
          <CRow className="titleText1 m-3">{'Hey ' + firstName + ", What's up?"} </CRow>
          <CRow className="titleText2 m-4">{'What do you want to do?'}</CRow>

          <CRow className="m-3">
            <CFormInput
              type="text"
              size="lg"
              placeholder="Title"
              aria-label="lg input example"
              onChange={(event) => {
                setTitle(event.target.value)
              }}
            />
          </CRow>

          <CRow className="m-2">
            <CCol xs={6}>
              <CFormInput
                type="date"
                onChange={(event) => {
                  setDate(event.target.value)
                }}
              />
            </CCol>
            <CCol xs={6}>
              <CFormSelect
                className="align-items-center border-opacity-10"
                aria-label="Default select example"
                onChange={(event) => {
                  setPriority(event.target.value)
                }}
              >
                <option>Priority</option>
                {priorityList.map((data, index) => (
                  <option key={index} value={data}>
                    {data}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>

          <CRow className="m-2">
            <CForm className="textAreaBack">
              <CFormTextarea
                id="exampleFormControlTextarea1"
                rows={3}
                className="textAreaBack"
                placeholder="Describe What you want to do here !"
                onChange={(event) => {
                  setDescription(event.target.value)
                }}
              ></CFormTextarea>
            </CForm>
          </CRow>

          <CRow className="m-3 mt-5">
            <CButton
              style={{ backgroundColor: 'black' }}
              color="dark"
              size="lg"
              onClick={createTodo}
            >
              CREATE YOUR TODO
            </CButton>
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
                      <div>TODAY</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton
                        color="dark"
                        shape="rounded-pill"
                        onClick={(e) => doneStatus(type.id)}
                        style={{ backgroundColor: 'black' }}
                      >
                        <CIcon icon={cilCheck} />
                        Done
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CContainer>
        </CCardBody>
      </CCard>
      <CCard className="mb-4 backCardSecondary">
        <CCardBody>
          <CContainer>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableBody>
                {todosAll.map((type, index) => (
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
                      <div>{' -------  '}</div>
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

export default ToDoList
