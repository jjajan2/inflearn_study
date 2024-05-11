import DefaultInputText from "../DefaultInputText/DefaultInputText";
import style from "./BudgetForm.module.css";

function BudgetForm({ amountForm, handleChangeAmountInput, addBudget }) {
  return (
    <form onSubmit={(event) => addBudget(event)}>
      <div className={style.budgetFormBox}>
        <div className={style.budgetFormBoxItem}>
          <label>지출 항목</label>
          <DefaultInputText
            type={"text"}
            name={"item"}
            value={amountForm.item}
            onEvent={(event) => handleChangeAmountInput(event)}
          />
        </div>
        <div className={style.budgetFormBoxItem}>
          <label>금액</label>
          <DefaultInputText
            type={"number"}
            name={"amount"}
            value={amountForm.amount}
            onEvent={(event) => handleChangeAmountInput(event)}
          />
        </div>
      </div>
      <input type="submit" value="제출" className={style.submitButton} />
    </form>
  );
}

export default BudgetForm;
