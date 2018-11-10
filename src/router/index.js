import Vue from 'vue'
import Router from 'vue-router'
import LeadersDesk from '@/components/LeadersDesk'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LeadersDesk',
      component: LeadersDesk
    }
  ]
})
