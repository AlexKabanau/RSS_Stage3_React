# Rolling Scopes School
## Performance

# 📊 Производительность приложения (React DevTools Profiler)

### 🔍 Тестируемая операция:
* ***Filter countries by region (All -> Antarctic)***

### 📌 Результаты профилирования:
- **Commit Duration:** 24.1ms
- **Максимальное время рендеринга компонента:** 24.1ms (Компонент `<HomePage>`)
- **Наиболее затратный компонент:** 23.4ms `<ListItems>`
- **Количество повторных рендеров:** 5 (Компонент `<CountryItem>`)

### 📊 Графики профилирования:
#### 1️⃣ **Flame Graph**
![Flame Graph](/src/assets/images/before/image-3.png)

#### 2️⃣ **Ranked Chart**
![Ranked Chart](/src/assets/images/before/image-4.png)

### 🔍 Тестируемая операция:
* ***Filter countries by region(Antarctic -> Americas)***

### 📌 Результаты профилирования:
- **Commit Duration:** ~25.3ms
- **Максимальное время рендеринга компонента:** 25.3ms (Компонент `<HomePage>`)
- **Наиболее затратный компонент:** 24.6ms `<ListItems>`
- **Количество повторных рендеров:** 56 (Компонент `<CountryItem>`)

### 📊 Графики профилирования:
#### 1️⃣ **Flame Graph**
![Flame Graph](/src/assets/images/before/image-5.png)

#### 2️⃣ **Ranked Chart**
![Ranked Chart](/src/assets/images/before/image-6.png)

### 🔍 Тестируемая операция:
* ***Filter countries by region(Americas -> Europe)***

### 📌 Результаты профилирования:
- **Commit Duration:** ~17.8ms
- **Максимальное время рендеринга компонента:** 17.8ms (Компонент `<HomePage>`)
- **Наиболее затратный компонент:** 16.7ms `<ListItems>`
- **Количество повторных рендеров:** 53 (Компонент `<CountryItem>`)

### 📊 Графики профилирования:
#### 1️⃣ **Flame Graph**
![Flame Graph](/src/assets/images/before/image-7.png)

#### 2️⃣ **Ranked Chart**
![Ranked Chart](/src/assets/images/before/image-8.png)
### 🔍 Тестируемая операция:
* ***Filter countries by region(Europe -> Africa)***

### 📌 Результаты профилирования:
- **Commit Duration:** ~22.6ms
- **Максимальное время рендеринга компонента:** 22.6ms (Компонент `<HomePage>`)
- **Наиболее затратный компонент:** 22ms `<ListItems>`
- **Количество повторных рендеров:** 59 (Компонент `<CountryItem>`)

### 📊 Графики профилирования:
#### 1️⃣ **Flame Graph**
![Flame Graph](/src/assets/images/before/image-9.png)

#### 2️⃣ **Ranked Chart**
![Ranked Chart](/src/assets/images/before/image-10.png)
### 🔍 Тестируемая операция:
* ***Filter countries by region(Africa -> Asia)***

### 📌 Результаты профилирования:
- **Commit Duration:** ~16.4ms
- **Максимальное время рендеринга компонента:** 16.4ms (Компонент `<HomePage>`)
- **Наиболее затратный компонент:** 15.7ms `<ListItems>`
- **Количество повторных рендеров:** 50 (Компонент `<CountryItem>`)

### 📊 Графики профилирования:
#### 1️⃣ **Flame Graph**
![Flame Graph](/src/assets/images/before/image-11.png)

#### 2️⃣ **Ranked Chart**
![Ranked Chart](/src/assets/images/before/image-12.png)

### 🔍 Тестируемая операция:
* ***Filter countries by region(Asia -> Oceania)***

### 📌 Результаты профилирования:
- **Commit Duration:** ~8.8ms
- **Максимальное время рендеринга компонента:** 8.8ms (Компонент `<HomePage>`)
- **Наиболее затратный компонент:** 8.2 ms`<ListItems>`
- **Количество повторных рендеров:** 27 (Компонент `<CountryItem>`)

### 📊 Графики профилирования:
#### 1️⃣ **Flame Graph**
![Flame Graph](/src/assets/images/before/image-13.png)

#### 2️⃣ **Ranked Chart**
![Ranked Chart](/src/assets/images/before/image-14.png)

### 🔍 Тестируемая операция:
* ***Filter countries by region(Oceania -> All)***

### 📌 Результаты профилирования:
- **Commit Duration:** ~86.8ms
- **Максимальное время рендеринга компонента:** 86.8ms (Компонент `<HomePage>`)
- **Наиболее затратный компонент:** 85.9ms `<ListItems>`
- **Количество повторных рендеров:** 250 (Компонент `<CountryItem>`)

### 📊 Графики профилирования:
#### 1️⃣ **Flame Graph**
![Flame Graph](/src/assets/images/before/image-15.png)

#### 2️⃣ **Ranked Chart**
![Ranked Chart](/src/assets/images/before/image-16.png)
---

