// // calculator
// function calculator(){
// let answer = document.getElementById("num1").value
// let answer2 = document.getElementById("num2").value
// let answer3 = document.getElementById("expression").value;
// // console.log(answer , answer2 , answer3)

// if(answer3 === "+"){
//     console.log(Number(answer) + Number(answer2))
// }
// else if(answer3 === "-"){
//     console.log(Number(answer) - Number(answer2))
// }
// else if(answer3 === "*"){
//     console.log(Number(answer) * Number(answer2))
// }
// else if(answer3 === "/"){
//     console.log(Number(answer) / Number(answer2))
// }
// else if(answer3 === "%"){
//     console.log(Number(answer) % Number(answer2))
// }
// else{
//     console.log("Enter valdid number")
// }
// }

// // todo list

// let arr = []
// for(let i =1; i <= 5 ; i++){
// var list = prompt("Enter a item")
// arr.push(list)
// }
// console.log(arr)

// let storedItems = document.getElementById("items")
// let arr = []
// function todoList(){
//     if(storedItems){
//     arr.push(storedItems.value)

//     console.log(arr)
//     document.getElementById("items").value = " ";

// }

// }
// let reset = document.getElementById("reset1")
// function resetBtn(){

// }6

// calculator

// select display element
const display = document.getElementById("display");

//SELECT BUTTONS ELEMENTS
const buttons = document.querySelectorAll("button");
let currentInput = "";
let previousInput = "";
let operator = null;

// Sab buttons pe click event listener lagana
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const value = this.textContent;

    // click AC button then clear everything
    if (value === "AC") {
      currentInput = "";
      previousInput = "";
      operator = null;
      updateDisplay();
      return;
    }

    // if click on C button then remove last elemnt
    if (value === "C") {
      currentInput = currentInput.slice(0, -1);
      updateDisplay();
      return;
    }

    // if click on any operatoer
    if (["+", "-", "x", "/", "%"].includes(value)) {
      if (currentInput === "") return; // Agar currentInput khali hai toh kuch na karna
      if (previousInput !== "") {
        calculate(); // pehly ka operation complte krna
      }
      operator = value; //opertor set krna
      previousInput = currentInput; // Current input ko previous input mein save karna
      currentInput = ""; // currentInput lko reset krna
      return;
    }

    // / Agar equal to dabaya gaya toh result calculate karna
    if (value === "=") {
      calculate();
      updateDisplay();
      return;
    }

    // / Agar koi number ya decimal hai toh input mein add karna
    if (value === "." && currentInput.includes(".")) return; // prevent  mltiple decimals
    currentInput += value;
    updateDisplay();
  });
});

//Logic of calculation
function calculate() {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "x":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    case "%":
      result = (prev / 100) * current;
      break;
    default:
      return;
  }
  currentInput = result.toString();
  operator = null;
  previousInput = "";
}
//display ko update krna
function updateDisplay() {
  display.value = currentInput || "0";
}
