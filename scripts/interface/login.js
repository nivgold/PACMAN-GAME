var loginFormFields;
var user;

function connect_btn() {
    getLoginFields();
    $(".error").remove();
    if (connect(loginFormFields.username, loginFormFields.pass)) {
        showMenu();
    } else {
        if (!isUserExist(loginFormFields.username))
            $('#login_username').after('<span class="error">User is not exist.</span>');
        else {
            $('#login_pass').after('<span class="error">Wrong password.</span>');
        }
    }
}

function connect(username, password) {
    if (isAuthentication(username, password)) {
        //get this user info:
        let index = getUserIndex(username);
        this.user = {
            username: JSON.parse(localStorage["users"])[index],
            pass: JSON.parse(localStorage["passwords"])[index],
            email: JSON.parse(localStorage["emails"])[index],
            fname: JSON.parse(localStorage["fnames"])[index],
            lname: JSON.parse(localStorage["lnames"])[index],
            bday: JSON.parse(localStorage["birthdays"])[index]
        };
        setProfileDiv(username);
        isConnected = true;
        return true;
    }
    return false;
}

function disconnect() {
    if(gameIsOn)
        endGame();
    isConnected = false;
    this.user = '';
    showMenu();

    $('#game_grid').css('display', 'none');
    $('.content').css('display', 'block');
}

function getLoginFields() {
    this.loginFormFields = {
        username: $('#login_username').val(),
        pass: $('#login_pass').val()
    };
}

function getUserIndex(username) {
    for (var i = 0; i < users.length; i++) {
        if (users[i] == username)
            return i;
    }
    return 'false';
}

function isAuthentication(username, password) {
    if (isUserExist(username)) {
        let index = getUserIndex(username);
        return password == passwords[index];
    }
    return false;
}

function isUserExist(username) {
    for (var i = 0; i < users.length; i++) {
        if (users[i] == username)
            return true;
    }
    return false;
}

function setProfileDiv(username) {
    let index = getUserIndex(username);
    $('#profile_username').attr('placeholder', this.user.username);
    $('#profile_pass').attr('placeholder', this.user.pass);
    $('#profile_email').attr('placeholder', this.user.email);
    $('#profile_fname').attr('placeholder', this.user.fname);
    $('#profile_lname').attr('placeholder', this.user.lname);
    $('#profile_bday').attr('placeholder', this.user.bday);
}

function updatePass() {
    if (user.username == 'p') {
        alert("you aren't allowed to change this account password");
    } else {
        let pass = $('#profile_pass').val();
        let isValid = true;
        $(".error").remove();
        if (pass.length < 6) {
            $('#profile_pass').after('<span class="error">Password is too short</span>');
            isValid = false;
        } else if (!isContainLetter(pass)) {
            $('#profile_pass').after('<span class="error">Password must contain a character</span>');
            isValid = false;
        } else if (!isContainNumber(pass)) {
            $('#profile_pass').after('<span class="error">Password must contain a number</span>');
            isValid = false;
        }
        if (isValid) {
            for (var i = 0; i < users.length; i++) {
                if (user.username == users[i]) {
                    passwords[i] = pass;
                    updateLocalStorage();
                    alert("password changed");
                }
            }
        }
    }
}