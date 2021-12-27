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
                {name: "John", salary: 800, increase: true, rise: true, id:1},
                {name: "Alex", salary: 1550, increase: false, rise: false, id:2},
                {name: "Carl", salary: 8000, increase: true, rise: false, id:3}
            ],
            term: '',
            filter: 'all'
        }
        this.maxId=4;
    }
    
    deleteItem=(id)=>{
        this.setState(({data})=>{
            return {
                data: data.filter(item=>item.id !== id)
            }
        })
    }

    addedItem=(name,salary)=>{
        this.setState(({data})=>{

            const newItem={
                name,
                salary,
                increase: false,
                rise: false,
                id: this.maxId++
            }

            return {
                data: [...data,newItem]
            }
        })
    }

    onToggleProp = (id, prop)=>{
        this.setState(({data})=>{
            
            return {
                data: data.map(item=>{
                    if(item.id===id){
                        return {...item, [prop]: !item[prop]}
                    }
                    return item;
                })
            }
        })
    }

    searchEmp = (items, term)=>{
        if(term.length===0){
            return items
        }

       return items.filter(item => item.name.indexOf(term) > -1)
    }

    onUpdateSearch = (term)=>{
        this.setState({term});
    }

    filterPost = (items, filter)=>{
        switch(filter){
            case 'rise':
                return items.filter(item=> item.rise)
            case 'moreThen1000':
                return items.filter(item=>item.salary>1000)
            default:
                return items
        }
    }

    onFilterSelect = (filter)=>{
        this.setState({filter});
    }
 

    render(){
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item=>item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo 
                    employees={employees}
                    increased={increased}/>

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter 
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}/>
                </div>

                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>

                <EmployeesAddForm
                    onCreate={this.addedItem}/>
            </div>
        );
    }
}

export default App;