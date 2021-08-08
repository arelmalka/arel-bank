import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Admin(props) {

    const [accountIndex, setaccountIndex] = useState('');
    const [productIndex, setproductIndex] = useState('');
    // let showBills = false;
    let tempBills = [];
    let tempAccounts = [];

    // const removeProduct = (index)=>{
    //     for(let i=0; i<props.accounts.length;i++){
    //         if(i==index){
    //             props.accounts[i].bills=[...tempBills]
    //         }
    //     }
    // }

    // const removeFilter =(index)=>{ debugger;
    //     props.accounts[accountIndex].bills.filter((element,i)=>{
    //         if(i!=index){
    //             tempBills.push({product:element.product,price:element.price});
    //             removeProduct(accountIndex);
    //         }
    //         if(props.accounts[accountIndex].bills.length==1&&i==index&&props.accounts[accountIndex].bills[0]==element){
    //             tempBills=[]
    //             removeProduct(accountIndex)
    //         }
    //     });
    // }


    // const billsTableOne = () => { 
    //     return (
    //         accounts.map((element, i) => {
    //             if(i==accountIndex){
    //             return (
    //                 element.bills.map((e, index) => {
    //                     return (
    //                         <tr>
    //                             <td>{e.product}</td>
    //                             <td>{e.price}</td>
    //                             <td><button className="adminOrangeButton" onClick={()=>{setproductIndex(index);removeFilter(index)}}>x</button></td>
    //                         </tr>
    //                     )
    //                 })
    //             )                        
    //             }
    //         })
    //     )
    // }

    // const showbillsTable = () => {
    //     if (showBills == false) return null
    //     if (showBills == true) {
    //         return (
    //             <div>
    //             <table style={{ width: '85%', margin: 'auto' }}>
    //                 <tr>
    //                     <th>Product</th>
    //                     <th>Price</th>
    //                     <th>Delete</th>
    //                 </tr>
    //                 {billsTableOne()}
    //             </table>
    //             <button className="deleteButton" onClick={()=>{props.deleteAccounts(tempAccounts,accountIndex); setshowBills(false)}}>
    //             Delete account
    //             </button>
    //             </div>
    //         )
    //     }
    // }


    // const showAccounts = (showBills) => {
    //     if (props.accounts.length > 0) {
    //         return (
    //             accounts.map((element, index) => {
    //                 return (
    //                     <div className="accountDetailsStyle">
    //                         {element.userName}<br /> <br />
    //                         {element.id} <br /> <br />
    //                         <button className="adminOrangeButton"
    //                             onClick={() => {
    //                                 showBills=!showBills;
    //                                 accountPlacing(index)
    //                             }}>Charges</button>
    //                     </div>
    //                 )
    //             }))
    //     }
    // }


    return (
        <div style={{ fontSize: '30px' }}>
            <h1 className="margin-for-space">MANAGER</h1>
            {props.showAccounts()}
            <div>
                {props.showBillsTable()}
            </div>
            <Link to='/'>
                <button className="exitAdmin" style={{ position: "relative", marginTop: '3%' }}>Exit</button>
            </Link>
        </div>
    )
}
