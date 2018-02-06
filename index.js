const addBtn = document.querySelector('.add');
const submitBtn = document.querySelector('[type="submit"]');
const ageInput = document.querySelector('[name="age"]');
const relationshipInput = document.querySelector('[name="rel"]');
const smokerCheckbox = document.querySelector('[name="smoker"]');
const householdList = document.querySelector('.household')
const debugElement = document.querySelector('.debug');

const cancelEditBtn = document.createElement('button');
cancelEditBtn.style.display = 'none';
cancelEditBtn.innerHTML = 'Cancel';
cancelEditBtn.setAttribute('onclick', 'cancelEdit(event)');
addBtn.insertAdjacentElement('afterend', cancelEditBtn);

const updateBtn = document.createElement('button');
updateBtn.style.display = 'none';
updateBtn.innerHTML = 'Update';
updateBtn.setAttribute('onclick', 'handleUpdate(event)');
addBtn.insertAdjacentElement('afterend', updateBtn);


const householdMembers = [];
let indexToEdit = 0;


const renderHouseholdMembers = function () {
  let displayList = '';
  householdMembers.forEach(function (member, idx) {
    displayList += `
      <li index=${idx}>
        <p>Age: ${member.age}</p>
        <p>Relationship: ${member.relationship}</p>
        <p>Smoker: ${member.smoker}</p>
        <button onclick="handleEdit(event)">Edit</button>
        <button onclick="handleRemove(event)">Remove</button>
      </li>
    `
  });
  return displayList;
}

const resetForm = function() {
  ageInput.value = '';
  relationshipInput.selectedIndex = 0;
  smokerCheckbox.checked = false;
}

const resetFormBtns = function() {
  addBtn.style.display = 'inherit';
  updateBtn.style.display = 'none';
  cancelEditBtn.style.display = 'none';
}

const addHouseholdMember = function(event) {
  event.preventDefault();
  if (!ageInput.value || ageInput.value <= 0){
    window.alert('Valid age input is required');
  } else if (!relationshipInput.value) {
    window.alert('Relationship selection is required');
  } else {
    householdMembers.push({
      age: ageInput.value,
      relationship: relationshipInput.value,
      smoker: smokerCheckbox.checked
    });
    resetForm();
  }
  householdList.innerHTML = renderHouseholdMembers();
}

const handleSubmit = function(event) {
  event.preventDefault();
  debugElement.innerHTML = JSON.stringify(householdMembers);
  debugElement.style.display = 'inherit';
}

const handleRemove = function(event) {
  const idx = Number(event.target.parentElement.getAttribute('index'));
  householdMembers.splice(idx, 1);
  householdList.innerHTML = renderHouseholdMembers();
}

const handleEdit = function(event) {
  indexToEdit = Number(event.target.parentElement.getAttribute('index'));
  ageInput.value = householdMembers[indexToEdit].age;
  relationshipInput.value = householdMembers[indexToEdit].relationship;
  smokerCheckbox.checked = householdMembers[indexToEdit].smoker;
  addBtn.style.display = 'none';
  updateBtn.style.display = 'inherit';
  cancelEditBtn.style.display = 'inherit';
}

const handleUpdate = function(event) {
  event.preventDefault();
  householdMembers[indexToEdit].age = ageInput.value;
  householdMembers[indexToEdit].relationship = relationshipInput.value;
  householdMembers[indexToEdit].smoker = smokerCheckbox.checked;
  householdList.innerHTML = renderHouseholdMembers();
  resetForm();
  resetFormBtns();
}

const cancelEdit = function(event) {
  event.preventDefault();
  resetForm();
  resetFormBtns();
}


addBtn.addEventListener('click', addHouseholdMember);
submitBtn.addEventListener('click', handleSubmit);
