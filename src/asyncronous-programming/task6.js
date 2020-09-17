// 6
function getResolvedPromise(value) {
  return new Promise(resolve => resolve(value));
}

getResolvedPromise(500)
  .then(value => {
    if (value > 300) {throw new Error('Ошибка')};
  })
  .catch(err => console.log(err.message))
  .finally(() => console.log('This is Finally!'));
