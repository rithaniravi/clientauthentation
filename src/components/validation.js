
function validation(values){
    let errors={};
    //using regex to validate email
    const email_pattern= /^[^\s@]+@[^\s@]+\.[^\s@]+$/
   
    if(!values.email === ""){
        errors.email="email is required"
    }
    // trim email id remove extra space front and back
    else if(!email_pattern.test(values.email)){   
        errors.email = "Invalid emailID"
    }
    return errors;


  
}

export default validation;