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
    Promise.all(urls.map(url => fetch(url)
			.then(res => res.json()))
    ).then(data => console.log('parallel:', data));
  }
  parallel();

  function sequence() {
    const sequenceArr = [];

    urls.reduce(
      (acc, element) => acc.then(
        () => fetch(element)
          .then(res => res.json())
          .then(data => sequenceArr.push(data))
      ), Promise.resolve()
    ).then(() => console.log('sequence:', sequenceArr));

    
		
  }
  sequence();
}
getArrayFromURL();

