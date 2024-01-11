
export const checkValidData = (email,password) => {

    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    //console.log(isPasswordValid);

    if(!isEmailValid) return "Please enter a valid email or phone number.";
    if(!isPasswordValid) return "Please enter a valid password.";

    return "";
}