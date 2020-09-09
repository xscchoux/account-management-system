import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export default class EditExercises extends Component {
    constructor(props) {
        super()

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeMonth = this.onChangeMonth.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            username:'',
            Month:'',
            amount:0,
            date:new Date(),
            users:[]
        }
    }

    //called right before anything is displayed on the page
    componentDidMount(){

        axios.get("http://localhost:5000/exercises/" + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    Month: response.data.Month,
                    amount: response.data.amount,
                    date: new Date(response.data.date)
                })
            })
            .catch(function(error){
                console.log(error)
            })

        axios.get("http://localhost:5000/users")
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        users:response.data.map(user => user.username)
                    })
                }
            })
    }

    onChangeUsername(e){
        this.setState({
            username:e.target.value
        })
    }

    onChangeMonth(e){
        this.setState({
            Month:e.target.value
        })
    }

    onChangeAmount(e) {
        this.setState({
            amount:e.target.value
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onSubmit(e){
        e.preventDefault();

        const exercise={
            username:this.state.username,
            Month: this.state.Month,
            amount: this.state.amount,
            date: this.state.date
        }
        console.log(exercise)

        axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id, exercise)
            .then(res => console.log(res.data))
        
            // window.location = '/'
    }

    render() {
        return (
            <div>
                <h3>Edit Payment History</h3>
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                    <label>Username: </label>
                    <select ref="userInput"
                        required
                        className = "form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}>
                        {
                            this.state.users.map(function(user) {
                                return <option
                                    key={user}
                                    value={user}>{user}
                                    </option>;
                            })
                        }
                    </select>
                    </div>
                    <div className = "form-group">
                    <label>Month: </label>
                    <input type="number"
                        min="1" 
                        max="12"
                        required
                        className="form-control"
                        value={this.state.Month}
                        onChange={this.onChangeMonth}
                        />
                    </div>

                    <div className="form-group">
                    <label>Amount (in dollars): </label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.amount}
                        onChange={this.onChangeAmount}
                        />
                    </div>

                    <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                        />
                    </div>
                    </div>

                    <div className="form-group">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}