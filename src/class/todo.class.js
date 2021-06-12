export class Todo{

static fromJson({id, tarea, completados, creado}){
const tempTodo = new Todo(tarea);

tempTodo.id          = id;
tempTodo.completados = completados;
tempTodo.creado      = creado;

return tempTodo;

    }

    constructor(tarea){
        this.tarea=tarea;
        this.id   = new Date().getTime();
        this.completados= false;
        this.creado= new Date(); 
    }
}