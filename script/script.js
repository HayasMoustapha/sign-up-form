const form = document.getElementById("form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");

//  Show input error message
const showErrorMessage = ( input , message ) => {
    input.classList.add("error" , "icon_error");
    const small = document.querySelector("."+input.id)
    small.innerText = message;
}

// Show input success message
const showSuccessMessage = ( input ) => {

    input.className = "form-control success";

}

//  Check email is valid
const isValidEmail = (email) => {

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(",+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email.value.trim()))
    {
        showSuccessMessage(email)

    }
    else{
        email.setAttribute('placeholder' , "email@example/com");
        email.classList.add("placeholder_error" , "icon_error");
        showErrorMessage(email , "Looks like this is not an email");
    }
}

// Get fieldname

const getFieldName = (input) => {
    return input.name;
}

// Check required fields
const checkRequired = (inputArr) => {
    
    inputArr.forEach( (input)=>{ 
        if ( input.value.trim() === "")
        { 
            showErrorMessage(input , `${getFieldName(input)} cannot be empty`)
        }
        else
        {
            showSuccessMessage(input)
        }
    });
}




// Event Listener
form.addEventListener('submit' , function(e) {

    e.preventDefault();

    checkRequired([firstName,lastName,email,password]);
    isValidEmail(email);

});
