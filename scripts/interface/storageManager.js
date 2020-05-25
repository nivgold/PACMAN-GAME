var users;
var passwords;
var emails;
var birthdays;
var fnames;
var lnames;

function getStorage(obj) {
    if (localStorage.getItem(obj)) {
        let retrievedData = localStorage.getItem(obj);
        let arr = JSON.parse(retrievedData);
        return arr;
    }
    return false;
}

function buildUsersList() {
    if (localStorage.getItem('users')) {
        this.users = getStorage("users");
        this.passwords = getStorage("passwords");
        this.emails = getStorage("emails");
        this.fnames = getStorage("fnames");
        this.lnames = getStorage("lnames");
        this.birthdays = getStorage("birthdays");
    } else {
        this.users = ['p'];
        this.passwords = ['p'];
        this.emails = ['inbalros@post.bgu.ac.il'];
        this.fnames = ['Inbal'];
        this.lnames = ['Roshanski'];
        this.birthdays = [''];
        updateLocalStorage();
    }
}

function isUserExist(username) {
    for (var i = 0; i < this.users.length; i++) {
        if (username == this.users[i])
            return true;
    }
    return false;
}

function updateLocalStorage() {
    localStorage.clear();
    localStorage.setItem("users", JSON.stringify(this.users));
    localStorage.setItem("passwords", JSON.stringify(this.passwords));
    localStorage.setItem("emails", JSON.stringify(this.emails));
    localStorage.setItem("birthdays", JSON.stringify(this.birthdays));
    localStorage.setItem("fnames", JSON.stringify(this.fnames));
    localStorage.setItem("lnames", JSON.stringify(this.lnames));
}

function areCorrectUsersInfoSaved() {
    let users1 = localStorage.getItem('users');
    let passwords1 = localStorage.getItem('passwords');
    let fnames1 = localStorage.getItem('fnames');
    let lnames1 = localStorage.getItem('lnames');
    let birthdays1 = localStorage.getItem('birthdays');
    let emails1 = localStorage.getItem('emails');

    if (users1 && passwords1 && fnames1 && lnames1 && birthdays1 && emails1) {
        let users2 = getStorage('users');
        let passwords2 = getStorage('passwords');
        alert(users2[0]);
        if (users2[0] == 'p' && passwords2[0] == 'p')
            return true;
    }
    return false;
}