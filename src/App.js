import React, { useEffect, useState } from 'react';
import './App.css';
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";
import {v4 as uuid} from 'uuid';

const getExpenses = localStorage.getItem("expenses");

const initialExpenses = getExpenses ? JSON.parse(getExpenses) : [];

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({show: false});
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleCharge = (e) => {
    setCharge(e.target.value);
  }
  
  const handleAmount = (e) => {
    setAmount(e.target.value);
  }
  
  const handleAlert = ({type, text}) => {
    setAlert({show: true, type, text});
    setTimeout(() => {
      setAlert({show: false});
    },2200);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(charge !== '' && amount>0) {
      if(edit) {
        let newExpenses = expenses.map((item) => {
          return item.id === id ? {...item, charge, amount} : item;
        });
        setExpenses(newExpenses);
        setEdit(false);
        handleAlert({type: "success", text: "리스트가 수정되었습니다."});
      } else {
        const singleExpense = {id: uuid(), charge, amount};
        setExpenses([...expenses, singleExpense]);
        handleAlert({type: "success", text: "리스트가 생성되었습니다."});
      }
      setCharge("");
      setAmount("");
    } else {
      handleAlert({
        type: "danger",
        text: "값을 모두 입력해 주세요."
      })
    }
  }

  const clearItems = () => {
    setExpenses([]);
    handleAlert({type: "danger", text: "모든 리스트가 삭제되었습니다."});
  }
  
  const handleDelete = (id) => {
    let newExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(newExpenses);
    handleAlert({type: "danger", text: "리스트가 삭제되었습니다."});
  }

  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    let {charge, amount} = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }
  
  return (
    <div>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <main className="main-container">
        <h1>예산 계산기</h1>
        <div style={{width: "100%", backgroundColor: "#fff", padding: "3rem", borderRadius: "25px 25px 0 0"}}>
          {/* {Expense Form} */}
          <ExpenseForm 
            charge={charge} 
            amount={amount} 
            handleAmount={handleAmount} 
            handleCharge={handleCharge} 
            handleSubmit={handleSubmit} 
            edit={edit}
          />
        </div>
        <div style={{width: "100%", backgroundColor: "#fff", padding: "3rem", borderRadius: "0 0 25px 25px"}}>
          {/* {Expense List} */}
          <ExpenseList 
          expenses={expenses} 
          handleDelete={handleDelete} 
          handleEdit={handleEdit}
          clearItems={clearItems}
          />
        </div>
        <div style={{display: "flex", justifyContent: "end", marginTop: "1rem"}}>
          <p style={{fontSize: "2.6rem"}}>
            총 지출: {""}
            {expenses.reduce((acc, curr) => {
              return (acc += parseInt(curr.amount));
            }, 0)} 원
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;