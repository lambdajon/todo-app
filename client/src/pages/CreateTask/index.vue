<template>
    <div class="task-container">
        <div class="task-form">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="120px"
                class="demo-ruleForm"
                :label-position="'top'" 
            >
                <el-form-item label="Task title" prop="title" >
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="Description form" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item  >
                    <el-col :span="12">
                        <el-form-item label="Is important?" prop="important">
                            <el-switch v-model="ruleForm.important"></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Set color" prop="color">
                            <el-color-picker v-model="ruleForm.color" @change="setColor"></el-color-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                
                

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
                    <el-button @click="resetForm('ruleForm')">Back</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
    
</template>

<script>
import tasks from "@/http/tasks";

export default {
    
    data() {
        return {
            prevRoute: null,
            ruleForm: {
                title: "",
                color: "#27B165",
                important: false,
                desc: ""
            },
            rules: {
                title: [
                    {
                        required: true,
                        message: "Please input title",
                        trigger: "blur"
                    },
                ],
                desc: [
                    {
                        required: true,
                        message: "Please input description ",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        setColor(color){
            this.ruleForm.color = color;
        },
        submitForm(formName) {
        this.$refs[formName].validate(valid => {
            if (valid) {
                console.log(this.ruleForm)
                const data = {
                    title: this.ruleForm.title,
                    color: this.ruleForm.color,
                    important: this.ruleForm.important,
                    description: this.ruleForm.desc
                }
                tasks.create(data).then( res => {
                    if(res.status === 200 ){
                        this.$message({
                            message: 'Task was create successfully',
                            type: 'success'
                        });
                        this.$refs[formName].resetFields();
                    }
                } );
                
            } else {

                return false;
            }
        });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.$router.push(this.prevRoute)
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.prevRoute = from
        })
    },
};
</script>

<style scoped>
    .task-form{
        display: flex;
        justify-content: center; 
        align-items: center;
        margin-top: 4em;
        width: 100%;
    }
    .demo-ruleForm{
        width: 40%;
    }
</style>