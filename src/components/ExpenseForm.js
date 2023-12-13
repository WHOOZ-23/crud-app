import React from "react";
import { IoIosSend } from "react-icons/io";

const ExpenseForm = ({charge, amount, handleCharge, handleAmount, handleSubmit, edit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">지출항목</label>
          <input 
            type="text" 
            className="form-control" 
            id="charge" 
            name="charge" 
            placeholder="예) 카페"
            value={charge} 
            onChange={handleCharge}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">금액</label>
          <input 
            type="number" 
            className="form-control" 
            id="amount" 
            name="amount" 
            placeholder="예) 10000" 
            value={amount} 
            onChange={handleAmount}
          />
        </div>
      </div>
      <button type="submit" className="btn"><span>{edit ? "수정" : "제출"}</span><IoIosSend /></button>
    </form>
  );
};

export default ExpenseForm;