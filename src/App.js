import './App.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import Entry from './components/Entry'
import Register from './components/Register';
import Account from './Account';
import Admin from './Admin';


function App() {

  const [accounts, setaccounts] = useState('');
  const [currentAccount, setcurrentAccount] = useState('');
  const [editedAccount, seteditedAccount] = useState(currentAccount);
  let productIndex;
  const [showBills, setshowBills] = useState(false);
  const [accountPlace, setaccountPlace] = useState();
  let tempBills=[];

  const setNewAccount = (id, userName, password, money) => {
    setaccounts([...accounts, { id: id, userName: userName, password: password, money: money, bills: [] }])
  }

  const getCurrentAccount = (account) => {
    setcurrentAccount(account)
  }

  const changeEditedAccount = (id, userName, password, money) => {
    const tempAccount = [];
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i] == currentAccount) {
        tempAccount.push({ id: id, userName: userName, password: password, money: money, bills: [...accounts[i].bills] })
        setcurrentAccount(tempAccount[0]);
        accounts[i] = tempAccount[0];
        setaccounts([...accounts])
      }
    }
  }


  const setBillsToAccount = (product, price) => {
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].password == currentAccount.password && accounts[i].userName == currentAccount.userName) {
        accounts[i].bills = [...accounts[i].bills, { product: product, price: price }]
        accounts[i].money = Number((accounts[i].money) - Number(price))
      }
    }
  }


  const accountPlacing = (index) => {
    setaccountPlace(index)
  }
  
  const showBillsTable = () => {
    if (showBills == false) return null
    if (showBills == true) {
      return (
        <div>
          <table style={{ width: '85%', margin: 'auto' }}>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Delete</th>
            </tr>
            {showIndexAccountBills()}
          </table>
          <button className="deleteButton" onClick={() => { deleteAccounts(); setshowBills(false) }}>
            Delete account
          </button>
        </div>
      )
    }
  }

  const showIndexAccountBills = () => {
    return (
      accounts.map((element, i) => {
        if (i == accountPlace) {
          return (
            element.bills.map((e, index) => {
              return (
                <tr>
                  <td>{e.product}</td>
                  <td>{e.price}</td>
                  <td><button className="adminOrangeButton" 
                  onClick={() => { 
                     removeFilter(index) 
                     }
                     }>x</button></td>
                </tr>
              )
            })
          )
        }
      })
      )
  }
  const removeFilter = (index) => {
    debugger;
    tempBills = [];
    accounts[accountPlace].bills.filter((element, i) => {
      if (i != index) {
        tempBills.push({ product: element.product, price: element.price });
        removeProduct(accountPlace)
      }
      if (accounts[accountPlace].bills.length < 2 && i == index && accounts[accountPlace].bills[0] == element) {
        tempBills = []
        removeProduct(accountPlace)
      }
    });
  }
  
  const removeProduct = (index) => {
    for (let i = 0; i < accounts.length; i++) {
      if (i == index) {
        accounts[i].bills = [...tempBills]
      }
    }
  }

  const deleteAccounts = () => {
    debugger;
    let tempAccounts = [];
    for (let i = 0; i < accounts.length; i++) {
      if (i != accountPlace) {
        tempAccounts.push(accounts[i]);
        setaccounts([...tempAccounts]);
      }
      if (accounts.length == 1 && accounts[i] == accounts[0] && i == accountPlace) {
        setaccounts('')
      }
    }
  }

  const showAccounts = () => {
    if (accounts.length > 0) {
      return (
        accounts.map((element, index) => {
          return (
            <div className="accountDetailsStyle">
              {element.userName}<br /> <br />
              {element.id} <br /> <br />
              <button className="adminOrangeButton"
                onClick={() => {
                  setshowBills(!showBills);
                  accountPlacing(index)
                }}>Charges</button>
            </div>
          )
        }))
    }
  }



  return (
    <div className="App scrolling" > {/* this class gives us the option to scroll down the page when needed */}
      <Router>
        <Switch>
          <Route path='/admin'>
            {/* the admin page is for watching accounts activities and manage them */}
            <Admin accounts={accounts} showAccounts={showAccounts} showBillsTable={showBillsTable} deleteAccounts={deleteAccounts} removeFilter={removeFilter} accountPlacing={accountPlacing} showIndexAccountBills={showIndexAccountBills} />
          </Route>
          <Route path={`/ ${currentAccount.userName}`} >
            {/* the account page is for watching the balance and purchase some things and even gives you option to change account details */}
            <Account setBillsToAccount={setBillsToAccount} currentAccount={currentAccount} />
          </Route>
          <Route path={['/register', '/edit']}>
            {/* in the register component we got two options... one is to register new accounts and the other one is to change details for the accounts,
              thats why it got two paths */}
            <Register setNewAccount={setNewAccount} currentAccount={currentAccount} changeEditedAccount={changeEditedAccount} />
          </Route>
          <Route path='/'>
            {/* the entry page gives you the option to log into your account or into the admin account */}
            <Entry currentAccount={currentAccount} accounts={accounts} getCurrentAccount={getCurrentAccount} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
