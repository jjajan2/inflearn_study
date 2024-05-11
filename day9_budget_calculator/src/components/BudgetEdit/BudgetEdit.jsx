import DefaultInputText from "../DefaultInputText/DefaultInputText";
import SmallButton from "../SmallButton/SmallButton";
import style from "./BudgetEdit.module.css";

function BudgetEdit({
  editForm,
  handleChangeEditInput,
  editBudget,
  editCancle,
}) {
  return (
    <div className={style.budgetInner}>
      <div className={style.budgetFormBoxItem}>
        <DefaultInputText
          type={"text"}
          name={"item"}
          value={editForm.item}
          onEvent={(event) => handleChangeEditInput(event)}
        />
      </div>
      <div className={style.budgetFormBoxItem}>
        <DefaultInputText
          type={"number"}
          name={"amount"}
          value={editForm.amount}
          onEvent={(event) => handleChangeEditInput(event)}
        />
      </div>

      <div className={style.buttons}>
        <SmallButton text={"완료"} onEvent={() => editBudget(editForm.id)} />
        <SmallButton text={"취소"} onEvent={editCancle} />
      </div>
    </div>
  );
}

export default BudgetEdit;
