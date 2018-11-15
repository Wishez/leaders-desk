<template>
  <section class="leaders">
    <h1 class="leaders__title">Доска лидеров</h1>

    <p v-if="leadersResponse.isLoading" aria-live="assertive">
        <strong>Загружаю список...</strong>
    </p>

    <p v-if="leadersResponse.isFailed" aria-live="assertive">
        <strong>{{ leadersResponse.errorMessage }}</strong>
    </p>

    <ul>
      <leader v-for="({ authorName, comment, leaderName, leaderImage }, index) in leaders" :key="index" 
        :authorName="authorName"
        :authorComment="comment"
        :leaderName="leaderName"
        :leaderImage="leaderImage"
      />
    </ul>


    <form ref="form" class="form" @submit="submit">
      <h1 class="form__title">Добавь своего лидера</h1>

      <base-input 
        id="leaderName"
        v-model="leaderName"
        name="leaderName"
        labelText="Имя лидера"
        placeholder="Рамзан Кадыров"
      />
      <base-input 
        id="leaderImage"
        v-model="leaderImage"
        name="leaderImage"
        labelText="Икона лидера"
        placeholder="URL изображения из гугла"
      />
      <base-input 
        id="authorName"
        v-model="authorName"
        name="authorName"
        labelText="Ваше погоняло"
        placeholder="Дуротан сын Гарада"
        autocomplete="username"
      />
      <base-input 
        id="comment"
        v-model="comment"
        name="comment"
        labelText="Комментарий к лидеру"
        placeholder="Он такой харизматичный и стабильный..."
        is-textarea/>

      <p v-if="authorResponse.isFailed">
        <strong>{{ authorResponse.errorMessage }}</strong>
      </p>

      <button :disabled="authorResponse.isLoading" aria-live="polite" class="form__button button" type="submit" >
        {{ authorResponse.isLoading ? 'Добавляю на доску...' : 'Добавить' }}
      </button>

      <!-- <button type='button' class="underscoredButton form__button" @click="clearForm">
        Очистить поля от скверны
      </button> -->
    </form>
  </section>
</template>

<script>
import BaseInput from './BaseInput'
import Leader from './Leader'
import {
    isStatusOk,
    getErrorMessage,
    defaultResponse,
    ResponseNames,
    DefaultMessages,
} from '@/constants/response'

export default {
  name: 'LeadersDesk',
  components: {
    Leader,
    BaseInput,
  },
  data() {
    return {
      authorName: '',
      leaderName: '',
      leaderImage: '',
      comment: '',

      heading: '',
      leaders: [],
      [ResponseNames.LEADERS]: { ...defaultResponse },
      [ResponseNames.AUTHOR]: { ...defaultResponse },
    }
  },

  created() {
    document.title = 'Доска лидеров'

    this.getLeadersList()
  },

  methods: {
    getLeadersList() {
      const responseName = ResponseNames.LEADERS

      this.showLoadingOf(responseName)
      this.$http.get('leaders')
        .then(response => this.handleResponse(response, responseName))
        .then(({ data }) => this.resolveResponse('leaders', responseName, data.leaders))
        .catch(({ message }) => this.showErrorOf({ responseName, message }))
    },


    resolveResponse(propertyName, responseName, data) {
      if (data) {
        this[propertyName] = data
        this.requestFinished(responseName)
      } else {
        this.showErrorOf({ responseName, message: DefaultMessages.ERROR })
      }
    },

    submit(event) {
      event.preventDefault();

      if (this.isFormValid()) {
        this.addLeader()
      } else {
        this.showErrorOf({ responseName: ResponseNames.AUTHOR, message: DefaultMessages.INVALID_FORM })
      }
      
      return false
    },

    isFormValid() {
      const { authorName, leaderName, leaderImage, comment } = this
      return [authorName, leaderName, leaderImage, comment].every(value => value !== '')
    },

    clearForm() {
      this.authorName = ''
      this.leaderName = ''
      this.leaderImage = ''
      this.comment = ''
    },

    handleResponse({ body }, responseName) {
      return isStatusOk(body)
        ? body
        : this.showErrorOf({ response: body, responseName })
    },

    showErrorOf({ responseName, response, message }) {
      this[responseName] = {
        ...defaultResponse,
        isFailed: true,
        errorMessage: message || getErrorMessage(response)
      }
      
    },

    showLoadingOf(responseName) {
      this[responseName] = {
        ...defaultResponse,
        isLoading: true,
      }
    },

    requestFinished(responseName) {
      this[responseName] = {
        ...defaultResponse,
        isCompleted: true,
      }
    },

    addLeader() {
      const responseName = ResponseNames.AUTHOR
      this.showLoadingOf(responseName)
      this.$http.post('leaders', {
        leaderName: this.leaderName,
        leaderImage: this.leaderImage,
        comment: this.comment,
        authorName: this.authorName,
      })
        .then((response) => this.handleResponse(response, responseName))
        .then(({ data: leader }) => {
          this.resolveResponse(
            'leaders',
            responseName,
            leader ? [...this.leaders, leader] : null
          )
          this.authorName = ''
          this.leaderName = ''
          this.leaderImage = ''
          this.comment = ''
        })
        .catch(({ message }) => this.showErrorOf({ responseName, message }))
    },

    goto() {
      this.$refs.form.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .leaders > * {
    margin-bottom: calc(2em - 1px);
    padding-bottom: 1px;
  }

  .form {
    max-width: 60ch;
    margin-left: auto;
    margin-right: auto;
  }

  .form__title {
    margin-bottom: 1.5em;
  }

  .underscoredButton {
    border: 0;
    background-color: transparent;
    padding: 0;
    text-decoration: none;
    background-image: linear-gradient(to right, #b8b8b8 0%, #b8b8b8 100%);
    background-repeat: repeat-x;
    background-position: center bottom;
    background-size: .05em .15em;
    transition-duration: 200ms;
  }

  .underscoredButton:hover {
    background-image: linear-gradient(to right, deeppink 0%, deeppink 100%);
  }

  .form__button:nth-of-type(2) {
    margin-left: 1.618em
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
</style>
