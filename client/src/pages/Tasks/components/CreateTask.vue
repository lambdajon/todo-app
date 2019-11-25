<template>
    <div class="crate-task">
        <el-dialog title="Create new task " :visible.sync="dialogFormVisible">
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
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
                    <el-button @click="dialogFormVisible = false">Cancel</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-button style="float: right; padding: 3px 0" icon="el-icon-plus" type="text"  @click="dialogFormVisible = true">Create</el-button>
    </div>
</template>

<script>
import tasks from "@/http/tasks";

export default {
    props:{
        group_id: String
    },
    data() {
        return {
            // current_group_id = this.group_id,
            dialogFormVisible: false,
            ruleForm: {
                title: "",
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
                const data = {
                    title: this.ruleForm.title,
                    color: this.ruleForm.color,
                    important: this.ruleForm.important,
                    description: this.ruleForm.desc,
                    group_id:this.$props.group_id
                }

                tasks.create(data).then( res => {
                    if(res.status === 200 ){
                        this.$message({
                            message: 'Task was create successfully',
                            type: 'success'
                        });
                        this.$refs[formName].resetFields();
                        this.$refs[formName].resetFields();
                        this.$store.dispatch("SET_GROUPS_WITH_TASKS");
                        this.dialogFormVisible = false;
                    }
                    // console.log
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
    
};
</script>

<style scoped>
    .crate-task{
        display: inline;
    }
</style>