// 8
const getUsers = url => fetch(url);

async function foo(url) {
  try {
    const response = await getUsers(url);
    const user = await response.json();
    console.log(user[0]);
  } catch (err) {
    console.log('Error!', err);
  }
}

foo('https://jsonplaceholder.typicode.com/users');
foo('ht://jsonplaceholder.typicode.com/users');
