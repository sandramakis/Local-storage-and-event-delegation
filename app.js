"use strict";

const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");

const items = JSON.parse(localStorage.getItem("items")) || [];

const addItem = function (e) {
  e.preventDefault();

  const text = this.querySelector(`input[name=item]`).value;

  const item = {
    text,
    done: false,
  };

  items.push(item);
  updateList(items, itemsList);

  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
};

// get the mapped values of the items array, map it and return the plate value as a new list item of the parent UL

const updateList = function (plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return ` 
      <li>
      <input type="checkbox" data-index="${i}" id="item${i}" ${
        plate.done ? "checked" : ""
      } />
    
    <label for="item" >${plate.text}</label for="items{i}">
    </li>
     `;
    })
    .join("");
};

addItems.addEventListener("submit", addItem);

updateList(items, itemsList);
