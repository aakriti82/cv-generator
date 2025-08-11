function printpdf() {
    var content = document.getElementById("resume");
  
    const allButtons = document.querySelectorAll("#print button");
    allButtons.forEach(button => {
        button.classList.add("none");
    });
    let allInputCheckboxes = document.querySelectorAll(".input-checkbox");
    allInputCheckboxes.forEach(input => {
        input.classList.add("none");
    })
  
  allButtons.forEach(button => {
      button.classList.remove("none");
  })
  allInputCheckboxes.forEach(input => {
      input.classList.remove("none");
  })
  
    html2pdf(content, {
        html2canvas: { scale: 1, logging: true, dpi: 500 }
    });
  }
  
  function addedu() {
    const head = document.createElement('div');
    document.getElementById("education").appendChild(head);
    head.innerHTML = ('<div class="edublock"><span><input type="checkbox" class="input-checkbox"></span><span class="education-head" contenteditable="true">YOUR DEGREE</span><div ><span contenteditable="true">Institute name</span> - <span contenteditable="true">Passing Year</span></div></div>');
    saveresume();
  }
  function remedu(event) {
    let val = 0;
    let empty = true;
    const allInputCheckboxes = event.target.parentElement.getElementsByClassName("input-checkbox");
    const array = Array.from(allInputCheckboxes);
    if (array.length === 0) {
        alert("No fields are present to be deleted!")
    }
    else {
        console.log(array);
        array.forEach(element => {
            if (element.checked === true) {
                val = 1;
                element.parentElement.parentElement.remove();
            }
        })
        if (val === 0) alert("Please select the checkboxes to delete the required field!")
    }
    saveresume();
  }
  
  
 // Add a new skill input block dynamically
function addSkill() {
  const skillsContainer = document.getElementById("skills");
  
  // Create skill container div
  const skillDiv = document.createElement("div");
  skillDiv.className = "skill";

  // Create checkbox span
  const checkboxSpan = document.createElement("span");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "input-checkbox";
  checkboxSpan.appendChild(checkbox);

  // Create icon span
  const iconSpan = document.createElement("span");
  iconSpan.innerHTML = '<i class="fas fa-chevron-circle-right"></i>';

  // Create editable span
  const editableSpan = document.createElement("span");
  editableSpan.contentEditable = "true";
  editableSpan.textContent = "write your skill here";
  editableSpan.setAttribute("aria-label", "Skill input");
  editableSpan.setAttribute("role", "textbox");
  editableSpan.className = "skill-input";

  // Append all spans to skill div
  skillDiv.appendChild(checkboxSpan);
  skillDiv.appendChild(iconSpan);
  skillDiv.appendChild(editableSpan);

  // Append skill div to container
  skillsContainer.appendChild(skillDiv);

  // Save resume (your existing function)
  saveResume();
}

