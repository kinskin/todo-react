class EditList extends React.Component{

    constructor(){
        super()

        this.state={
            value:'',
            id:'',
            validation:''
        }
    }

    editTodo(){
        let value = this.state.value
        console.log(value)
        let id = this.state.id
        let validation = this.state.validation
        let display = document.getElementById(id)
        if(value.length > 1 && value.length < 100){
            this.props.editTodo(value,id)
            display.style.display = 'none'
            this.setState({value:'',validation: ''})
        }
        else if(value.length <= 1){
            validation = 'To do item is too short'
            this.setState({validation: validation})
        }
        else if(value.length >= 100){
            validation = 'To do item is too long'
            this.setState({validation: validation})
        }

    }

    changeHandler(event){
        if(event.keyCode===13){
            this.setState({value: event.target.value, id: this.props.id})
            this.editTodo()
        }
        else{
            this.setState({value: event.target.value, id: this.props.id})
        }

    }



    render(){
        return(
            <div id={this.props.id} style={{display: 'none'}}>
                <input onChange={(event)=>{this.changeHandler(event)}} onKeyDown={(event)=>{this.changeHandler(event)}} value={this.state.value}/>
                <button onClick={()=>{this.editTodo()}}>Edit</button>
                <p>{this.state.validation}</p>
            </div>

        )
    }
}

class Clock extends React.Component{
    constructor(){
        super()

        this.state = {
            curTime: ''
        }
    }
    componentDidMount(){
        setInterval(function(){
            this.setState({
                curTime: new Date().toLocaleString()
            })
        }.bind(this), 1000);
        console.log(this.state.curTime)
    }
    render(){
        return(
            <div className='d-flex justify-content-center align-item-end'>
                <p>{this.state.curTime}</p>
            </div>
        )
    }
}

class DoneList extends React.Component{

    removeDone(){
        console.log(event.target.value)
        let value = event.target.value
        this.props.removeDone(value)
    }

    render(){

        let doneTodos = this.props.doneTodo.map((doneTodo,index)=>{
            return(
                <div className='row' key={index}>
                    <div className='col-9'>
                        <p key={index}>{doneTodo}</p>
                    </div>
                    <div className='col-3 text-right'>
                        <button className='btn btn-sm btn-outline-danger' onClick={(event)=>{this.removeDone(event)}} value={index}>Delete</button>
                    </div>
                    <p>Completed at: {moment().format("LTS")}</p>
                </div>
            )
        })

        return(
            <div>
                <div className='card-header'>
                    <h6>Done List</h6>
                </div>
                <div className='card-body'>
                    {doneTodos}
                </div>
            </div>
        )
    }
}

class PendingList extends React.Component{

    constructor(){
        super()

        this.state={
            display:'none',
            id: ''
        }
    }

    showEdit(value,id){
        this.props.showEdit(value,id)
    }


    showInput(event,todoIndex){
        console.log(todoIndex)
        let id = this.state.id
        let display = this.state.display
        let inputId = document.getElementById(todoIndex)
        console.log(inputId.style.display === 'none')
        if(inputId.style.display === 'none'){
            inputId.style.display = ''
            this.setState({display: ''})
        }
        else{
            inputId.style.display = 'none'
            this.setState({display: 'none'})
        }

    }

    removePending(){
        let value = event.target.value;
        this.props.removePending(value)
    }


    render(){

        let pendingTodos = this.props.pendingTodo.map((pendingTodo,index)=>{
            return(
                <div>
                    <div className='row form-inline' key={index}>
                        <div className='col-6'>
                            <p>{pendingTodo}</p>
                        </div>
                        <div className='col-3 text-right'>
                            <button onClick={(event)=>{this.showInput(event,index)}}>Edit</button>
                        </div>
                        <div className='col-3 text-right'>
                            <button className='btn btn-sm btn-outline-success' onClick={(event)=>{this.removePending(event)}} value={index}>Completed</button>
                        </div>
                        <p>Posted at: {this.props.createdAt[index]}</p>
                    </div>
                    <EditList id={index} editTodo={(value,id)=>{this.showEdit(value,id)}}/>
                </div>
            )
        })
        return(
            <div>
                <div className='card-header'>
                    <h6>Pending List</h6>
                </div>
                <div className='card-body'>
                {pendingTodos}
                </div>
            </div>
        )
    }
}

class Form extends React.Component{

    constructor(){
        super()

        this.state={
            value:'',
            validation: '',
            createdAt:''
        }
    }

    addTodo(){
        let value = this.state.value
        let createdAt = this.state.createdAt
        let validation = this.state.validation
        if(value.length > 1 && value.length < 100){
            this.props.addTodo(value,createdAt)
            this.setState({value:'',validation: '',createdAt: ''})
        }
        else if(value.length <= 1){
            validation = 'To do item is too short'
            this.setState({validation: validation})
        }
        else if(value.length >= 100){
            validation = 'To do item is too long'
            this.setState({validation: validation})
        }
    }

    changeHandler(){
        let todo = event.target.value
        if(event.keyCode === 13){
            this.setState({value: todo, createdAt: moment().format("LTS")})
            this.addTodo()
        }
        else{
            this.setState({value: todo, createdAt: moment().format("LTS")})
        }
    }


    render(){

        return(
            <div className='header form-inline'>
                <div className='col-8 offset-2 text-center'>
                    <input className='form-control' onChange={(event)=>{this.changeHandler(event)}} onKeyDown={(event)=>{this.changeHandler(event)}} value={this.state.value} placeholder={'What is your todo item?'}/>
                    <button className='btn btn-outline-primary' onClick={()=>{this.addTodo()}} value={this.state.value}>Add todo item</button>
                    <p className='validate'>{this.state.validation}</p>
                </div>
            </div>
        )
    }
}

class Todo extends React.Component{

    constructor(){
        super()

        this.state={
            pendingList:[],
            doneList:[],
            createdAt: []
        }
    }

    editTodo(value,id){
        console.log('this is in the todo class')
        console.log('this is the value: ', value)
        console.log('this is the id: ', id)
        let pendingList = this.state.pendingList
        pendingList[id] = value
        this.setState({pendingList: pendingList})
    }

    deleteTodo(value){
        let doneList = this.state.doneList
        doneList.splice(value,1)
        this.setState({doneList: doneList})
    }

    completedTodo(value){
        let pendingList = this.state.pendingList
        let doneList = this.state.doneList
        let newDoneList = pendingList.splice(value,1)
        doneList.push(newDoneList[0])
        this.setState({pendingList: pendingList, doneList: doneList})

    }

    receiveHandler(value, newCreatedAt){
        let pendingList = this.state.pendingList
        let createdAt = this.state.createdAt
        pendingList.push(value)
        createdAt.push(newCreatedAt)
        this.setState({pendingList: pendingList, createdAt: createdAt})

    }

    render(){

        return(
            <div className = 'container'>
                <div className='card-header text-center'>
                    <h3>Todo List App</h3>
                    <Clock />
                </div>
                <div className='col-8 offset-2'>
                    <Form addTodo={(event,createdAt)=>{this.receiveHandler(event,createdAt)}}/>
                </div>
                <div className = 'row'>
                    <div className = 'col-6'>
                        <PendingList removePending={(event)=>{this.completedTodo(event)}} showEdit={(value,id)=>{this.editTodo(value,id)}}pendingTodo={this.state.pendingList} createdAt={this.state.createdAt}/>
                    </div>
                    <div className='col-6'>
                        <DoneList removeDone={(event)=>{this.deleteTodo(event)}} doneTodo={this.state.doneList}/>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Todo/>,
    document.getElementById('root')
);