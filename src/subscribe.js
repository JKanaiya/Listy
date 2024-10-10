const Updates = (function () {
  function getLists() {
    let lists = JSON.parse(localStorage.getItem(`lists`));
    return lists;
  }
  return {
    getLists,
  };
})();
export default Updates;