// Remove checked skill inputs
function remSkill() {
  const skillsContainer = document.getElementById("skills");
  const checkboxes = skillsContainer.querySelectorAll(".input-checkbox");

  if (checkboxes.length === 0) {
    alert("No skills to delete!");
    return;
  }

  // Convert NodeList to Array for easier filtering
  const checkedBoxes = Array.from(checkboxes).filter(cb => cb.checked);

  if (checkedBoxes.length === 0) {
    alert("Please select at least one skill to delete.");
    return;
  }

  checkedBoxes.forEach(cb => {
    const skillDiv = cb.closest(".skill");
    if (skillDiv) skillDiv.remove();
  });

  // Save resume after removal
  saveResume();
}

  
  
  function addLang() {
    const head = document.createElement('div');
    document.getElementById("languages").appendChild(head);
    head.innerHTML = ('<div class="language"><span><input type="checkbox" class="input-checkbox"></span><span contenteditable="true">LANGNAME</span> - <span contenteditable="true">level u know</span></div>');
    saveresume();
  }
  function remLang(event) {
    let val = 0;
    const allInputCheckboxes = event.target.parentElement.getElementsByClassName("input-checkbox");
    const array = Array.from(allInputCheckboxes);
    if (array.length === 0) {
        alert("No fields are present to be deleted!")
    }
    else {
        console.log(array);
        array.forEach(element => {
            if (element.checked === true) {
                val = 1;
                element.parentElement.parentElement.remove();
            }
        })
        if (val === 0) alert("Please select the checkboxes to delete the required field!")
    }
    saveresume();
  }
  
  
  function addAch() {
    const head = document.createElement('div');
    document.getElementById("achievement").appendChild(head);
    head.innerHTML = ('<div class="achieve" ><span><input type="checkbox" class="input-checkbox"></span><span contenteditable="true">Write your achievement</span></div>');
    saveresume();
  }
  function remAch(event) {
    let val = 0;
    const allInputCheckboxes = event.target.parentElement.getElementsByClassName("input-checkbox");
    const array = Array.from(allInputCheckboxes);
    if (array.length === 0) {
        alert("No fields are present to be deleted!")
    }
    else {
        console.log(array);
        array.forEach(element => {
            if (element.checked === true) {
                val = 1;
                element.parentElement.parentElement.remove();
            }
        })
        if (val === 0) alert("Please select the checkboxes to delete the required field!")
    }
    saveresume();
  }
  
  
  function addInt() {
    const head = document.createElement('div');
    document.getElementById("interest").appendChild(head);
    head.innerHTML = ('<div class="achieve" ><span><input type="checkbox" class="input-checkbox"></span><span contenteditable="true">Write interest</span></div>');
    saveresume();
  }
  function remInt(event) {
    let val = 0;
    const allInputCheckboxes = event.target.parentElement.getElementsByClassName("input-checkbox");
    const array = Array.from(allInputCheckboxes);
    if (array.length === 0) {
        alert("No fields are present to be deleted!")
    }
    else {
        array.forEach(element => {
            if (element.checked === true) {
                val = 1;
                element.parentElement.parentElement.remove();
            }
        })
        if (val === 0) alert("Please select the checkboxes to delete the required field!")
    }
    saveresume();
  }
  
  let maxNewSection = 1;
  function addsec() {
    if (maxNewSection < 2) {
        const head = document.createElement('div');
        document.getElementById("newsec").appendChild(head);
        if (maxNewSection === 0) {
            head.innerHTML = ('<div><span><input type="checkbox" class="input-checkbox"></span><span class="title" contenteditable="true">NEW SECTION</span><br><br><div contenteditable="true">This is the description part of your new section. Try to stay within limit and write something which has less than 400 characters. The spaces and symbols you use will also be included so use them for an indentation effect.</div></div>');
        }
        else {
            head.innerHTML = ('<div><br><br><span><input type="checkbox" class="input-checkbox"></span><span class="title" contenteditable="true">NEW SECTION</span><br><br><div contenteditable="true">This is the description part of your new section. Try to stay within limit and write something which has less than 400 characters. The spaces and symbols you use will also be included so use them for an indentation effect.</div></div>');
        }
  
        maxNewSection = maxNewSection + 1;
    }
    else {
        alert("Atmost 2 NEW SECTION can be added!")
  
    }
    saveresume();
  }
  function remsec(event) {
    let val = 0;
    const allInputCheckboxes = event.target.parentElement.getElementsByClassName("input-checkbox");
    const array = Array.from(allInputCheckboxes);
    if (array.length === 0) {
        alert("No fields are present to be deleted!")
    }
    else {
        console.log(array);
        array.forEach(element => {
            if (element.checked === true) {
                val = 1;
                maxNewSection = maxNewSection - 1;
                element.parentElement.parentElement.remove();
            }
        })
        if (val === 0) alert("Please select the checkboxes to delete the required field!")
    }
    saveresume();
  }
  
  function saveresume() {
    var sec = document.getElementById("print");
    value1 = sec.innerHTML;
    var info = document.getElementById("custinfo");
    info.value = value1;
  }