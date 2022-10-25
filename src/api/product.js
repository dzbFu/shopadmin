import Vue from 'vue'
export default {
    getClassification() { 
        return Vue.prototype.$http.get('/productCategory/list/withChildren')
    }
}