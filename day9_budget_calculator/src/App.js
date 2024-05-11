import { useState, useEffect } from "react";
import style from "./App.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BudgetForm from "./components/BudgetForm/BudgetForm";
import BudgetEdit from "./components/BudgetEdit/BudgetEdit";
import BudgetItem from "./components/BudgetItem/BudgetItem";

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
      <BudgetForm
        amountForm={amountForm}
        handleChangeAmountInput={handleChangeAmountInput}
        addBudget={addBudget}
      />
      {budgetList && (
        <div className={style.budgetList}>
          {budgetList.map((budget) => (
            <div className={style.budget} key={budget.id}>
              {editId === budget.id ? (
                <BudgetEdit
                  editForm={editForm}
                  handleChangeEditInput={handleChangeEditInput}
                  editBudget={editBudget}
                  editCancle={editCancle}
                />
              ) : (
                <BudgetItem
                  data={budget}
                  setEditId={setEditId}
                  setEditForm={setEditForm}
                  deleteBudget={deleteBudget}
                />
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
