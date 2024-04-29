import dataList from "./data.json" assert { type: "json" };

const icecreamList = document.querySelector(".icecream_list");
const icecreamCategory = document.querySelectorAll(".category_btn");

function icecreamDataList(category) {
  let html = ``;

  if (category === "All") {
    dataList.forEach((data) => {
      html += `<div class="icecream_item">
          <div class="img_box"><img src="${data.src}" /></div>
          <div class="text_box">
            <span>${data.eng_title}</span>
            <h4>${data.title}</h4>
            <p>${data.content}</p>
          </div>
        </div>`;
    });
  } else {
    const filterdataList = dataList.filter(
      (data) => category === data.category
    );

    filterdataList.forEach((data) => {
      html += `<div class="icecream_item">
        <div class="img_box"><img src="${data.src}" /></div>
        <div class="text_box">
          <span>${data.eng_title}</span>
          <h4>${data.title}</h4>
          <p>${data.content}</p>
        </div>
      </div>`;
    });
  }

  icecreamList.innerHTML = html;
}

function clickCategory(e) {
  const target = e.target;
  const previousSelected = document.querySelector(".on");

  if (previousSelected) {
    previousSelected.classList.remove("on");
  }

  target.classList.add("on");
  icecreamDataList(target.innerText);
}

icecreamCategory.forEach((category) => {
  category.addEventListener("click", clickCategory);
});

icecreamDataList("All");
