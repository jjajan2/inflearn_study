import style from "./BudgetItem.module.css";
import SmallButton from "../SmallButton/SmallButton";

function BudgetItem({ data, setEditId, setEditForm, deleteBudget }) {
  const { id, item, amount } = data;
  return (
    <div className={style.budgetInner}>
      <p>{item}</p>
      <p className={style.amount}>{amount}</p>

      <div className={style.buttons}>
        <SmallButton
          text={"수정"}
          onEvent={() => {
            setEditId(id);
            setEditForm({
              id: id,
              item: item,
              amount: amount,
            });
          }}
        />
        <SmallButton text={"삭제"} onEvent={() => deleteBudget(id)} />
      </div>
    </div>
  );
}

export default BudgetItem;
