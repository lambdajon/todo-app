<template>
    <el-col :span="6" style="margin-left:20px; margin-right:20px" >
        
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{task.title}}</span> 
            </div>
            <!-- <div  class="text item">{{task.description}}</div> -->
            <div class="action-buttons">
                <el-button type="primary" icon="el-icon-view" class="button" size="small" @click="showCurrentTask(task._id)" >Show</el-button>
            </div>
            <!-- <div class="bottom clearfix">
                Created: <time class="time">{{ new Date(task.createdAt).toISOString().slice(0,10) }}</time>
            </div> -->
            
        </el-card>
    </el-col>
    
</template>

<script>
export default {
    props:{
        task: Object,
        showCurrentTask: Function,
    },
    data(){
        return{
            dialogTableVisible: false,
        }
    },
    methods:{

    }
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
    .clearfix{padding: 0;
        /* background: rgb(9, 124, 255); */
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
</style>