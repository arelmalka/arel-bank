import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Product from "@material-ui/icons/LocalGroceryStore"
import Price from "@material-ui/icons/Payment"



export default function Account(props) {

    const [showAction, setshowAction] = useState(false);
    const [price, setprice] = useState('');
    const [product, setproduct] = useState('');


    const showBalance = () => {
        alert(props.currentAccount.money)
    }

    const checkAction = () =>{
        if(price<=0 || product == '') alert("Please fill the requested details")
        else{
            props.setBillsToAccount(product, price); 
            setshowAction(!showAction)
        }
    }

    const hidden = () => {
        if (showAction == true) {
            return (
                <div>
                    <div className="form-container">
                        <div className="form-input">
                            <Product fontSize="medium" className="icon responsiveIcon" />
                            <input className="register-input responsive" placeholder="product" type="text" style={{ marginBottom: '10px' }} onChange={(element) => { setproduct(element.target.value) }} /> <br />
                        </div>
                        <div className="form-input">
                            <Price fontSize="medium" className="icon responsiveIcon" />
                            <input className="register-input responsive" placeholder="price" type="number" style={{ marginBottom: '10px' }} onChange={(element) => { setprice(element.target.value) }} /> <br />
                        </div>
                    </div>
                    <button className="logIn" onClick={() => { checkAction() }}> Buy !</button>
                </div>
            )
        }
    }

    return (
        <div style={{ fontSize: '30px' }}>
            <h1>Hey {props.currentAccount.userName + ' !'}</h1>
            <button className="logIn" onClick={() => { showBalance() }} style={{ marginRight: '2%' }}>BALANCE</button>
            <button className="logIn" onClick={() => { setshowAction(!showAction); setprice(''); setproduct(''); }} >ACTION</button> <br /> <br />
            <Link to='/edit'>
                <button className="account-button size-change" style={{ marginRight: '2%' }}>EDIT</button>
            </Link>
            <Link to='/'>
                <button className="account-button size-change">EXIT</button>
            </Link> <br /> <br />
            {hidden()}
        </div>
    )
}