### 🔍 Тестируемая операция:
* ***Sort countries by population(population DESC -> population ASC)***

### 📌 Результаты профилирования:
- **Commit Duration:** ~28ms
- **Максимальное время рендеринга компонента:** 28ms (Компонент `<HomePage>`)
- **Наиболее затратный компонент:** 27ms `<ListItems>`
- **Количество повторных рендеров:** 250 (Компонент `<CountryItem>`)

### 📊 Графики профилирования:
#### 1️⃣ **Flame Graph**
![Flame Graph](/src/assets/images/before/image-17.png)

#### 2️⃣ **Ranked Chart**
![Ranked Chart](/src/assets/images/before/image-18.png)

### 🔍 Тестируемая операция:
* ***Sort countries by name(population ASC -> name ASC)***

### 📌 Результаты профилирования:
- **Commit Duration:** ~34.9ms
- **Максимальное время рендеринга компонента:** 34.9ms (Компонент `<HomePage>`)
- **Наиболее затратный компонент:** 34.1ms `<ListItems>`
- **Количество повторных рендеров:** 250 (Компонент `<CountryItem>`)

### 📊 Графики профилирования:
#### 1️⃣ **Flame Graph**
![Flame Graph](/src/assets/images/before/image-19.png)

#### 2️⃣ **Ranked Chart**
![Ranked Chart](/src/assets/images/before/image-20.png)

### 🔍 Тестируемая операция:
* ***Search Belarus***

### 📌 Результаты профилирования:
- **Commit Duration:** ~30.6ms
- **Максимальное время рендеринга компонента:** 30.6ms (Компонент `<HomePage>`)
- **Наиболее затратный компонент:** 28.7 ms `<ListItems>`
- **Количество повторных рендеров:** 1 (Компонент `<CountryItem>`)

### 📊 Графики профилирования:
#### 1️⃣ **Flame Graph**
![Flame Graph](/src/assets/images/before/image-21.png)

#### 2️⃣ **Ranked Chart**
![Ranked Chart](/src/assets/images/before/image-22.png)
---


### 🛠 Оптимизация:
- Использован `React.memo()` для `<TableRow>`, что снизило количество ререндеров.
- Оптимизирована работа с `useState`, уменьшено количество вызовов `setState`.
- Добавлены `useCallback` и `useMemo` для предотвращения лишних ререндеров.

🔹 **Результат:**

### 🔍 Тестируемая операция:
* ***Filter countries by region (All -> Antarctic)***

### 📌 Результаты профилирования:
- **Commit Duration:** ~~24.1ms~~ 2.2ms
- **Максимальное время рендеринга компонента:** ~~24.1ms~~ 2.2ms (Компонент `<HomePage>`)
- **Наиболее затратный компонент:** 0.9ms `<ListItems> (Memo)`
- **Количество повторных рендеров:** 5 (Компонент `<CountryItem>`)

### 📊 Графики профилирования:
#### 1️⃣ **Flame Graph**
![Flame Graph](/src/assets/images/after/image.png)

#### 2️⃣ **Ranked Chart**
![Ranked Chart](/src/assets/images/after/image-1.png)

### 🔍 Тестируемая операция:
* ***Filter countries by region(Antarctic -> Americas)***

### 📌 Результаты профилирования:
- **Commit Duration:** ~~25.3ms~~ 21.6ms
- **Максимальное время рендеринга компонента:** ~~25.3ms~~ 21.6ms (Компонент `<HomePage>`)
- **Наиболее затратный компонент:** 20.1ms `<ListItems> (Memo)`
- **Количество повторных рендеров:** 56 (Компонент `<CountryItem>`)

### 📊 Графики профилирования:
#### 1️⃣ **Flame Graph**
![Flame Graph](/src/assets/images/after/image-2.png)

#### 2️⃣ **Ranked Chart**
![Ranked Chart](/src/assets/images/after/image-3.png)

### 🔍 Тестируемая операция:
* ***Filter countries by region(Americas -> Europe)***

### 📌 Результаты профилирования:
- **Commit Duration:** ~~17.8ms~~ 19.1ms
- **Максимальное время рендеринга компонента:** ~~17.8ms~~ 19.1ms (Компонент `<HomePage>`)
- **Наиболее затратный компонент:** 18.1ms `<ListItems> (Memo)`
- **Количество повторных рендеров:** 53 (Компонент `<CountryItem>`)

### 📊 Графики профилирования:
#### 1️⃣ **Flame Graph**
![Flame Graph](/src/assets/images/after/image-4.png)

#### 2️⃣ **Ranked Chart**
![Ranked Chart](/src/assets/images/after/image-5.png)
### 🔍 Тестируемая операция:
* ***Filter countries by region(Europe -> Africa)***

