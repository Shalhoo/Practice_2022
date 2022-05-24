//Установление параметров для нарезки диска d и m
const dParam = prompt('Укажите диаметр диска в диапазое от 130 до 230', 230)
    if (dParam >= 130 && dParam <= 230 && dParam / 10) {
     	document.querySelector('#dParam').textContent = dParam;
     	const mParam = prompt('Укажите диаметр диска в диапазое от 13 до 23', 23)
	     	if (mParam >= 13 && mParam <= 23) {
	    	document.querySelector('#mParam').textContent = mParam;
	    } else {
	    	alert('Ведите значение модуля в диапазоне от 13 до 23')
	    	mParam
	    }
	    if (dParam % mParam) {
	    	alert('Введите значение диаметра кратное значению модуля')
	    	dParam
	    	mParam
	    }
    } else {
    	alert('Ведите значение диаметра в диапазоне от 130 до 230')
    	dParam
    	mParam
    } 
    