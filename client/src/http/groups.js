import axios from "../util/axios"

export default {
    fetch: () => axios.get("/groups/list"),
    create: (data) => axios.post("/groups/create",data),
    changeOrder:  (data) => axios.patch(`/groups/change_order`, data)
}