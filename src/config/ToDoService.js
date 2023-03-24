import RestApis from './RestApiUrls'

const toDoService = {
  getSourcedCandidates: RestApis.candidateService + '/candidate/findallsourced',
  toDo: RestApis.toDoService + '/todo',
  create: RestApis.toDoService + '/create',
  findAll: RestApis.toDoService + '/findall',
  findAllInProgress: RestApis.toDoService + '/findallinprogress',
  findAllDone: RestApis.toDoService + '/findalldone',
  done: RestApis.toDoService + '/done',
  update: RestApis.toDoService + '/update',
  filterByKeyword: RestApis.toDoService + '/filterbykeyword',
  filterByPriority: RestApis.toDoService + '/filterbypriority',
  delete: RestApis.toDoService + '/delete',
  todayTodo: RestApis.toDoService + '/findalltoday',
}

export default toDoService
