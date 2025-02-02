class Clock extends React.Component{
    constructor(){
        super()

        this.state = {
            curTime: ''
        }
    }
    componentWillMount(){
        setInterval(function(){
            this.setState({
                curTime: new Date().toLocaleString()
            })
        }.bind(this), 1000);
        console.log(this.state.curTime)
    }
    render(){
        return(
            <div>
                <p>{this.state.curTime}</p>
            </div>
        )
    }
}


class List extends React.Component {
    constructor(){
        super();

        this.state = {
          word:"",
          validation: '',
          list : [],
          doneList: [],
          red: ''
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
                    <p>Posted at: {moment().format("LTS")}</p>
                </div>
            </div>
            )
      });
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
                    <p>Completed at: {moment().format("LTS")}</p>
                </div>
            </div>
            )
      })
      console.log("rendering");

      return (
        <div className='container'>
            <div className= "header">
                <div className="card-header text-center">
                    <div className='row'>
                        <div className='col-4'></div>
                        <div className='col-4'>
                            <h2>Todo List</h2>
                        </div>
                        <div className='col-4 text-right'>
                            <Clock />
                        </div>
                    </div>
                </div>
            </div>
            <div className="header form-inline">
                <div className="col-8 offset-2 text-center">
                    <input style = {{backgroundColor: this.state.red}} className="form-control" placeholder="What is your todo list?" onChange={(event)=>{this.changeHandler(event)}} onKeyDown={(event)=>{this.changeHandler(event)}} value={this.state.word} />

                    <button className="btn btn-outline-primary" onClick={(event)=>{this.addItem(event)}} onKeyDown={(event)=>{this.addItem(event)}} value={this.state.word} >add item</button>
                        <p>{this.state.validation}</p>
                </div>
            </div>
            <div className='row'>
                <div className='col-6'>
                    <h6 className='card-header'>Todo Pending</h6>
                    <div className='card-body'>
                        <p>Click 'Completed' when complete</p>
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