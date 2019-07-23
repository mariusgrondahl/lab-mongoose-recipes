document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

let deleteButton = document.getElementById("delete");

deleteButton.addEventListener("click", function(){
  alert("Are you sure you want to delete?")

});