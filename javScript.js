

/***********************************TUTOR PAGE*****************************************************************/
function sort() {
	        /*Here i am getting by name of select */
            var selectElement = document.getElementsByName("arrange")[0];
			
			
			/*here we go selected option user chooses*/
            var selectedOption = selectElement.options[selectElement.selectedIndex].value;

            /*To get the whole tutor list div*/
            var tutorList = document.querySelector('.tutorList');
			
			/*to get  indivual div for the tutor information and get all elements inside*/
            var tutors = document.querySelectorAll('.tutor');

                   /*we are making array*/
            var sortedTutors = Array.from(tutors).sort(function(a, b) {
				
				/*Here we put lower case for sensitivity and we choose h2 element for the name of tutor*/
                var tutorA = a.querySelector('h2').textContent.toLowerCase();
                var tutorB = b.querySelector('h2').textContent.toLowerCase();
                  
				/*if statemnt if equal this choice sort like that and vice versa and localcompare compares strings*/
                if (selectedOption === "alphabetical(a-z)") {
                    return tutorA.localeCompare(tutorB);
                } else if (selectedOption === "alphabetical(z-a)") {
                    return tutorB.localeCompare(tutorA);
                } else {
                    return 0; // No sorting
                }
            });

                
            tutorList.innerHTML = '';
            sortedTutors.forEach(function(tutor) {
                tutorList.appendChild(tutor);
            });
        }
		
		
/**************************************************REGISTER PAGE*******************************************************/

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('regform');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // to Prevent the form from submitting

    // Validate form inputs
    if (!validateForm()) {
      return;
    }

    // if form is valid no incorect input it will continue to store child name 
    storeChildData();
    alert('Child registered successfully!');
	
	//to print information
	 printChildInfo();

    
  });
  
  ////we are using .trim to trip and empty spaces user might create when entering 
  function validateForm() {
    const kidFirstName = form.querySelector('[name="kfname"]').value.trim();
    const kidLastName = form.querySelector('[name="klname"]').value.trim();
    const dob = new Date(form.querySelector('[name="birth"]').value);
    const gender = form.querySelector('[name="kid-gender"]').value;
    const phone1 = form.querySelector('[name="num1"]').value.trim();
    const phone2 = form.querySelector('[name="num2"]').value.trim();
    const ParentFirstName = form.querySelector('[name="pname"]').value.trim();
    const ParentLastName = form.querySelector('[name="plast"]').value.trim();
	//2 variable to print all thats incorrect to user and keep track of how many to use in if statemnt down
	let text="You have the follwing incorrect:  \n";
	let incorrect="0";


    /*  //check if any field is empty first i kept it as a comment since in my code all fields are requiered so this wont be neccasry
    if (kidFirstName === '' || kidLastName === '' || isNaN(dob.getTime()) || gender === '' || phone1 === '' || phone2 === '') {
      alert('Please make sure to fill in all the fields.');
      return false;
    }*/
	


    // Validate kid first name
    if (!/^[A-Za-z]+$/.test(kidFirstName)) {
       text=text+ "Invalid start of number in kid first name! \n ";
	   incorrect=incorrect+"1";
    }
	
	
	    // Validate kid last  name
    if ( !/^[A-Za-z]+$/.test(kidLastName)) {
       text=text+ "Invalid start of number in kid last name! \n ";
	   incorrect=incorrect+"1";
    }


    // Validate phone 1
    if (!/^\d{10}$/.test(phone1) ) {
       text=text+ "Phone number 1 is invalid , you must enter a 10-digit number!  \n";
	   incorrect=incorrect+"1";
    }
	
	
	    // Validate phone 2
    if (!/^\d{10}$/.test(phone2)) {
       text=text+ " Phone number 2 is invalid, you must enter a 10-digit number! \n ";
	   incorrect=incorrect+"1";
    }

	
    // Validate date of birth (DOB should not be after 2017)
    const currentYear = new Date().getFullYear();
    if (dob.getFullYear() > currentYear - 6) {
       text=text+ "Children younger than 6 years old are not accepted.  \n";
	   incorrect=incorrect+"1";
    }
	
	
	    // Validate parent first name
    if (!/^[A-Za-z]+$/.test(ParentFirstName)) {
       text=text+ "Invalid start of number in parent first name! \n ";
	   incorrect=incorrect+"1";
    }
	
	
	    // Validate parent last  name
    if (!/^[A-Za-z]+$/.test(ParentLastName)) {
       text=text+ "Invalid start of number in parent last name! \n ";
	   incorrect=incorrect+"1";
    }
	

      if(incorrect>"0") 
	  { alert(text); return false;} 
      else  return true;
   
   
  }
  
