<template>
    <el-dialog :title="current.title"  :modal="true" :visible.sync="show" :before-close="onclose">
        <div>
            <p>{{current.description}}</p>
        </div>
        <div class="info">
            <h4 v-if="current.important">Important:
                <el-button  type="warning" size="small" >Important</el-button>
            </h4>
            <h4 v-else >Important:
                <el-button  type="primary" size="small" >No Important</el-button>
            </h4>
            <h4 v-if="current.status" >Status:
                <el-button  type="success" size="small" >Done</el-button>
            </h4>

            <h4 v-else >Status:
                <el-button  type="danger" size="small" >Not Done</el-button>
            </h4>
            <h4 >
                Color:
                <el-button  type="warning" size="small" :style="{background: current.color, } " class="task-color"></el-button>
                
            </h4>
        </div>
        <div slot="footer">
            <el-button v-if="!current.status || visibleConfirmButton" type="success" icon="el-icon-check" class="button" size="small" @click="(ev)=> onConfirm(current._id, ev)">Done</el-button>
            <el-button type="danger" icon="el-icon-delete" size="small" @click="()=> onDelete(current._id)" >Delete</el-button>
        </div>
        
    </el-dialog>
</template>

<script>
import tasks from "@/http/tasks"

export default {
    props:{
        show: Boolean,
        current: Object,
        close: Function
    },
    data(){
        return{
            visibleConfirmButton: false,
        }
    },
    computed:{
        
    },
    methods:{
        onclose(){
            let self = this;
            self.close();
        },
        onDelete(id){
            
            let self = this;
            tasks.delete(id).then(res => {
                if(res.status === 200){
                    this.$message({
                            message: 'Task was removed successfully',
                            type: 'success'
                        });
                    this.$store.dispatch("SET_TASKS");
                    self.close();
                    
                }
            })
        },
        onConfirm(id, e){
            this.visibleConfirmButton = true;             
            return;
            tasks.setDone(id).then(res => {
                if(res.status === 200){
                    this.$message({
                            message: 'Task done successfully',
                            type: 'success'
                        });
                    this.$store.dispatch("SET_TASKS");
                    self.close();
                }
            })
        }
    },
    watch:{
        current_id: function() {
            let self = this;
            console.log( self.current )
        }
    },
};
</script>

<style scoped>
    .action-buttons{
        margin-top: 1em;
        margin-bottom: 1em;
        display: flex;
        justify-content: center;
    }
    .el-col{
        margin-bottom: 1em;
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
        clear: both;
    }

    .box-card {
        max-width: 480px;
    }
    .info{
        display: flex;
        justify-content: space-between;
        width: 450px;
    }
    .task-color{
        width: 6em;
        height: 2.7em;
        border-radius: 3px;
        margin-left: 2em;
        outline: none;
        border: none;
    }
</style>