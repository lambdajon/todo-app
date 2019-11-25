<template>
    <el-col :span="8" :offset="2" style="margin-left:20px; margin-right:20px" >
        
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{task.name}}</span>
                <create-task :group_id="task._id"></create-task>
            </div>
            <el-collapse accordion>
                <draggable v-model="task.tasks" :move="checkMove" group="taskGroups"  @change="log"  >
                    <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                        <el-collapse-item 
                            v-for="taskdata of task.tasks"
                            :key="taskdata._id" 
                            :title="taskdata.title" 
                            :name="taskdata._id"
                        >
                            <div>{{taskdata.description}}</div>
                        </el-collapse-item>
                    </transition-group>
                    
                </draggable>
            </el-collapse>
            
        </el-card>
    </el-col>
</template>

<script>
import taskAPI from "@/http/tasks"
import createTask from "./CreateTask"
import draggable from 'vuedraggable'

export default {

    props:{
        task:{
            trype:Object,
        }
    },
    data(){
        return {
            currentTask: this.$props.task,
            dragedEl: null,
            relatedEl: null,
            orders: null,
            drag: false,
            currentIndex: null,
            futureIndex: null,
            onDraged: false,
            
        }
    },
    computed:{
        dragOptions() {
            return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            };
        }
    },
    methods:{
        
        log(evt){

            const TaskPozitions = [...this.$props.task.tasks].map((task, index) => {
                return {
                    _id: task._id,
                    order_id: index + 1
                }
            });
            taskAPI.changeOrder({data:TaskPozitions}).then(res => {
                if(res.status === 200){
                    // console.log(res);
                    // this.$store.dispatch("SET_GROUPS_WITH_TASKS");
                    // this.$forceUpdate();
                }
            });
        },
        replaceTask(el,a,b){
            // console.log(el,a,b)
        },
        
        checkMove: function(evt,e){
            // console.log(evt)

            this.onDraged = true;
            return true;
        },
        
    },
    watch:{
        orders: function(value){
            console.log( `val`, value )
        }
    },
    components:{
        createTask,
        draggable
    },
    updated(){
        // this.$store.dispatch("SET_GROUPS_WITH_TASKS");
        // 
    }
}
</script>

<style scoped>
.flip-list-move {
        transition: transform 0.5s;
    }
    .no-move {
        transition: transform 0s;
    }
    .ghost {
        opacity: 0.5;
        background: #c8ebfb;
    }
    .list-group {
        min-height: 20px;
    }
    .list-group-item {
        cursor: move;
    }
    .list-group-item i {
        cursor: pointer;
    }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 300px;
  }
</style>