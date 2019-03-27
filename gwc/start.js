var ul = document.getElementById('menu');
// 动态创建li添加商品
for (var i = 0; i < commodity.length; i++) {
	var li = document.createElement('li');
	var choose = document.createElement('input');
	choose.type = 'checkbox';
	choose.className = 'checkbox';
	var img = document.createElement('img');
	img.src = commodity[i].comImg;
	var spanName = document.createElement('span');
	spanName.innerHTML = commodity[i].comName;
	var spanPrice = document.createElement('span');
	spanPrice.innerHTML = commodity[i].comPrice;
	var red = document.createElement('input');
	red.type = 'button';
	red.value = '-';
	var number = document.createElement('input');
	number.type = 'text';
	number.className = 'number';
	number.value = 0;
	var add = document.createElement('input');
	add.type = 'button';
	add.value = '+';
	var spanText = document.createElement('span');
	spanText.innerHTML = '商品总价：';
	var spanComPrice = document.createElement('span');
	spanComPrice.innerHTML = commodity[i].comPrice * number.value;
	li.append(choose);
	li.append(img);
	li.append(spanName);
	li.append(spanPrice);
	li.append(red);
	li.append(number);
	li.append(add);
	li.append(spanText);
	li.append(spanComPrice);
	ul.append(li);
}

// 全选
var all = document.getElementById('all');
var inputs = document.getElementsByClassName('checkbox');
all.onchange = function(){
	for (var i of inputs) {
		i.checked = all.checked;
	}
	calculationTotal();
}

// 输入框只能输数字
var numbers  = document.getElementsByClassName('number');
for (let i = 0; i < numbers.length; i++) {
	numbers[i].oninput = function(){
		if(Number(this.value) != parseInt(this.value)){
			numbers[i].value = '1';
		}
		calculationCom(i);
		calculationTotal();
	}
	
	// 减商品数量
	numbers[i].previousSibling.onclick = function(){
		if(numbers[i].value == '0'){
			return
		}
		numbers[i].value--;
		calculationCom(i);
		calculationTotal();
	}
	
	// 加商品数量
	numbers[i].nextSibling.onclick = function(){
		numbers[i].value++;
		calculationCom(i);
		calculationTotal();
	}
}

// 计算商品总价
function calculationCom(i){
	numbers[i].parentNode.lastChild.innerHTML = parseInt(numbers[i].value) * numbers[i].parentNode.children[3].innerHTML
}

// 计算订单总价
var totalSpan = document.querySelector('#total');
for (let i = 0; i < inputs.length; i++) {
	inputs[i].onchange = function(){
		calculationTotal();
	}
}

function calculationTotal(){
	var total = 0;
	for (let i = 0; i < inputs.length; i++) {
		if(inputs[i].checked){
			total += parseInt(inputs[i].parentNode.lastChild.innerHTML)
		}
	}
	totalSpan.innerHTML = total;
}