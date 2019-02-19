import { fn } from './root.js'
import './style.css'


fn();

let div = document.createElement('div');

let span1 = document.createElement('span');
span1.innerText = "HELL";
span1.className = "HELL";

let span2 = document.createElement('span');
span2.innerText = "O";


div.appendChild(span1);
div.appendChild(span2);
document.body.appendChild(div);