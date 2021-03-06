//Business Login for AddressBook ------------------------------//
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function (contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i<this.contacts.length; i++) {
    if(this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i < this.contacts.length; i++){
    if(this.contacts[i]) {
      if (this.contacts[i].id == id){
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

//Business Logic for Contacts --------------------------------------//
function Contact(firstName, lastName, phoneNumber, email) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.email = email
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

//Business Logic for Addresses
function Address(type, email, street, city, zip) {
  this.type = type,
  this.email = email,
  this.street = street,
  this.city = city,
  this.zip = zip
}

//User Interface Logic --------------------------------------------//
var addressBook = new AddressBook();

function displayContactDetails(addressBooktoDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBooktoDisplay.contacts.forEach(function(contact){
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contacts").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email").html(contact.email);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}

function attachContactListeners(){
  $("#contacts").on("click", "li", function(){
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function(){
    addressBook.deleteContact(this.id);
    $("#show-contacts").hide();
    displayContactDetails(addressBook);
  });
};

//document ready function
$(document).ready(function(){
  attachContactListeners();

  //form submit ---------------------------------------------------//
  $("form#new-contact").submit(function(event){
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmail = $("input#new-email").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email").val("");

    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
  //end form submit -------------------------------------------------//
// end document.ready() --------------------------------------------//
})
