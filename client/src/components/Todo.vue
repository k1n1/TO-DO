<template>
    <div>
        <div class="container">
            <div class="jumbotron">
                <h1 class="font-weight-bold text-center">TO-DO</h1>
            </div>
        </div>
        <div class="container">
            <center>
                <button class="btn addTodo" data-target="#exampleModal" data-toggle="modal">
                    Add TODO
                </button>
            </center>
        </div>
        <div class="todos">
            <div class="row">

                <div v-for="todo in allTodos" :key=todo._id class="col col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12">
                    <div class="card">
                        <div class="card-header">
                            Complete Before - {{ todo.deadline }}
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{{ todo.title }}</h5>
                            <p class="card-text">{{ todo.description }}</p>

                            <button v-if="todo.status === 'TODO'" class="btn btn-primary mr-2"
                                    @click="todoProgress(todo._id)">Start
                            </button>
                            <button v-if="todo.status === 'inProgress'" class="btn btn-primary mr-2"
                                    @click="todoDone(todo._id)">Done
                            </button>
                            <button class="btn mr-2" @click="deleteTodo(todo._id)">Remove</button>
                            <button class="btn addTodo mr-2" data-target="#todoupdatemodel" data-toggle="modal"
                                    @click="isEditing(todo._id)">
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="exampleModal" aria-hidden="true" aria-labelledby="exampleModalLabel" class="modal fade" role="dialog"
             tabindex="-1">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 id="exampleModalLabel" class="modal-title">New TODO</h5>
                        <button aria-label="Close" class="close" data-dismiss="modal" type="button">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="">Todo Title</label>
                            <input v-model="newTodo.title" class="form-control" name="title" placeholder="Todo Title"
                                   type="text">
                        </div>
                        <div class="form-group">
                            <label for="">Todo Description</label>
                            <input v-model="newTodo.description" class="form-control" name="description" placeholder="Todo Description"
                                   type="text">
                        </div>
                        <div class="form-group">
                            <label for="">DeadLine</label>
                            <input v-model="newTodo.date" class="form-control" name="deadline" placeholder="Todo DeadLine"
                                   type="text">
                        </div>
                        <button class="btn btn-primary mt-3" data-dismiss="modal" @click="addTodo">Add New TODO</button>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" data-dismiss="modal" type="button">Close</button>
                    </div>
                </div>
            </div>
        </div>


        <div id="todoupdatemodel" aria-hidden="true" aria-labelledby="exampleModalLabel" class="modal fade" role="dialog"
             tabindex="-1">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Update TODO</h5>
                        <button aria-label="Close" class="close" data-dismiss="modal" type="button">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="">Todo Title</label>
                            <input v-model="todoEditing.title" class="form-control" name="title" placeholder="Todo Title"
                                   type="text">
                        </div>
                        <div class="form-group">
                            <label for="">Todo Description</label>
                            <input v-model="todoEditing.description" class="form-control" name="description" placeholder="Todo Description"
                                   type="text">
                        </div>
                        <div class="form-group">
                            <label for="">DeadLine</label>
                            <input v-model="todoEditing.date" class="form-control" name="deadline" placeholder="Todo DeadLine"
                                   type="text">
                        </div>
                        <button class="btn btn-primary mt-3" data-dismiss="modal" @click="edit()">Edit TODO</button>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" data-dismiss="modal" type="button">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Todo",
    data() {
        return {
            allTodos: null,
            newTodo: {
                title: null,
                description: null,
                date: null
            },
            todoEditing: {
                id: null,
                title: null,
                description: null,
                date: null
            }
        }
    },
    methods: {
        addTodo() {
            axios.post("http://localhost:3000/addTodo", {
                title: this.newTodo.title,
                description: this.newTodo.description,
                deadline: this.newTodo.date
            })
                .then((res) => {
                    this.allTodos.push(res.data)
                    this.newTodo.title = null
                    this.newTodo.description = null
                    this.newTodo.date = null
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        deleteTodo(id) {
            axios.delete(`http://localhost:3000/delete/${id}`)
                .then((res) => {
                    this.allTodos = res.data
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        todoProgress(id) {
            axios.put("http://localhost:3000/statusupdate/", {
                id: id,
                status: "inProgress"
            })
                .then((res) => {
                    this.allTodos = res.data
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        todoDone(id) {
            axios.put("http://localhost:3000/done/", {
                id: id,
                status: "Done"
            })
                .then((res) => {
                    this.allTodos = res.data
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        isEditing(id) {
            this.todoEditing.id = id
        },
        edit() {
                axios.put("http://localhost:3000/todoupdate/", {
                        id: this.todoEditing.id,
                        title: this.todoEditing.title,
                        description: this.todoEditing.description,
                        deadline: this.todoEditing.date
                    }
                )
                    .then((res) => {
                        this.allTodos = res.data
                        this.todoEditing.id = null
                        this.todoEditing.title = null
                        this.todoEditing.description = null
                        this.todoEditing.date = null
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }

    },
    beforeCreate() {
        axios.get("http://localhost:3000/")
            .then((res) => {
                this.allTodos = res.data
            })
            .catch((err) => {
                console.log(err)
            })
    }
}
</script>

<style scoped>
.todos {
    margin-top: 20px;

}

.card {
    border: none;
    margin: 10px 0;
}

.row {
    margin-left: 0;
    margin-right: 0;
}

.addTodo {
    background: black;
    color: white;
}
</style>