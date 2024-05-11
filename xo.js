let Player = "X";
let winer = false
const pobeda = document.getElementById("pobeda");


const button = (el) => {
    if (!el.innerHTML.trim() && winer == false) { 
        el.innerHTML = Player; 
        if (check()) {
            winer = true
            if (Player === 'X'){
                pobeda.innerHTML = "X win"
            }else  {
                pobeda.innerHTML = "O win "
            };
        };
        Player = Player === 'X' ? 'O' : 'X'; 
    }
    console.log(el.id)
};
const check = () => {
    const cells = document.querySelectorAll('.cell');
    if (cells[0].innerHTML && cells[0].innerHTML === cells[1].innerHTML && cells[0].innerHTML === cells[2].innerHTML) {
        document.getElementById('g1').style.display = "flex";
        return true;} 
    if (cells[3].innerHTML && cells[3].innerHTML === cells[4].innerHTML && cells[3].innerHTML === cells[5].innerHTML) { 
        document.getElementById('g2').style.display = "block";
        return true;} 
    if (cells[6].innerHTML && cells[6].innerHTML === cells[7].innerHTML && cells[6].innerHTML === cells[8].innerHTML) { 
        document.getElementById('g3').style.display = "block";
        return true;
    }; 
    if (cells[0].innerHTML && cells[0].innerHTML === cells[3].innerHTML && cells[0].innerHTML === cells[6].innerHTML) {
        document.getElementById('v1').style.display = "block";
        return true;} 
    if (cells[1].innerHTML && cells[1].innerHTML === cells[4].innerHTML && cells[1].innerHTML === cells[7].innerHTML) {
        document.getElementById('v2').style.display = "block";
        return true; }
    if (cells[2].innerHTML && cells[2].innerHTML === cells[5].innerHTML && cells[2].innerHTML === cells[8].innerHTML) {
        document.getElementById('v3').style.display = "block";

        return true; } 
    if (cells[0].innerHTML && cells[0].innerHTML === cells[4].innerHTML && cells[0].innerHTML === cells[8].innerHTML) {
        document.getElementById('d1').style.display = "block";
        return true;}
    if (cells[2].innerHTML && cells[2].innerHTML === cells[4].innerHTML && cells[2].innerHTML === cells[6].innerHTML) {
        document.getElementById('d2').style.display = "block";

        return true;} 
    return false;
};