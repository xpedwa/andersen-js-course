// 4
function getUsersData() {
  // new JSON links
  fetch('https://next.json-generator.com/api/json/get/V1qhTp9EY')
    .then(res => res.json())
    .then(data => {
      if (data.getUsersData)
        fetch('https://next.json-generator.com/api/json/get/4kop06cEK')
          .then(res2 => res2.json())
          .then(data2 => console.log(data2));
    });
}
getUsersData();
