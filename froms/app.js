const bebra = document.getElementById('V1');
const bebra2 = document.getElementById('V2');
const bebra3 = document.getElementById('V3');
const numberDisplay = document.getElementById("numberDisplay");

class PageSwitcher {
    constructor(elementIds) {
        this.elements = elementIds.map(id => document.getElementById(id));
        this.currentIndex = 0;
      }
    
      switchToNext() {
        this.elements[this.currentIndex].style.display = "none";
        this.currentIndex = (this.currentIndex + 1) % this.elements.length;
        this.elements[this.currentIndex].style.display = "flex";
      }
}
    


const weakSet = new WeakSet();
let obj1 = { message: "Hello" };
let obj2 = { message: "World" };

weakSet.add(obj1);
weakSet.add(obj2);

const weakMap = new WeakMap();
weakMap.set(obj1, "Value for obj1");
weakMap.set(obj2, "Value for obj2");

console.log(weakMap.get(obj1)); 

obj1 = null; 

function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
  }
  
const generator = numberGenerator();
function displayNextNumber() {
    const nextValue = generator.next();

    if (!nextValue.done) {
      numberDisplay.textContent = nextValue.value;
      // Optionally, add a delay for visual effect:
      setTimeout(displayNextNumber, 1000); // Display next number after 1 second
    } else {
      numberDisplay.textContent = "No more time";
    }
  }
  const switcher = new PageSwitcher(["V1", "V2", "V3"]);

  switcher.switchToNext();
  displayNextNumber();