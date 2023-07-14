# WiroSelect
Custom Select

Для работы класса необходимо подключить JQuery!!!!!!!!!!

Класс WiroSelect при создании экземляра принимает следующие параметры:
const customSelect = new Wiro(element, {options})
selector - селектор основного элемента <select> 
options:
  selectedClass - ваш кастомный класс, который добавляется к выбранному элементу (по умолчанию "wiroSelect__item--selected")
  slideToggleTiming - время закрытия и открытия селекта в миллисекундах

Свойства:
  value - возвращает value выбранного option (по умолчанию возвращает value первого элемента)
  name - возвращает name переданного <select> 
  selectedIndex - возвращает индекс выбранного элемента (по умолчанию 0)

Методы:
  openSelect() - открывает select
  closeSelect - закрывает select


Пример: 
// HTML
<select class="mycars">
  <option value="Mercedes">Mercedes</option>
  <option value="Minivan">Minivan</option>
  <option value="Landau">Landau</option>
</select>

//JS
const mycars = new WiroSelect(".mycars", {
  selectedClass: "my-selected-class",
  slideToggleTiming: 200
})
