class List extends React.Component {
  constructor(){
    super()

    this.state = {
      word:"",
      validation: '',
      list : []

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
            <p>[ ] {list}</p>
            )
      })
      console.log("rendering");
      return (
        <div className='container'>
            <div className="">
                <h2>Todo List</h2>
                <p>{this.state.validation}</p>
            </div>
            <div className="list">
              <input onChange={(event)=>{this.changeHandler(event)}} onKeyDown={(event)=>{this.changeHandler(event)}} value={this.state.word}/>
              <button onClick={(event)=>{this.addItem(event)}} onKeyDown={(event)=>{this.addItem(event)}} value={this.state.word} >add item</button>
            </div>
            <div>
                <h6>Today list</h6>
                {list}
            </div>
        </div>
      );
  }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);