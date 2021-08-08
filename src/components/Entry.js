import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Password from "@material-ui/icons/Security"
import Person from "@material-ui/icons/PersonOutline"



export default function Entry(props) {

    const [userName, setuserName] = useState('');
    const [password, setpassword] = useState('');
    const history = useHistory();


    function handleClick() { //take us to the account page with his name on the page's path 
        history.push(`/ ${props.currentAccount.userName}`);
    }

    function showAdminPage() { //take us to the admin page if the name and password written as they should
        history.push('/admin');
    }


    const checkAccount = () => {
        let count = 0;
        let theCurrentAccount;
        if (props.accounts.length == 0) alert('There is no accounts yet,plaese create the first one') // check if there are any accounts in data
        if (userName == 'admin' && password == 'admin') {
            showAdminPage()
        }
        else {
            for (let i = 0; i < props.accounts.length; i++) {
                if (props.accounts[i].userName == userName && props.accounts[i].password == password) { // cross the user name and passwords to get into the right account
                    theCurrentAccount = props.accounts[i];
                    props.getCurrentAccount(theCurrentAccount); // pass the data of the current account to the App.js
                    handleClick() //take us to the account page
                }
                if (props.accounts[i].userName != userName || props.accounts[i].password != password) {
                    count++
                    //when the loop is finished and no account was found than the count variable equal to the number of accounts and it alert that something is wrong
                    if (count == props.accounts.length) {
                        alert('password or user name is wrong')
                    }
                }
            }
        }
    }

    return (
        <div style={{ fontSize: '30px' }}>
            <h1>AM - BANK</h1>
            <div className="form-container">
                <div className="form-input">
                    <Person fontSize="large" className="icon responsiveIcon" />
                    <input className="responsive" onChange={(element) => { setuserName(element.target.value) }} placeholder="User Name" /> <br /><br />
                </div>
                <div className="form-input">
                    <Password fontSize="large" className="icon responsiveIcon" />
                    <input className="responsive" onChange={(element) => { setpassword(element.target.value) }} style={{ marginBottom: '2%' }} placeholder="Password" type="password" /> <br />
                </div>
            </div>

            {/* press twice on the ENTER button to get in */}
            <button className='logIn curtaindown' onClick={() => { checkAccount() }} >
                LOGIN
            </button>
            <br />
            <Link to='/register'>
                <button className='createAccount'>
                    Create new account
                </button>
            </Link>
        </div>
    )
}
