import Vue from 'vue'
export default {
    menu() { 
        return Vue.prototype.$http.get('admin/info', {
            headers: {
                'Authorization':'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NjYxNzIxMjcyODgsImV4cCI6MTY2Njc3NjkyN30.o2N6odTBaNrHpzjyQXt27-YDosnutcQC6QugpUH4x43dYsjLtB0OwF1JYMTM2Z_qIxzR_I9fztVE1CkbgJvdwA'
            }
        })
       
    }
}