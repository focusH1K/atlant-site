const { calculatePower } = require("./test1");   

test('sum test', () => {
 expect(2+5).toBe(7)
});

test('test calculate power', () => {
 expect(calculatePower(5,2)).toBe(25);
});

test('Проверка длины массива', () => {
  const array = [1, 2, 3, 4, 5];
  expect(array.length).toBe(5);
});

test('Проверка типа данных', () => {
  const value = 'hello';
  expect(typeof value).toBe('string');
});

test('Проверка вызова функции', () => {
  const mockFn = jest.fn();
  mockFn();
  expect(mockFn).toHaveBeenCalled();
});

test('Проверка объекта на содержание свойств', () => {
  const obj = { name: 'John', age: 30, city: 'New York' };
  expect(obj).toHaveProperty('name');
  expect(obj).toHaveProperty('age', 30);
});

test('Проверка сравнения чисел с плавающей точкой', () => {
  const value = 0.1 + 0.2;
  expect(value).toBeCloseTo(0.3);
});
