import { useState, useEffect } from "react";
import style from "./App.module.css";

function App() {
  const [amountForm, setAmountForm] = useState({
    id: "",
    item: "",
    amount: "",
  });
  const [budgetList, setbudgetList] = useState([]);
  const [editId, setEditId] = useState(-1);
  const [editForm, setEditForm] = useState({ id: "", item: "", amount: "" });
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const budgetListData = localStorage.getItem("budgetList");
    if (budgetListData) {
      setbudgetList(JSON.parse(budgetListData));
    }
  }, []);

  useEffect(() => {
    let total = 0;
    budgetList.map((data) => (total += Number(data.amount)));
    setTotalAmount(total);
  }, [budgetList]);

  function handleChangeAmountInput(event) {
    setAmountForm({
      ...amountForm,
      id: budgetList.length + "" + Math.floor(Math.random() * 100 + 10),
      [event.target.name]: event.target.value,
    });
  }

  function addBudget(event) {
    event.preventDefault();
    const newList = [...budgetList, amountForm];
    setAmountForm({ id: "", item: "", amount: "" });
    setbudgetList(newList);
    localStorage.setItem("budgetList", JSON.stringify(newList));
  }

  function deleteBudget(id) {
    const newList = budgetList.filter((budget) => budget.id !== id);
    setbudgetList(newList);
    localStorage.setItem("budgetList", JSON.stringify(newList));
  }

  function deleteAll() {
    setbudgetList([]);
    localStorage.setItem("budgetList", JSON.stringify([]));
  }

  function handleChangeEditInput(event) {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  }

  function editBudget(id) {
    const newList = budgetList.map((budget) =>
      budget.id === id
        ? { id: id, item: editForm.item, amount: editForm.amount }
        : budget
    );
    setbudgetList(newList);
    setEditId(-1);
    localStorage.setItem("budgetList", JSON.stringify(newList));
  }

  function editCancle() {
    setEditId(-1);
  }

  return (
    <div className={style.App}>
      <h1 className={style.mainTitle}>예산 계산기</h1>
      <form onSubmit={(event) => addBudget(event)}>
        <div className={style.budgetFormBox}>
          <div className={style.budgetFormBoxItem}>
            <label>지출 항목</label>
            <input
              type="text"
              name="item"
              value={amountForm.item}
              onChange={(event) => handleChangeAmountInput(event)}
            />
          </div>
          <div className={style.budgetFormBoxItem}>
            <label>비용</label>
            <input
              type="number"
              name="amount"
              className={style.amount}
              value={amountForm.amount}
              onChange={(event) => handleChangeAmountInput(event)}
            />
          </div>
        </div>
        <input type="submit" value="제출" className={style.submitButton} />
      </form>
      {budgetList && (
        <div className={style.budgetList}>
          {budgetList.map((budget) => (
            <div className={style.budget} key={budget.id}>
              {editId === budget.id ? (
                <div className={style.budgetInner}>
                  <div className={style.budgetFormBoxItem}>
                    <input
                      type="text"
                      name="item"
                      value={editForm.item}
                      onChange={(event) => handleChangeEditInput(event)}
                    />
                  </div>
                  <div className={style.budgetFormBoxItem}>
                    <input
                      type="number"
                      name="amount"
                      className={style.amount}
                      value={editForm.amount}
                      onChange={(event) => handleChangeEditInput(event)}
                    />
                  </div>

                  <div className={style.buttons}>
                    <button
                      className="edit_button"
                      onClick={() => editBudget(editForm.id)}
                    >
                      완료
                    </button>
                    <button className="delete_button" onClick={editCancle}>
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <div className={style.budgetInner}>
                  <p>{budget.item}</p>
                  <p className={style.amount}>{budget.amount}</p>

                  <div className={style.buttons}>
                    <button
                      className="edit_button"
                      onClick={() => {
                        setEditId(budget.id);
                        setEditForm({
                          id: budget.id,
                          item: budget.item,
                          amount: budget.amount,
                        });
                      }}
                    >
                      수정
                    </button>
                    <button
                      className="delete_button"
                      onClick={() => deleteBudget(budget.id)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className={style.totalAmount}>
        <button class={style.deleteAllButton} onClick={deleteAll}>
          전체 삭제
        </button>
        <p>
          총 합계 : <span>{totalAmount}</span>
        </p>
      </div>
    </div>
  );
}

export default App;
