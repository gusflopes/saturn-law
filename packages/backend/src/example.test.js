function soma(a, b) {
  return a + b;
}

test('function soma should work as 4+5 = 9', () => {
  const result = soma(4, 5);

  expect(result).toBe(9);
});