### 📌 Результаты профилирования:
- **Commit Duration:** ~~22.6ms~~ 19.4ms
- **Максимальное время рендеринга компонента:** ~~22.6ms~~ 19.4ms (Компонент `<HomePage>`)
- **Наиболее затратный компонент:** 18.5ms `<ListItems> (Memo)`
- **Количество повторных рендеров:** 59 (Компонент `<CountryItem>`)

### 📊 Графики профилирования:
#### 1️⃣ **Flame Graph**
![Flame Graph](/src/assets/images/after/image-6.png)

#### 2️⃣ **Ranked Chart**
![Ranked Chart](/src/assets/images/after/image-7.png)
### 🔍 Тестируемая операция:
* ***Filter countries by region(Africa -> Asia)***

### 📌 Результаты профилирования:
- **Commit Duration:** ~~16.4ms~~ 14.4ms
- **Максимальное время рендеринга компонента:** ~~16.4ms~~ 14.4ms (Компонент `<HomePage>`)
- **Наиболее затратный компонент:** 13.7ms `<ListItems> (Memo)`
- **Количество повторных рендеров:** 50 (Компонент `<CountryItem>`)

### 📊 Графики профилирования:
#### 1️⃣ **Flame Graph**
![Flame Graph](/src/assets/images/after/image-8.png)

#### 2️⃣ **Ranked Chart**
![Ranked Chart](/src/assets/images/after/image-9.png)

### 🔍 Тестируемая операция:
* ***Filter countries by region(Asia -> Oceania)***

### 📌 Результаты профилирования:
- **Commit Duration:** ~~8.8ms~~ 8.8ms
- **Максимальное время рендеринга компонента:** ~~8.8ms~~ 8.8ms (Компонент `<HomePage>`)
- **Наиболее затратный компонент:** 6.6ms `<ListItems> (Memo)`
- **Количество повторных рендеров:** 27 (Компонент `<CountryItem>`)

### 📊 Графики профилирования:
#### 1️⃣ **Flame Graph**
![Flame Graph](/src/assets/images/after/image-10.png)

#### 2️⃣ **Ranked Chart**
![Ranked Chart](/src/assets/images/after/image-11.png)

### 🔍 Тестируемая операция:
* ***Filter countries by region(Oceania -> All)***

### 📌 Результаты профилирования:
- **Commit Duration:** ~~86.8ms~~ 58.1ms
- **Максимальное время рендеринга компонента:** ~~86.8ms~~ 58.1ms (Компонент `<HomePage>`)
- **Наиболее затратный компонент:** 57.1ms `<ListItems> (Memo)`
- **Количество повторных рендеров:** 250 (Компонент `<CountryItem>`)

### 📊 Графики профилирования:
#### 1️⃣ **Flame Graph**
![Flame Graph](/src/assets/images/after/image-12.png)

#### 2️⃣ **Ranked Chart**
![Ranked Chart](/src/assets/images/after/image-13.png)
---

### 🔍 Тестируемая операция:
* ***Sort countries by population(population DESC -> population ASC)***

### 📌 Результаты профилирования:
- **Commit Duration:** ~~28ms~~ 26.3ms
- **Максимальное время рендеринга компонента:** ~~28ms~~ 26.3ms(Компонент `<HomePage>`)
- **Наиболее затратный компонент:** 25.1ms `<ListItems> (Memo)`
- **Количество повторных рендеров:** 250 (Компонент `<CountryItem>`)

### 📊 Графики профилирования:
#### 1️⃣ **Flame Graph**
![Flame Graph](/src/assets/images/after/image-14.png)

#### 2️⃣ **Ranked Chart**
![Ranked Chart](/src/assets/images/after/image-15.png)

### 🔍 Тестируемая операция:
* ***Sort countries by name(population ASC -> name ASC)***

### 📌 Результаты профилирования:
- **Commit Duration:** ~~34.9ms~~ 30.9ms
- **Максимальное время рендеринга компонента:** ~~34.9ms~~ 30.9ms (Компонент `<HomePage>`)
- **Наиболее затратный компонент:** 28.7ms `<ListItems> (Memo)`
- **Количество повторных рендеров:** 250 (Компонент `<CountryItem>`)

### 📊 Графики профилирования:
#### 1️⃣ **Flame Graph**
![Flame Graph](/src/assets/images/after/image-16.png)

#### 2️⃣ **Ranked Chart**
![Ranked Chart](/src/assets/images/after/image-17.png)

### 🔍 Тестируемая операция:
* ***Search Belarus***

### 📌 Результаты профилирования:
- **Commit Duration:** ~~30.6ms~~ 11ms
- **Максимальное время рендеринга компонента:** ~~30.6ms~~ 11ms(Компонент `<HomePage>`)
- **Наиболее затратный компонент:** 8.9ms `<ListItems> (Memo)`
- **Количество повторных рендеров:** 1 (Компонент `<CountryItem>`)

### 📊 Графики профилирования:
#### 1️⃣ **Flame Graph**
![Flame Graph](/src/assets/images/after/image-18.png)

#### 2️⃣ **Ranked Chart**
![Ranked Chart](/src/assets/images/after/image-19.png)
