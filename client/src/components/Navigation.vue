<template>
    <div>
        <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true" :default-active="activeLink">
            <el-menu-item index="/" exact>Home</el-menu-item>
            <el-menu-item index="/tasks">Tasks</el-menu-item>
            <el-menu-item index="/tasks/create">Create new task</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
        activeIndex: "1",
        activeLink: null
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    mounted() {
        this.activeLink = this.$route.path;
    },
    watch: {
        $route(newVal, oldVal) {
            this.activeLink = newVal.path;
        }
    }
};
</script>

<style>
</style>