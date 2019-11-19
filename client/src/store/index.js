import Vue from "vue";
import Vuex from "vuex";
import tasks from "@/http/tasks"
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tasks: {
            data: [],
            loading: false,
        },
    },
    getters: {
        tasks(state) {
            return state.tasks
        },
        
    },
    mutations: {
        SET_TASKS(state, payload) {
            state.tasks.data = payload;
        },
        SET_TASKS_IS_LOADING(state, payload) {
            state.loading = payload;
        }
    },
    actions: {
        SET_TASKS(context) {
            context.commit("SET_TASKS_IS_LOADING", true);
                tasks.fetch().then(res => {
                    context.commit("SET_TASKS", res.data);
                    context.commit("SET_TASKS_IS_LOADING", false);
                })
        }
    }
})