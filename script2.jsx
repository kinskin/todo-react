

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

    editPending(){
        console.log(event.target.innerText)
    }

    removePending(){
        let value = event.target.value
        this.props.removePending(value)
    }


    render(){
        let pendingTodos = this.props.pendingTodo.map((pendingTodo,index)=>{
            return(
                <div className='row' key={index}>
                    <div className='col-9'>
                        <p>{pendingTodo}</p>
                    </div>
                    <div className='col-3 text-right'>
                        <button className='btn btn-sm btn-outline-success' onClick={(event)=>{this.removePending(event)}} value={index}>Completed</button>
                    </div>
                    <p>Created at: {moment().format("LTS")}</p>
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
            validation: ''
        }
    }

    addTodo(){
        let value = this.state.value
        let validation = this.state.validation
        if(value.length > 1 && value.length < 100){
            console.log('sending data to Todo class receiveHandler method')
            this.props.addTodo(value)
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

    changeHandler(){
        let todo = event.target.value
        if(event.keyCode === 13){
            this.setState({value: todo})
            this.addTodo()
        }
        else{
            this.setState({value: todo})
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
            doneList:[]
        }
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

    receiveHandler(value){
        let pendingList = this.state.pendingList
        pendingList.push(value)
        this.setState({pendingList: pendingList})

    }

    render(){

        return(
            <div className = 'container'>
                <div className='card-header text-center'>
                    <h3>Todo List App</h3>
                    <Clock />
                </div>
                <div className='col-8 offset-2'>
                    <Form addTodo={(event)=>{this.receiveHandler(event)}}/>
                </div>
                <div className = 'row'>
                    <div className = 'col-6'>
                        <PendingList removePending={(event)=>{this.completedTodo(event)}} pendingTodo={this.state.pendingList}/>
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