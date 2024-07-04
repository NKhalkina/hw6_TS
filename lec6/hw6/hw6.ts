//Задание 1
//Реализуйте встроенный утилитарный тип Omit<T, K>, не используя его. Omit<T, K> создаёт тип со всеми полями из T, но не включает в этот тип поля K.

type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

interface Todo1 {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview1 = MyOmit<Todo1, 'description' | 'title'>;

const todo2: TodoPreview1 = {
  completed: false,
};

// keyof T извлекает все ключи из T.
// Exclude<keyof T, K> исключает ключи K из ключей T.
// Pick<T, Exclude<keyof T, K>> выбирает оставшиеся ключи из T.
// тип TodoPreview содержит только те поля из типа Todo1, которые не были исключены.

//Советы и рекомендации:
//Для выполнения задания рекомендуем освежить в памяти такие операторы, как extends и keyof, а также такие утилитарные типы, как Pick и Exclude.


//Задание 2. Простой собственный тип
// Что нужно сделать
// Реализуйте утилитарный тип First<T> , который принимает в качестве аргумента массив и принимает значение первого элемента этого массива.

// Советы и рекомендации:
// Для выполнения задания рекомендуем освежить в памяти такие операторы, как extends и keyof, а также типизацию массива через spread-оператор, например type First<T extends any[]> = …

//Чтобы создать утилитарный тип`First<T>`, который получает первый элемент массива`T`, можно воспользоваться операторами условного типа(`extends`) и деструктуризацией массивов через spread - оператор.Такой подход позволяет нам эффективно определить тип первого элемента массива.

type First<T extends any[]> = T extends [infer U, ...any[]] ? F : never;

//T extends any[] -  тип T будет массивом.
//T extends [infer F, ...any[]] - паттерн сопоставления, где infer U используется для создания нового типа U, который будет соответствовать первому элементу массива T. Остальная часть массива игнорируется с помощью ...any[].
//? U : never - если паттерн совпадает(то есть T имеет хотя бы один элемент), возвращаем тип U; иначе, возвращаем never.


type arr1 = ['a', 'b', 'c'];
type arr2 = [3, 2, 1];

type head1 = First<arr1>;
type head2 = First<arr2>;

//Задание 3. Omit, Readonly
// Что нужно сделать:
// Реализуйте тип MyReadonly<T, K>, который принимает два аргумента T и K, где K — набор полей из T, которые необходимо сделать readonly. Когда K не передано, MyReadonly должен делать readonly все поля из типа T как встроенный тип Readonly<T>.
// Советы и рекомендации:
// Вы можете использовать Readonly, Omit и Pick из стандартной библиотеки типов TypeScript. Omit и Pick помогут вам разделить тип на несколько частей. А Readonly поможет сделать все поля в одном из получившихся типов как readonly. Не забудьте объединить все обратно, чтобы получить необходимый тип.

//Для решения данной задачи можно использовать комбинацию утилитных типов TypeScript, таких как`Pick`, `Omit` и`Readonly`, чтобы создать тип`MyReadonly2`, который делает указанные поля типа `T` только для чтения, а остальные оставляет неизменными.

//K extends keyof T = keyof T- это значит, что  K или должно быть подмножеством ключей T, или по умолчанию будет keyof T.
type MyReadonly2<T, K extends keyof T = keyof T> = {
  //Каждый ключ P из K делает только для чтения.
  readonly [P in K]: T[P];
} & {
  //Остальные поля оставляем неизменными.
  [P in Exclude<keyof T, K>]: T[P];
};

type Todo = {
  title: string;
  description: string;
  completed: boolean;
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: "Hey",
  description: "foobar",
  completed: false,
}

// Пример использования:
todo.title = "Hello"        // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
todo.completed = true       // OK


//**Задание 4. DeepReadonly
// Что нужно сделать:
// -Реализуйте утилитарный тип DeepReadonly<T>, который делает readonly все поля типа T, а также поля всех его вложенных объектов.
// -Подразумеваем, что мы работаем только с объектами. Массивы, функции, классы и так далее не учитываются в решении.
// type X = {
// x: {
// a: 1
// b: 'hi'
// z: string
// }
// y: string
// }

// type Expected = {
// readonly x: {
// readonly a: 1
// readonly b: 'hi'
// }
// readonly y: 'hey'
// }

// type Todo = DeepReadonly<X> // should be same as Expected

// const test: Todo = {
// x: {
// a: 1,
// b: 'hi',
// z: 'try change me too',
// },
// y: 'try change me',
// };

// test.y = 'changed'; // Error
// test.x.z = 'changed'; // Error

// Советы и рекомендации:
// Для выполнения задания рекомендуем освежить в памяти такие операторы, как extends и keyof, а также такие утилитарные типы, как Omit.

type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

type X = {
  x: {
    a: 1;
    b: 'hi';
    z: string;
  };
  y: string;
};

type Expected = {
  readonly x: {
    readonly a: 1;
    readonly b: 'hi';
    readonly z: string;
  };
  readonly y: string;
};

type Todo3 = DeepReadonly<X>;

const test: Todo3 = {
  x: {
    a: 1,
    b: 'hi',
    z: 'try change me too',
  },
  y: 'try change me',
};



