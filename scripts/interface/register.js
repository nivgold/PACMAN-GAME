var newUser;

function btn_regist() {
	getRegistFields();
	if (form_validation()) {
		isConnected = true;
		addNewUser();
		connect(newUser.username, newUser.pass);
		showMenu();
	}
}

function addNewUser() {
	this.users.push(newUser.username);
	this.passwords.push(newUser.pass);
	this.emails.push(newUser.email);
	this.birthdays.push(newUser.bday);
	this.fnames.push(newUser.fname);
	this.lnames.push(newUser.lname);
	updateLocalStorage();
}

function getRegistFields() {
	this.newUser = {
		username: $('#register_username').val(),
		pass: $('#register_password').val(),
		fname: $('#register_fname').val(),
		lname: $('#register_lname').val(),
		email: $('#register_email').val(),
		bday: $('#register_bday').val()
	};
}

function form_validation() {
	let isValid = true;

	let username = newUser.username;
	let pass = newUser.pass;
	let fname = newUser.fname;
	let lname = newUser.lname;
	let email = newUser.email;
	let bday = newUser.bday;

	$(".error").remove();

	if (username.length < 1) {
		$('#register_username').after('<span class="error">This field is required</span>');
		isValid = false;
	}
	else if (isUserExist(username)) {
		$('#register_username').after('<span class="error">Username already exist.</span>');
		isValid = false;
	}
	if (pass.length < 6) {
		$('#register_password').after('<span class="error">Password is too short</span>');
		isValid = false;
	} else if (!isContainLetter(pass)) {
		$('#register_password').after('<span class="error">Password must contain a character</span>');
		isValid = false;
	} else if (!isContainNumber(pass)) {
		$('#register_password').after('<span class="error">Password must contain a number</span>');
		isValid = false;
	}
	if (fname.length < 1) {
		$('#register_fname').after('<span class="error">This field is required</span>');
		isValid = false;
	} else if (isContainNumber(fname)) {
		$('#register_fname').after('<span class="error">name must contain letters only</span>');
		isValid = false;
	}
	if (lname.length < 1) {
		$('#register_lname').after('<span class="error">This field is required</span>');
		isValid = false;
	} else if (isContainNumber(lname)) {
		$('#register_lname').after('<span class="error">name must contain letters only</span>');
		isValid = false;
	}
	if (email.length < 1) {
		$('#register_email').after('<span class="error">This field is required</span>');
		isValid = false;
	} else {
		var regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var validEmail = regEx.test(email);
		if (!validEmail) {
			$('#register_email').after('<span class="error">Enter a valid email</span>');
			isValid = false;
		}
	}
	if (bday.length < 1) {
		$('#register_bday').after('<span class="error">This field is required</span>');
		isValid = false;
	}
	return isValid;
}

function isContainLetter(pass) {
	for (var i = 0; i < pass.length; i++) {
		let char = pass.charAt(i);
		if (char.toUpperCase() != char.toLowerCase())
			return true;
	}
	return false;
}

function isContainNumber(pass) {
	for (var i = 0; i < pass.length; i++) {
		let char = pass.charAt(i);
		if ((char >= '0' && char <= '9'))
			return true;
	}
	return false;
}

$( function() {
    $( "#register_bday" ).datepicker();
  } );

  $( function() {
    $( "#profile_bday" ).datepicker();
  } );