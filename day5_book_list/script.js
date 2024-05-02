const titleInput = document.querySelector(".title_input");
const writerInput = document.querySelector(".writer_input");
const bookListElement = document.querySelector(".book_list");
const toastMessageElement = document.querySelector(".toast_message");

const bookListData = JSON.parse(localStorage.getItem("bookList")) || [];

function bookListLoad() {
  bookListElement.innerHTML = `
  <li class="book_list_title">
    <span>제목</span>
    <span>저자</span>
    <span>관리</span>
  </li>`;

  if (bookListData.length > 0) {
    for (let i = 0; i < bookListData.length; i++) {
      bookListElement.innerHTML += `
      <li class="book_list_item">
        <span>${bookListData[i].title}</span>
        <span>${bookListData[i].writer}</span>
        <div class="button_box">
          <button class="delete_button" data-index="${i}">삭제</button>
        </div>
      </li>`;
    }
  } else {
    bookListElement.innerHTML += `<li class="no_content">기록이 없습니다.</li>`;
  }
}

function addBookList() {
  const noContentElement = document.querySelector(".no_content");
  if (noContentElement) {
    noContentElement.remove();
  }

  bookListElement.innerHTML += `
  <li class="book_list_item">
    <span>${bookListData[bookListData.length - 1].title}</span>
    <span>${bookListData[bookListData.length - 1].writer}</span>
    <div class="button_box">
      <button class="delete_button" data-index="${
        bookListData.length - 1
      }">삭제</button>
    </div>
  </li>`;
}

function addBookListData() {
  const titleInputValue = titleInput.value;
  const writerInputValue = writerInput.value;

  if (titleInputValue === "") {
    alert("책 제목을 입력해주세요.");
  } else if (writerInputValue === "") {
    alert("저자를 입력해주세요.");
  } else {
    const bookData = {
      title: titleInputValue,
      writer: writerInputValue,
    };

    bookListData.push(bookData);

    localStorage.setItem("bookList", JSON.stringify(bookListData));
    addBookList();

    titleInput.value = "";
    writerInput.value = "";

    toggleMessage("책이 기록되었습니다.");
  }
}

function bookDataDelete(event) {
  const deleteIndex = event.target.dataset.index;
  bookListData.splice(deleteIndex, 1);
  localStorage.setItem("bookList", JSON.stringify(bookListData));

  bookListLoad();
}

function toggleMessage(message) {
  toastMessageElement.textContent = message;
  toastMessageElement.classList.add("show");

  setTimeout(() => {
    toastMessageElement.classList.remove("show");
  }, 2000);
}

const sendButton = document.querySelector(".send");

sendButton.addEventListener("click", addBookListData);

bookListElement.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete_button")) {
    if (confirm("기록을 삭제하시겠습니까?")) {
      bookDataDelete(event);
      toggleMessage("기록이 삭제되었습니다.");
    }
  }
});

bookListLoad();
