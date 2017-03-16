import React, { Component } from 'react'

import { connect } from 'react-redux';

import firebase from '../../utils/firebase';

import { getLogin, setLogin } from '../../actions';

import styles from './styles';

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            pass: ''
        }
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(user)
            window.location.replace('/')
        } else {
            
        }
        });
    }

    login(){
        let { username, pass } = this.state;
        firebase.auth().signInWithEmailAndPassword(username, pass)
        .then((resp) =>{
            this.props.dispatch(setLogin(resp));
        })
        .catch(function(error) {
            console.log(error)
        });
    }

    render(){
        return(
            <div style={ styles.container }>

                <input 
                    value={ this.state.username } 
                    style={ styles.input } 
                    type="email"
                    placeholder='Username'
                    onChange={ (e) => this.setState({  username : e.target.value }) } 
                />
                <input 
                    value={ this.state.pass } 
                    style={ styles.input } 
                    type="password"
                    placeholder='Password' 
                    onChange={ (e) => this.setState({ pass : e.target.value }) } 
                />

                <button 
                    onClick={ () => this.login() } 
                    style={ styles.btn } >
                    Login
                </button>

            </div>
        )
    }
}

function mapStateToProps(state) {
  return {
    user : state.user,
    logged: state.logged
  };
}

export default connect(mapStateToProps) (Login);