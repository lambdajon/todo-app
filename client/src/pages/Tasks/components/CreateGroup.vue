<template>
    <el-col :span="4" style="margin-left:60px; margin-right:20px">
        <el-dialog title="Create new task group" :visible.sync="dialogFormVisible">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="120px"
                class="demo-ruleForm"
                :label-position="'top'"
            >
                <el-form-item label="Group name" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
                    <el-button @click="dialogFormVisible = false">Cancel</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-button
        type="primary"
        icon="el-icon-plus"
        style="width:100%; margin-top:20px"
        @click="dialogFormVisible = true"
        >Create new group</el-button>
    </el-col>
</template>

<script>
import groupAPI from "@/http/groups";

export default {
    data() {
        return {
            dialogFormVisible: false,
            ruleForm: {
                name: "",
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "Please input name",
                        trigger: "blur"
                    }
                ],
                
            },
        };
    },
    methods: {
        
        submitForm(formName) {
        this.$refs[formName].validate(valid => {
            if (valid) {
                console.log(this.ruleForm);
                const data = {
                    name: this.ruleForm.name,
                    
                };
                groupAPI.create(data).then(res => {
                    if(res.status === 200 ){
                        this.$message({
                            message: 'Task group was create successfully',
                            type: 'success'
                        });
                        this.$refs[formName].resetFields();
                        this.$store.dispatch("SET_GROUPS_WITH_TASKS");
                        this.dialogFormVisible = false;
                    }
                    
                })
            } else {
            return false;
            }
        });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.$router.push(this.prevRoute);
        }
    }
};
</script scoped>

<style>
</style>