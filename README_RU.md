# FoxlDB

Универсальное хранилище для JavaScript-приложений. В браузере состояние сохраняется в localStorage, в Node.js в json-файле.

## Установка

```
$ npm i foxl-db --save
```

## Использование

```js
import { createStorage } from "foxl-db";

const db = createStorage({
  path: "./db",
  save: true, // не обязателен, по умолчанию - true
  seed: {
    // не обязателен, по умолчанию - {}
    foo: 42,
    bar: {
      baz: "42"
    }
  }
});

// Получение
const foo = db.get("foo"); // 42
const bar = db.get("bar"); // { baz: "42" }
const baz = db.get("bar.baz"); // "42"

// Изменение
db.set("foo", 43);
db.set("bar.baz", "43");
```

### createStorage(params)

Создает экземпляр хранилища. Описание полей `params`:

- `path` - **Обязательное поле**. Ключ в localStorage для браузера или путь до **каталога** c БД для Node.js;
- `save` - _Опциональное поле_. Если `true` изменения будут сохраняться в хранилище, в противном случае, изменения не будут сохранены;
- `seed` - _Опциональное поле_. Начальное состояние хранилища. Используется, если хранилище ранее не было инициализировано, т.е отсутствует запись по ключу `path` в localStorage в браузере или файл `foxldb.json` в каталоге `path` для Node.js.

## FoxlDB API

Описание API экземпляра FoxlDB, созданного с помощью `createStorage()`.

#### get(path)

Возвращает значение поля.

```js
const db = createStorage({
  path: "./db",
  seed: {
    foo: 42,
    bar: [1, 2, 3, 4]
  }
});

db.get("foo"); // 42
db.get("bar"); // [1, 2, 3, 4]

db.get("baz"); // undefined
db.get("baz.bar"); // undefined
```

#### set(path, value)

Изменяет поле в хранилище, если оно существует, если нет - создает с указанным значением.

**Важно**: Значение не будет изменено или создано, если родитель создаваемого свойства не объект.

```js
const db = createStorage({
  path: "./db",
  seed: {
    foo: 42
  }
});

db.set("foo", 43); // Изменит значение "foo" на 43
console.log(db.get("foo")); // 43

db.set("foo.bar", 42); // Не будет применено, т.к родитель "foo" не объект
console.log(db.get("foo")); // 43

db.set("bar", false); // Создаст ключ "bar" со значением false
console.log(db.get("bar")); // false

db.set("posts", [{ id: 1, title: "Lorem" }]); // Создаст ключ "post" с соответствующим значением
console.log(db.get("posts")); // [{ id: 1, title: "Lorem" }]

db.set("config.isDev", true); // Не будет создано, т.к родитель "config" не объект

db.set("config", { isDev: true }); // Создаст ключ "config" с соответствующим значением
console.log(db.get("config")); // { isDev: true }

db.set("config.isDev", false); // Изменит значение "config.isDev" на true
console.log(db.get("config")); // { isDev: false }
```

#### update(path, reducer)

Лучшее решение, если необходимо изменить значение поля, используя текущее значение.

Функция `reducer` будет вызвана с текущим значением, а возвращенный ей результат станет новым значением поля.

```js
const db = createStorage({
  path: "./db",
  seed: {
    config: { isDev: true, count: 0 },
    numbers: [1, 2, 3, 4, 5]
  }
});

// Вы можете изменять значение полей объектов
db.update("config", config => {
  config.isDev = false;

  return config;
});
console.log(db.get("config")); // { isDev: false, count: 0 }

db.update("numbers", numbers => numbers.map(number => number * 10));
console.log(db.get("numbers")); // [10, 20, 30, 40, 50]

// Если поле отсутствует, но может быть создано (родитель - объект), то оно будет создано
db.update("foo", () => 42);
console.log(db.get("foo")); // 42
```

#### watch(path, handler)

Вы можете добавить функцию-наблюдателя за полем. Она будет вызвана при изменении поля методами `set`, `update`.

Данная функция (`handler`) будет вызвана с двумя параметрами: `nextValue` - новое значение, `prevValue` - старое значение.

**Важно**: При вызове `setState()` наблюдатели не будут вызваны, а так же произойдет отписка.

```js
const db = createStorage({
  path: "./db",
  seed: {
    value: 100
  }
});

function valueWatcher(nextValue, prevValue) {
  console.log(`Новое значение: ${nextValue}. Старое значение: ${prevValue}`);
}

db.watch("value", valueWatcher);

db.set("value", 150);
// Новое значение: 150. Старое значение: 100

db.update("value", val => val * 2);
// Новое значение: 300. Старое значение: 150
```

#### for(path)

Позволяет создавать модель (`FoxlModel`) для поля, предоставляя более удобный интерфейс взаимодействия с ним.

Для модели доступен вызов методов `get`, `set`, `update` и `watch` без указания `path`.

Для выделения модели среди остальных переменных рекомендуется добавлять окончание `$f` (например, `user` => `user$f` ).

```js
const db = createStorage({
  path: "./db",
  seed: {
    counter: 0
  }
});

const counter$f = db.for("counter");

// Равнозначно: db.get("counter")
console.log(counter$f.get()); // 0

// Равнозначно: db.set("counter", 1)
counter$f.set(1); // Установка нового значения (1)

// Равнозначно: db.update("counter", value => value * 10)
counter$f.update(value => value * 10); // Установка нового значения (10)

// Равнозначно: db.watch("counter", ...)
counter$f.watch((next, prev) => {
  console.log(`Было: ${prev}, стало: ${next}`);
});
```

#### getState()

Возвращает состояние экземпляра.

```js
const db = createStorage({
  path: "./db",
  seed: {
    counter: 0,
    text: "Lorem",
    foo: {
      bar: [1, 2, 3, 4, 5],
      baz: {
        x: 10,
        y: null
      }
    }
  }
});

console.log(db.getState());

// {
//   counter: 0,
//   text: "Lorem",
//   foo: {
//       bar: [1,2,3,4,5],
//       baz: {
//           x: 10,
//           y: null
//       }
//   }
// }
```

#### setState(newState)

Устанавливает новое значение состояния.

**Важно**: Наблюдатели, добавленные методом `watch` не будут вызваны, а так же их список будет очищен.

```js
const db = createStorage({
  path: "./db",
  seed: {}
});

db.setState({ foo: 42 });

console.log(db.getState()); // { foo: 42 }
```

## Лицензия

[MIT](LICENSE)