function storeChildData() {
  const kidFirstName = form.querySelector('[name="kfname"]').value.trim();
  const kidLastName = form.querySelector('[name="klname"]').value.trim();
  const dob = form.querySelector('[name="birth"]').value;
  const gender = form.querySelector('[name="kid-gender"]').value;
  const kidPicture = form.querySelector('[name="kid-picture"]').files[0];
  const email = form.querySelector('[name="em"]').value.trim();
  const phone1 = form.querySelector('[name="num1"]').value.trim();

  // Retrieve existing child name from local storage
  let childName = JSON.parse(localStorage.getItem('childName')) || [];

  // Add the current child's name to the array
  const currentChildName = `${kidFirstName} ${kidLastName}`;
  childName.push(currentChildName);

  // Save the updated array back to local storage
  localStorage.setItem('childName', JSON.stringify(childName));

  // Create a div to hold the child's information
  const childInfoDiv = document.createElement('div');
  childInfoDiv.classList.add('child-info');

  // Display the uploaded picture
  if (kidPicture) {
    const pictureElement = document.createElement('img');
    pictureElement.src = URL.createObjectURL(kidPicture);
    pictureElement.alt = 'Child Picture';
    childInfoDiv.appendChild(pictureElement);
  }

  // Display child's name
  const nameParagraph = document.createElement('p');
  nameParagraph.textContent = `Child's Name: ${kidFirstName} ${kidLastName}`;
  childInfoDiv.appendChild(nameParagraph);

  // Display date of birth
  const dobParagraph = document.createElement('p');
  dobParagraph.textContent = `Date of Birth: ${dob}`;
  childInfoDiv.appendChild(dobParagraph);

  // Display gender
  const genderParagraph = document.createElement('p');
  genderParagraph.textContent = `Gender: ${gender}`;
  childInfoDiv.appendChild(genderParagraph);

  // Display email
  const emailParagraph = document.createElement('p');
  emailParagraph.textContent = `Email: ${email}`;
  childInfoDiv.appendChild(emailParagraph);

  // Display phone number 1 which is main
  const phone1Paragraph = document.createElement('p');
  phone1Paragraph.textContent = `Main phone Number : ${phone1}`;
  childInfoDiv.appendChild(phone1Paragraph);

  // Append the child's information to the container
  const childInfoContainer = document.getElementById('childInfoContainer');
  childInfoContainer.innerHTML = ''; // Clear previous content
  childInfoContainer.appendChild(childInfoDiv);
}


    
  
     function printChildInfo() {
     // we are creating a new window to hold the content to be printed
     const printWindow = window.open('', '_blank');
     const childInfoContainer = document.getElementById('childInfoContainer').cloneNode(true);

     // to find  the image element in the cloned container 
     const pictureElement = childInfoContainer.querySelector('img');

     if (pictureElement) {
     pictureElement.onload = function () {
     printWindow.document.body.appendChild(childInfoContainer);

      // print
      printWindow.print();

      // Close the new window if opened
      if (printWindow) {
        printWindow.close();
         }
       };
      } else {
     //if no  image, just print the rest 
     printWindow.document.body.appendChild(childInfoContainer);
     printWindow.print();
     if (printWindow) {
      printWindow.close();
             }
          }
         }
     

  
});

/*************************************************************************************************************************/

