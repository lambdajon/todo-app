<template>
    <div  class="tasks" v-loading="tasks.loading">
            <current-task v-if="showTask" :show="showTask" :current="currentTask" :close="closeCurrent"></current-task>
            <el-row :gutter="20" type="flex" class="task-list" justify="start">
                <task-item v-for="task in tasks.data" :key="task._id" :task="task" :showCurrentTask="showCurrentTask"></task-item>
            </el-row>
        
    </div>
</template>

<script>
import TaskItem from "./components/TaskItem";
import CurrentTask from "./components/CurrentTask";
import tasks from "@/http/tasks";
export default {
    data(){
        return{
            showTask: false,
            currentTask: null,
        }
    },
    computed:{
        tasks(){
            return this.$store.getters.tasks
        },
    },
    methods:{
        showCurrentTask(id){
            //
            tasks.show(id).then(res => {
                if(res.status === 200){
                    this.currentTask = res.data
                    this.showTask = true;
                }
            })

        },
        closeCurrent(){
            this.showTask = false;
        }
    },
    components:{
        taskItem: TaskItem,
        currentTask: CurrentTask
    },
    mounted(){
        this.$store.dispatch("SET_TASKS");
    }
};
</script>

<style scoped >
    .tasks{
        display: flex;
        justify-content: center;
        width: 100%;
    }
    .task-list{ 
        flex-wrap: wrap;
        width: 90%;
        margin-top: 2em;
    }
    .el-row {
        margin-bottom: 20px;
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>