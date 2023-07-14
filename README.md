# WiroSelect

Для работы класса необходимо подключить JQuery.

Класс WiroSelect при установке экземляра принимает следующие параметры:

```javascript
const customSelect = new WiroSelect(selector, { options })
```
- _selector_ - селектор основного элемента ```<select>```
- _options_:
  - ___selectedClass___ - ваш кастомный класс, который производится к выбранному элементу (по умолчанию ```"wiroSelect __ item--selected"```)
  - ___slideToggleTiming___ - время закрытия и открытия селекта в миллисекундах

## Свойства:

- _value_ - возвращает value выбранного option (по умолчанию возвращает value первого элемента)
- _name_ - возвращает name переданного
- _selectedIndex_ - возвращает индекс выбранного элемента (по умолчанию 0)

## Методы:

- _openSelect()_ - открывает select
- _closeSelect()_ - закрывает select

## Пример

```HTML
<select class="mycars" name="cars">
  <option value="Mercedes">Mercedes</option>
  <option value="Minivan">Minivan</option>
  <option value="Landau">Landau</option>
</select>
```

```javascript
const mycars = new WiroSelect(".mycars", {
  selectedClass: "my-selected-class",
  slideToggleTiming: 200,
});

mycars.value; // Mercedes
mycars.name; // cars
mycars.selectedIndex; // 0
```
