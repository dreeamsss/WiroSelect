# WiroSelect

__Для работы класса необходимо подключить JQuery__

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
