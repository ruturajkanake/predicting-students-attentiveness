import React from 'react';
import axios from "axios";
import './css/login.css';
import { withRouter } from 'react-router';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            user: 'student'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resetUserInputs = this.resetUserInputs.bind(this);
    }
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    handleSubmit(e) {
        e.preventDefault();
        const payload = {
            username: this.state.username,
            password: this.state.password
        }
        axios({
            url: `/${this.state.user}/login`,
            method: 'POST',
            data: payload
        }).then((res) => {
            const token = res.data.token;
            const name = this.state.user === 'student' ? 
                res.data.student.name : res.data.teacher.name;
            
            localStorage.setItem('authToken', token);
            localStorage.setItem('name', name);
            this.props.history.push({
                pathname: `/${this.state.user}`
            });
            this.resetUserInputs();
        }).catch((err) => {
            console.log(err);
            this.resetUserInputs();
        })
    }
    resetUserInputs(){
        this.setState({
            username: '',
            password: '',
            user: 'student'
        })
    }
    render() {
        return (
            <>
                <div className='login'>
                    <h2>Login</h2>
                    <img src={require('./img/programmer.svg')} alt='login'/>
                    <form onSubmit={this.handleSubmit}>
                        <label for='username'>Username</label><br/>
                        <input 
                            type='text' 
                            placeholder='Enter Username'
                            name='username'
                            value={this.state.username}
                            id='username'
                            onChange={this.handleChange}
                            required
                        /><br/>
                        <label for='password'>Password</label><br/>
                        <input
                            type='password'
                            placeholder='********'
                            name='password'
                            value={this.state.password}
                            id='password'
                            onChange={this.handleChange}
                            required
                        ></input><br/>
                        <p className='label-login'>Login as</p>
                        <label className='radio-label'>
                            <input type='radio' name='user' value='student' checked={this.state.user==='student'} onChange={this.handleChange}/>
                            <div className='radio-button student'>
                                <img src={require('./img/student.png')} alt='student'/>
                                <p>Student</p>
                                
                            </div>
                        </label>
                        <label className='radio-label'>
                            <input type='radio' name='user' value='teacher' checked={this.state.user==='teacher'} onChange={this.handleChange}/>
                            <div className='radio-button'>
                                <img src={require('./img/teacher.png')} alt='teacher'/>
                                <p>Teacher</p>
                                
                            </div>
                        </label><br/><br/>
                        <input type="submit" value="Login"/>
                    </form>
                </div>    
            </>
        )
    }
}

export default withRouter(Login);