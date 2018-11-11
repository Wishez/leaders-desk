const isStatusOk = ({ meta }) => meta.status === 'OK'
const getErrorMessage = ({ meta }) => meta.message
const defaultResponse = {
  isLoading: false,
  isFailed: false,
  isCompleted: false,
  errorMessage: '',
}
const ResponseNames = {
  LEADERS: 'leadersResponse',
  AUTHOR: 'authorResponse',
}
const DefaultMessages = {
    ERROR: 'При выполнение операции произошла ошибка;(. Попробуйте повторить операцию позже',
    INVALID_FORM: 'Вы должны заполнить все поля, чтобы добавить вашего лидера!',
}

export {
    isStatusOk,
    getErrorMessage,
    defaultResponse,
    ResponseNames,
    DefaultMessages,
}
