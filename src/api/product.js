import Vue from 'vue'
export default {
    getClassification() { 
        return Vue.prototype.$http.get('/productCategory/list/withChildren')
    },
    brand() { 
        return Vue.prototype.$http.get('/brand/list?pageNum=1&pageSize=100')
    },
    list(data) { 
        return Vue.prototype.$http.get(`/product/list`, {
            params:{
                ...data
            }
        })
    },
    undataState(d) { 
        return Vue.prototype.$http.get(`/update/publishStatus?ids=${d.id}&publishStatus=${d.publishStatus}`)
    },
    SKUtitle(d) { 
        return Vue.prototype.$http.get(`/productAttribute/list/${d.productAttributeCategoryId}?type=0`)
    },
    SKUdata(d) { 
        return Vue.prototype.$http.get(`/sku/${d.id}`)
    },
    SKUsearch(d, s) { 
        return Vue.prototype.$http.get(`/sku/${d}?keyword=${s}`)
    },
    updataSKU(id,d) { 
        return Vue.prototype.$http.post(`/sku/update/${id}`, {
            d
        })
    },
    del(d) { 
        return Vue.prototype.$http.post(`/product/update/deleteStatus?ids=${d.id}&deleteStatus=1`)
    },
    updata(k, d) { 
        let s = ''
        for (let i = 0; i < d.length; i++) {
            console.log(d[i].id)
            if (i == 0) {
                s = s + d[i].id
            } else { 
                s = s + ',' + d[i].id
            }
        }
        return Vue.prototype.$http.post(`/product/update/${k.split(':')[0]}?ids=${s}&${k}`)
    },
    productAttribute() { 
        return Vue.prototype.$http.get('/productAttribute/category/list?pageNum=1&pageSize=100')
    },
    subject() { 
        return Vue.prototype.$http.get('/subject/listAll')
    },
    Specification(d) {
        return Vue.prototype.$http.get(`/productAttribute/list/${d}?pageNum=1&pageSize=100&type=0`)
    },
    parameter(d) { 
        return Vue.prototype.$http.get(`/productAttribute/list/${d}?pageNum=1&pageSize=100&type=1`)
    },
    prefrenceArea() { 
        return Vue.prototype.$http.get('/prefrenceArea/listAll')
    },
    create(d) { 
        return Vue.prototype.$http.get('/product/create',{d})
    }
}