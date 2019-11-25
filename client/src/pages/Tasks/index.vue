<template>
    <div>
        <!-- <draggable tag="el-row"  v-model="tasksList" :move="checkMove" :component-data="getComponentData()"> -->
                <!-- <el-collapse-item v-for="e in tasksList" :title="e.title"  :key="e._id">
                    <div>{{e.description}}</div>
                </el-collapse-item> -->
                <!-- <task-group  v-for="task in tasksList" :key="task._id" :task="task" :showCurrentTask="showCurrentTask"></task-group> -->
                <el-row >
                    <draggable
                        class="list-group"
                        tag="ul"
                        v-model="tasksList"
                        v-bind="dragOptions"
                        @start="drag = true"
                        @end="drag = false"
                        @change="log"
                        :move="checkMove"
                    >
                        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                            <task-group v-for="task in tasksList" :key="task._id" :task="task"></task-group>
                        </transition-group>
                        
                    </draggable>
                    <create-group ></create-group>
                </el-row>
                
            <!-- </draggable> -->
    </div>
</template>

<script>
import tasks from "@/http/tasks"
import taskGroup from "./components/TaskGroups"
import createGroup from "./components/CreateGroup"
import draggable from 'vuedraggable'
import { log } from 'util'
export default {
    data(){
        return{
            drag: false
        }
    },
    computed:{
        tasksList:{
            get(){
                return this.$store.getters.tasks.data

            },
            set(value){
                // console.log(value, );

                this.$store.dispatch("SET_SORT_TASKS", value);
            }
        },
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
        
        log(e){
            // console.log(event);
            // console.log(this.drag)
        },
        checkMove(evt,e){
            // console.log(evt.draggedContext)
            const index = evt.draggedContext.index;
            const futureIndex = evt.draggedContext.futureIndex;
            if(this.drag){
                // console.log("index",this.tasksList[index])
                // console.log("futureIndex",this.tasksList[futureIndex])
                // for(let start = index; index )
                console.log("-------------------")
                // console.log(index);
                // console.log(futureIndex);
                
                if(index < futureIndex){
                    let orders = [];
                    for(let start = index; start <= futureIndex; start++ ){
                        orders.push({_id: this.tasksList[start]._id, order_id: this.tasksList[start].order_id})
                    }
                    // console.log(orders)
                }
            }
        }
    },
    components:{
        taskGroup,
        createGroup,
        draggable,
    },
    mounted(){
        this.$store.dispatch("SET_GROUPS_WITH_TASKS");
    }
};
</script>

<style scoped >

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
    .list-group > span {
        min-height: 20px;
        display: flex;
        justify-content: start;
        flex-wrap: wrap;
    }
    .list-group-item {
        cursor: move;
    }
    .list-group-item i {
        cursor: pointer;
    }

    .el-row {
        margin-bottom: 20px;
        display: flex;
        justify-content: start;
        /* align-items: center; */
        flex-wrap: wrap;
        width: 100%;
    }
    .el-col {
        border-radius: 4px;
        margin-bottom: 20px;
        width: auto;
        flex-wrap: wrap;

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