import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTodo, findInProgress, updateToDo, filter } from 'src/store/features/ToDoSlice'
import {
  CButton,
  CCard,
  CCardBody,
  CTable,
  CFormInput,
  CFormSelect,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CContainer,
  CInputGroup,
  CRow,
  CImage,
} from '@coreui/react'
import { cilPeople, cilTrash, cilSave } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import high from '../../../assets/images/high.png'
import medium from '../../../assets/images/medium.png'
import low from '../../../assets/images/low.png'
const Progress = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [priority, setPriority] = useState('')
  const todos = useSelector((state) => state.todo.toDoListProgress)
  const isChanged = useSelector((state) => state.todo.isCreated)
  const token = localStorage.getItem('token')
  const priorityList = ['HIGH', 'MEDIUM', 'NONE']
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

  const updateTodo = async (value) => {
    console.log(value)

    const todo = {
      id: value.id,
      title: title === '' ? value.title : title,
      description: description === '' ? value.description : description,
      priorityString: priority === '' ? value.priority : priority,
      date: date === '' ? value.date : date,
      token: token,
    }

    dispatch(updateToDo(todo))
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
          findInProgress({
            token: token,
          }),
        )
      : dispatch(
          filter({
            token: token,
            status: 'IN_PROGRESS',
            keyword: keyword,
          }),
        )
  }

  useEffect(() => {
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
          <CRow className="titleText2 m-4">{'In Progress To Do List'}</CRow>
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
            <CTable align="middle" className="mb-0 border">
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilPeople} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Title</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Desciption</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Date</CTableHeaderCell>
                  <CTableHeaderCell>Priority</CTableHeaderCell>
                  <CTableHeaderCell></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {todos.map((type, index) => (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell className="text-center">
                      <CImage className="avatar-circle-size" src={definePriority(type?.priority)} />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CFormInput
                        className="noborder align-items-center border-opacity-10"
                        type="text"
                        placeholder={type?.title}
                        aria-label="readonly input example"
                        onChange={(event) => {
                          setTitle(event.target.value)
                        }}
                      ></CFormInput>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CFormInput
                        className="noborder align-items-center border-opacity-10"
                        type="text"
                        placeholder={type?.description}
                        onChange={(event) => {
                          setDescription(event.target.value)
                        }}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        className="noborder align-items-center border-opacity-10"
                        type="text"
                        placeholder={type?.date}
                        onChange={(event) => {
                          setDate(event.target.value)
                        }}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormSelect
                        className="noborder align-items-center border-opacity-10"
                        aria-label="Default select example"
                        onChange={(event) => {
                          setPriority(event.target.value)
                        }}
                      >
                        <option>{type?.priority}</option>
                        {priorityList.map((data, index) => (
                          <option key={index} value={data}>
                            {data}
                          </option>
                        ))}
                      </CFormSelect>
                    </CTableDataCell>
                    <CTableDataCell className="text-center ">
                      <CButton
                        className="p-2"
                        color="success"
                        shape="rounded-pill"
                        onClick={(e) => updateTodo(type)}
                      >
                        <CIcon icon={cilSave} />
                        Update
                      </CButton>

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

export default Progress
