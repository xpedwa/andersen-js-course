// 5
function getArrayFromURL() {
  // new JSON links
  const urls = [
    'https://next.json-generator.com/api/json/get/Nkgu1JoEF',
    'https://next.json-generator.com/api/json/get/VJenxyjEt',
    'https://next.json-generator.com/api/json/get/4Jt7ZJiVF',
    'https://next.json-generator.com/api/json/get/E137fysEt',
    'https://next.json-generator.com/api/json/get/EkpyMJiEt',
  ];

  function parallel() {
    console.log('parallel:');

    Promise.all(urls.map(url => fetch(url).then(res => res.json()))).then(data =>
      console.log(data)
    );
  }
  parallel();

  function sequence() {
    console.log('sequence:');
    const sequenceArr = [];

    urls.reduce((acc, element) => acc.then(() => fetch(element).then(res => res.json())), Promise.resolve())
	  .then(data => sequenceArr.push(data));
    console.log(sequenceArr);
  }
  sequence();
}
getArrayFromURL();
