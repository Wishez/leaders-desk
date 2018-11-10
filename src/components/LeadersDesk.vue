<template>
  <section class="leaders">

    <form class="form" @submit="submit">
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
      
      <button class="form__button button" type="submit">Добавить</button>
    </form>

    <h1 class="leaders__title">Доска лидеров</h1>

    <ul>
      <leader v-for="({ authorName, comment, leaderName, leaderImage }, index) in leaders" :key="index" 
        :authorName="authorName"
        :authorComment="comment"
        :leaderName="leaderName"
        :leaderImage="leaderImage"
      />
    </ul>
  </section>
</template>

<script>
import BaseInput from './BaseInput'
import Leader from './Leader'

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
      leaders: [
        {
          leaderName: 'Владимир Владимирович Путин',
          leaderImage: 'https://fortunedotcom.files.wordpress.com/2014/09/451256444.jpg',
          comment: 'Прелестный, харизматичный, любимый',
          authorName: 'Марья Петровна',
        },
        {
          leaderName: 'Дмитрий Анатольевич Медведев',
          leaderImage: 'https://www.oblgazeta.ru/media/news_photos/2018/01/04/P5BGzOoRALa9cte2xC2jphVMRT4aA4up.jpg',
          comment: 'Главное, чтобы не спал',
          authorName: 'Марья Петровна',
        },
        {
          leaderName: 'Сергей Кужугетович Шойгу',
          leaderImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Official_portrait_of_Sergey_Shoigu_with_awards.jpg/1200px-Official_portrait_of_Sergey_Shoigu_with_awards.jpg',
          comment: 'Боевой парень',
          authorName: 'Марья Петровна',
        },
      ]
    }
  },

  created() {
    document.title = 'Доска лидеров'

    this.$http.get('hello')
      .then(response => response.body)
      .then(greeting => {
        console.log(greeting)
      })
      // .catch()
  },

  methods: {
    submit(event) {
      event.preventDefault();
      return false
    },

    addLeader() {
      this.leaders.push({
        leaderName: this.leaderName,
        leaderImage: this.leaderImage,
        comment: this.comment,
        authorName: this.authorName,
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

  .button {
    transition-duration: 250ms;
    transition-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    transition-property: transform, opacity;
    will-change: transform, opacity;
    position: relative;
    padding: 1em 2em;
    margin-bottom: 2em;
    border: 0;
    border-radius: 67px 24px 30px 30px / 43px 127px 34px 52px;
    background-image: linear-gradient(to bottom, deeppink 0%, darkblue 50%, deeppink 100%);
    background-image: conic-gradient(deeppink 0%, darkblue 50%, deeppink 100%);
    color: #f7f7f7;
    font-size: 18px;
    font-weight: bold;
  }

  .button:hover {
    transform: scale(1.05);
  }

  .button:active {
    transform: scale(1.05) translateY(4px);
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
</style>
