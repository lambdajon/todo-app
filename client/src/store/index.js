import Vue from "vue";

import Vuex from "vuex";
import tasks from "@/http/tasks"
import groups from "@/http/groups"
// import checkSort from "@/util/checkSort"
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tasks: {
            data: [
                
            ],
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
            state.tasks.data = [];
            state.tasks.data = payload;
        },
        SET_TASKS_IS_LOADING(state, payload) {
            state.loading = payload;
        },
        SET_SORT_TASKS(state,payload){
            state.loading = payload;
        },
        SET_GROUPS_WITH_TASKS(state,payload){
            state.tasks.data = payload
        }
    },
    actions: {
        SET_TASKS(context) {
            context.commit("SET_TASKS_IS_LOADING", true);
                tasks.fetch().then(res => {
                    context.commit("SET_TASKS", res.data);
                    context.commit("SET_TASKS_IS_LOADING", false);
                })
        },
        SET_SORT_TASKS(context,payload){

            // console.log(this.state.tasks.data)
            // checkSort(this.state.tasks.data, payload);
            // console.log(payload);
            
            context.commit("SET_GROUPS_WITH_TASKS", payload);
            const orderGroups = [...payload].map((group, index) => {
                return{
                    _id: group._id,
                    order_id: index + 1,
                }
            });

            groups.changeOrder({data: orderGroups}).then(res => {
                // console.log(res)
            })
            return true;
        },
        SET_GROUPS_WITH_TASKS(context,payload){
            context.commit("SET_TASKS_IS_LOADING", true);
            groups.fetch().then(res => {
                    context.commit("SET_GROUPS_WITH_TASKS", res.data);
                    context.commit("SET_TASKS_IS_LOADING", false);
                })
        }
    }
})