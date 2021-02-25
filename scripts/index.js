//access to the ul element
const ulElem = document.querySelector('.guides')

function renderGuide(data) {
  if(data.length){
    let html =''

    data.forEach(element => {
        console.log(element.data())
        let guide = element.data()

    const li = `
    <li>
    <div class="collapsible-header grey lighten-4">${guide.title}</div>
    <div class="collapsible-body white">${guide.content}</div>
    </li>
    `
    html += li

    })

    ulElem.innerHTML = html
  }else{
    ulElem.innerHTML =`<h5 class="center-align">You have logged out, <b>log in </b>to view guides</h5>`
  }
    

}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});