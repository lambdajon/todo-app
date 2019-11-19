import axios from "../util/axios"

export default {
    fetch: () => axios.get("/tasks/list"),
    create: (data) => axios.post("/tasks/create",data),
    show: (id) => axios.get(`/tasks/show/${id}`),
    delete: (id) => axios.delete(`/tasks/delete/${id}`),
    setDone: (id) => axios.patch(`/tasks/done/${id}`, {status:true})
}