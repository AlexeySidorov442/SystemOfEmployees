import { Component } from "react";

import "./app.css";
import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

class App extends Component{

    constructor(props){
        super(props)
        this.state={
            data:[
                {name: "John", salary: 800, increase: true, id:1},
                {name: "Alex", salary: 1550, increase: false, id:2},
                {name: "Carl", salary: 8000, increase: true, id:3}
            ]
        }
        this.maxId=4;
    }
    
    deleteItem=(id)=>{
        this.setState(({data})=>{
            //const index = data.findIndex(item=> item.id === id);
            
            // const before = data.splice(0, index);
            // const after = data.splice(index+1);

            // const newArr = [...before, ...after];

            return {
                data: data.filter(item=>item.id !== id)
            }
        })
    }

    addedItem=(name,salary)=>{
        this.setState(({data})=>{
            // const newArr = data.slice(0);
            // newArr.push({name: name, salary: salary, increase:false, id: this.maxId});
            // this.maxId++;
            // return {
            //     data: newArr
            // }

            const newItem={
                name,
                salary,
                increase: false,
                id: this.maxId++
            }

            return {
                data: [...data,newItem]
            }
        })
    }

    render(){
        return (
            <div className="app">
                <AppInfo />

                <div className="search-panel">
                    <SearchPanel />
                    <AppFilter />
                </div>

                <EmployeesList 
                    data={this.state.data}
                    onDelete={this.deleteItem}/>

                <EmployeesAddForm
                    onCreate={this.addedItem}/>
            </div>
        );
    }
}

export default App;