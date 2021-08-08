import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import Person from "@material-ui/icons/PersonOutline"
import Id from "@material-ui/icons/CardMembership"
import Password from "@material-ui/icons/Security"
import Money from "@material-ui/icons/EuroSymbol"



export default function Register(props) {

    const [id, setid] = useState('');
    const [userName, setuserName] = useState('');
    const [password, setpassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [money, setmoney] = useState('');
    let accountId;
    let accountMoney;
    let accountName;
    const history = useHistory();


    const handleRoute = () => {
        if (history.location.pathname == '/register') history.push("/"); //take us back to entry page after we signed up
        else history.push(`/ ${props.currentAccount.userName}`) // take us back to our account page after we edited details
    }

    // that function gives us the option to present two different pages,one to register an the other for edit
    const ModifyPlaceHolder = () => {
        if (history.location.pathname == '/edit') {
            return (
                <div style={{ fontSize: '30px' }}>
                    <h1>EDIT</h1>
                    <div className="form-container">
                        <div className="form-input">
                            <Id fontSize="large" className="icon responsiveIcon" />
                            <input className="register-input responsive" disabled="disabled" pattern="[0-9.]" type='number' style={{ marginBottom: '1.5%' }} placeholder={props.currentAccount.id} /> <br />
                        </div>
                        <div className="form-input">
                            <Person fontSize="large" className="icon responsiveIcon" />
                            <input className="register-input responsive" onChange={(element) => { setuserName(element.target.value) }} style={{ marginBottom: '1.5%' }} placeholder={props.currentAccount.userName} /> <br />
                        </div>
                        <div className="form-input">
                            <Password fontSize="large" className="icon responsiveIcon" />
                            <input className="register-input responsive" onChange={(element) => { setpassword(element.target.value) }} style={{ marginBottom: '1.5%' }} placeholder={props.currentAccount.password} /> <br />
                        </div>
                        <div className="form-input">
                            <Password fontSize="large" className="icon responsiveIcon" />
                            <input className="register-input responsive" onChange={(element) => { setconfirmPassword(element.target.value) }} style={{ marginBottom: '1.5%' }} placeholder={props.currentAccount.password} /> <br />
                        </div>
                        <div className="form-input">
                            <Money fontSize="large" className="icon responsiveIcon" />
                            <input className="register-input responsive" onChange={(element) => { setmoney(element.target.value) }} type='number' style={{ marginBottom: '1.5%' }} placeholder={props.currentAccount.money} /> <br /><br />
                        </div>
                    </div>
                    <button className="logIn" onClick={() => { editAccount(); setid(props.currentAccount.id) }}>Edit</button>
                    <Link to={`/ ${props.currentAccount.userName}`}>
                        <button className="logIn" style={{ marginLeft: "5%" }}>Back</button>
                    </Link>

                </div>
            )

        }
        else {
            return (
                <div style={{ fontSize: '30px' }}>
                    <h1>REGISTER</h1>
                    {/* <div className="form-outer"> */}
                    <div className="form-container">
                        {/* <form className="form"> */}
                        <div className="form-input">
                            <Id fontSize="large" className="icon responsiveIcon" />
                            <input className="register-input responsive" onChange={(element) => { setid(element.target.value) }} pattern="[0-9.]" type='number' style={{ marginBottom: '1.5%' }} placeholder="ID" textField /> <br />
                        </div>
                        <div className="form-input">
                            <Person fontSize="large" className="icon responsiveIcon" />
                            <input className="register-input responsive" onChange={(element) => { setuserName(element.target.value) }} style={{ marginBottom: '1.5%' }} placeholder="User Name" /> <br />
                        </div>
                        <div className="form-input">
                            <Password fontSize="large" className="icon responsiveIcon" />
                            <input className="register-input responsive" onChange={(element) => { setpassword(element.target.value) }} style={{ marginBottom: '1.5%' }} placeholder="Password" /> <br />
                        </div>
                        <div className="form-input">
                            <Password fontSize="large" className="icon responsiveIcon" />
                            <input className="register-input responsive" onChange={(element) => { setconfirmPassword(element.target.value) }} style={{ marginBottom: '1.5%' }} placeholder="Confirm Password" /> <br />
                        </div>
                        <div className="form-input">
                            <Money fontSize="large" className="icon responsiveIcon" />
                            <input className="register-input responsive" onChange={(element) => { setmoney(element.target.value) }} type='number' style={{ marginBottom: '1.5%' }} placeholder="Money" /> <br /><br />
                        </div>
                        {/* </form> */}
                    </div>
                    {/* </div> */}
                    <button className="logIn" onClick={() => { validNewAccount() }} >Create</button>
                    <Link to={'/'}>
                        <button className="logIn" style={{ marginLeft: "5%" }}>Back</button>
                    </Link>
                </div>
            )
        }
    }


    const validNewAccount = () => {
        if (id.length != 9) { alert('id have to be exactly 9 digits') }
        if (userName.length < 4) { alert('user name have to be at least 4 letters') }
        if (password.length < 6) { alert('password have to be at least 6 letters') }
        if (password != confirmPassword) { alert('sorry, your password has not confirmed well') }
        if (money > 1000000 || money < 0) { alert('plaese write a valid money amount between 0 to 1000000') }
        if (money <= 1000000 && money >= 0 && password == confirmPassword && password.length >= 6 && userName.length >= 4 && id.length == 9 && history.location.pathname == '/register') {
            props.setNewAccount(id, userName, password, money); //if everything is good it creates a new account that will be saved in app.js
            handleRoute() //take us back to entry so we could log in 
        }
    }

    const editAccount = () => {
        if (history.location.pathname == '/edit') {
            accountId = props.currentAccount.id;
            if (userName.length == 0) accountName = props.currentAccount.userName; //keeps the dataif the user dont write nothing and the onChange input change it to null
            if (password.length == 0 || confirmPassword.length == 0) {
                alert("Write your password to proceed changes")
                if (password != confirmPassword) alert("The passwords not match, try agin")
            }
            if (password.length < 6 && password.length != 0) alert('password have to be at least 6 letters')
            if (userName.length < 4 && userName.length != 0) alert('user name have to be at least 4 letters')
            if (userName.length > 0) accountName = userName;
            if (money > 1000000 || money < 0) { alert('plaese write a valid money amount between 0 to 1000000') }
            if (money.length == 0) accountMoney = props.currentAccount.money
            if (money.length > 0) accountMoney = money
        }
        if (password.length >= 6 && password == confirmPassword) { //allow to edit only if the passwords match and by the rules
            props.changeEditedAccount(accountId, accountName, password, accountMoney);
            handleRoute()
        }
    }



    return (
        <div>
            {ModifyPlaceHolder()}
        </div>
    )
}
