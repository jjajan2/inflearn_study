import { useState, useEffect } from "react";
import style from "./App.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DefaultInputText from "./components/DefaultInputText/DefaultInputText";
import SmallButton from "./components/SmallButton/SmallButton";

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
    const total = budgetList.reduce(
      (acc, budget) => acc + Number(budget.amount),
      0
    );
    setTotalAmount(total);
  }, [budgetList]);

  console.log(budgetList);

  function handleChangeAmountInput(event) {
    setAmountForm({
      ...amountForm,
      id:
        Date.now() +
        "" +
        budgetList.length +
        "" +
        Math.floor(Math.random() * 100 + 10),
      [event.target.name]: event.target.value,
    });
  }

  function addBudget(event) {
    event.preventDefault();

    if (amountForm.item === "") {
      return toast.error("지출 항목을 입력해주세요.");
    }
    if (amountForm.amount === "") {
      return toast.error("금액을 입력해주세요.");
    }

    const newList = [...budgetList, amountForm];
    setAmountForm({ id: "", item: "", amount: "" });
    setbudgetList(newList);
    localStorage.setItem("budgetList", JSON.stringify(newList));
    toast.success("추가 되었습니다.");
  }

  function deleteBudget(id) {
    const newList = budgetList.filter((budget) => budget.id !== id);
    setbudgetList(newList);
    localStorage.setItem("budgetList", JSON.stringify(newList));
    toast.success("삭제 되었습니다.");
  }

  function deleteAll() {
    if (budgetList.length === 0) {
      return toast.error("내용이 없습니다.");
    }
    setbudgetList([]);
    localStorage.setItem("budgetList", JSON.stringify([]));
    toast.success("삭제 되었습니다.");
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
    toast.success("수정 되었습니다.");
  }

  function editCancle() {
    setEditId(-1);
  }

  return (
    <div className={style.App}>
      <h1 className={style.mainTitle}>예산 계산기</h1>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
      />
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
      {budgetList && (
        <div className={style.budgetList}>
          {budgetList.map((budget) => (
            <div className={style.budget} key={budget.id}>
              {editId === budget.id ? (
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
                    <SmallButton
                      text={"완료"}
                      onEvent={() => editBudget(editForm.id)}
                    />
                    <SmallButton text={"취소"} onEvent={editCancle} />
                  </div>
                </div>
              ) : (
                <div className={style.budgetInner}>
                  <p>{budget.item}</p>
                  <p className={style.amount}>{budget.amount}</p>

                  <div className={style.buttons}>
                    <SmallButton
                      text={"수정"}
                      onEvent={() => {
                        setEditId(budget.id);
                        setEditForm({
                          id: budget.id,
                          item: budget.item,
                          amount: budget.amount,
                        });
                      }}
                    />
                    <SmallButton
                      text={"삭제"}
                      onEvent={() => deleteBudget(budget.id)}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className={style.totalAmount}>
        <button className={style.deleteAllButton} onClick={deleteAll}>
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
