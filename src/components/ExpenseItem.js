import React from "react";
import { IoMdTrash, IoMdCreate } from "react-icons/io";

const ExpenseItem = ({expense, handleEdit, handleDelete}) => {
  const {id, charge, amount} = expense;
  return (
    <li className="item">
      <div className="info">
        <span className="expense">{charge}</span>
        <span className="amount">{amount}원</span>
      </div>
      <div className="buttons">
        <button className="edit-btn" aria-label="edit button" onClick={() => handleEdit(id)}>
          <IoMdCreate />
        </button>
        <button className="clear-btn" aria-label="delete button" onClick={() => handleDelete(id)}>
          <IoMdTrash />
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;