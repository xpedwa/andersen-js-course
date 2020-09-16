// 9
const asyncBar = async () => 'Some string!';

async function foo() {
  const text = await asyncBar();
  console.log(text);
}

foo();
