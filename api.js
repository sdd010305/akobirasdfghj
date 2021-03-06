
const RESPONSE_IN_SECONDS = 2000;


class LocalStorageManger {
    getItem(key, defaultValue){
        try{
            const val = JSON.parse(localStorage.getItem(key)) || defaultValue;
            return val;
        } catch (error){
            return defaultValue;
        }
    }

    setItem(key, val) {
        localStorage.setItem(key, JSON.stringify(val))
    }
}

class FakeApi {
    constructor(db) {
        this.db = db;
    }

    // getAllTodos() {
    //     return new Promise(( resolve, reject) => {
    //       setTimeout(() => {
    //       const todos = this.db.getItem("todos", [])
    //         resolve({date : todos});

    //       }, RESPONSE_IN_SECONDS);
    //     });
    // }

    getAllTodos() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
          const todos = this.db.getItem("todos", [])
            resolve({data : todos});
          }, RESPONSE_IN_SECONDS);
        });
    }

    updateTodos(updateTodos){
        return new Promise((resolve, reject) => {
          setTimeout(() =>{
            this.db.setItem("todos", updateTodos);
    
            resolve( { mussage: "success"});
          }, RESPONSE_IN_SECONDS)
        })
      }
};

const api = new FakeApi(new LocalStorageManger());
