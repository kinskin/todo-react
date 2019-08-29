class List extends React.Component {
  constructor(){
    super()

    this.state = {
      word:"",
      validation: '',
      list : [],
      doneList: []

    }
  }

  addItem(){
    console.log(this.state.word.length)
    let validation = this.state.validation
    if(this.state.word.length > 1 && this.state.word.length <200){
        validation = ''
        let list = this.state.list
        let word = this.state.word
        word = ''
        list.push(event.target.value)
        this.setState({list: list, word: word, validation: validation})
        console.log(this.state.list);
    }
    else if(this.state.word.length <= 1){
        validation = "To do list is too short"
        this.setState({validation: validation})
    }
    else if(this.state.word.length >= 200){
        validation = "To do list is too long"
        this.setState({validation: validation})
    }
  }

  deleteTodo(){
    console.log("inside delete Item")
    let deleteItem = event.target.value
    let doneList = this.state.doneList

    let deleteItemIndex = doneList.findIndex(item => item === deleteItem)
    doneList.splice(deleteItemIndex, 1)
    this.setState({doneList: doneList})
  }

  doneTodo(){
    let toDoItem = event.target.value
    let list = this.state.list
    let doneList = this.state.doneList


    let itemIndex = list.findIndex(item => item === toDoItem )
    console.log("deleting", itemIndex);


    let newDoneList = list.splice(itemIndex, 1)


    doneList.push(newDoneList[0])
    console.log("updated", list)

    this.setState({list: list, doneList: doneList})

  }

  changeHandler(){
    // console.log(event.target.value){
        // if (event.target.value === true){
            let word = event.target.value
            if(event.keyCode === 13){
                this.setState({word: word})
                this.addItem()
            }
            else{
                this.setState({word: word})
            // }
        }
  }

  render() {
      // render the list with a map() here
      let list = this.state.list.map((list)=>{
        return(
            <div>
                <div className='row'>
                    <div className='col-6'>
                        <p>{list}</p>
                    </div>
                    <div className='col-6 text-right'>
                        <button className = 'btn btn-sm btn-outline-success'onClick={(event)=>{this.doneTodo(event)}} value={list} >Completed</button>
                    </div>
                    <p>Posted at: {moment().format("h:mm:ss a")}</p>
                </div>
            </div>
            )
      })
      let doneList = this.state.doneList.map((doneList)=>{
        return(
            <div>
                <div className='row'>
                    <div className='col-6'>
                        <p>{doneList}</p>
                    </div>
                    <div className='col-6 text-right'>
                        <button className='btn btn-sm btn-outline-danger'onClick={(event)=>{this.deleteTodo(event)}} value={doneList} >Delete Item</button>
                    </div>
                    <p>Completed at: {moment().format("h:mm:ss a")}</p>
                </div>
            </div>
            )
      })
      console.log("rendering");
      return (
        <div className='container'>
            <div className= "header">
                <div className="card-header text-center">
                    <h2>Todo List</h2>
                    <p>{this.state.validation}</p>
                </div>
            </div>
            <div className="header form-inline">
                <div className="col-8 offset-2 text-center">
                  <input className='form-control' onChange={(event)=>{this.changeHandler(event)}} onKeyDown={(event)=>{this.changeHandler(event)}} value={this.state.word} placeholder={'What is your todo list?'}/>
                  <button className= 'btn btn-outline-primary'onClick={(event)=>{this.addItem(event)}} onKeyDown={(event)=>{this.addItem(event)}} value={this.state.word} >add item</button>
                </div>
            </div>
            <div className='row'>
                <div className='col-6'>
                    <h6 className='card-header'>Todo Pending</h6>
                    <div className='card-body'>
                        {list}
                    </div>
                </div>
                <div className='col-6'>
                    <h6 className='card-header'>Todo Completed</h6>
                    <div className='card-body'>
                        {doneList}
                    </div>
                </div>
            </div>
        </div>
      );
  }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);