"use strict";

const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");

const resetBtn = document.querySelector(`button[type="reset"]`);

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
    
    <label for="item${i}" >${plate.text}</label for="items{i}">
    </li>
     `;
    })
    .join("");
};

const toggleDone = function (e) {
  const el = e.target;
  if (!el.matches("input")) return; //skip targets that aren't input

  const index = el.dataset.index;
  items[index].done = !items[index].done;

  localStorage.setItem("items", JSON.stringify(items)); // set it to local storage
  updateList(items, itemsList); //update the list
};

const reset = function () {
  console.log("cleared in local storage");
  localStorage.clear();

  itemsList.innerHTML = `<li>Loading Bole...</li>`;
};

// Event Listeners
addItems.addEventListener("submit", addItem);

// NOTE: Event Delegation is simply giving responsibility to a tag or variable that can handle it, in the event where the main target can't.
itemsList.addEventListener("click", toggleDone);

resetBtn.addEventListener("click", reset);

// populate list upon page load
updateList(items, itemsList);
