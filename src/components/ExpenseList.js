import React from "react";
import ExpenseItem from "./ExpenseItem";
import { IoMdTrash } from "react-icons/io";

const ExpenseList = ({ expenses, handleEdit, handleDelete, clearItems}) => {
  return (
    <React.Fragment>
      <ul className="list">
        {/* {Expense Item} */}
        {expenses.map((expense) => {
          return <ExpenseItem 
            expense={expense} 
            key={expense.id} 
            handleDelete={handleDelete} 
            handleEdit={handleEdit} 
          />
        })}
      </ul>
      <button className="btn" onClick={clearItems}><span>모두지우기</span><IoMdTrash /></button>
    </React.Fragment>
  );
}

export default ExpenseList;