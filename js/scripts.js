//Business Login for AddressBook ------------------------------//
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
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
function Contact(firstName, lastName) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.addressList = []
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Contact.prototype.addAddress = function(address) {
  this.addressList.push(address);
}

//Business Logic for Addresses
function Address(type, email, phone, street, city, zip) {
  this.type = type,
  this.email = email,
  this.phoneNumber = phone,
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

function showContact(contactId) { //  continue here .... need to add <div class="address-displY" inside a forEach Loop for each address in a contact use buildContactType() to insert fields into div
  var contact = addressBook.findContact(contactId);
  $("#show-contacts").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);

  for(i=0;i<contact.addressList.length;i++){

  }
  // $(".phone-number").html(contact.phoneNumber);
  // $(".email").html(contact.email);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}

function buildContactType(address){
  var addressType = "<p>Contact Type: " + address.type + "</p>";
  var addressPhoneNumber = "<p>Phone Number: " + address.phoneNumber + "</p>";
  var addressEmail = "<p>Email: " + address.email + "</p>";
  var addressStreet = "<p>Street: " + address.street + "</p>";
  var addressCity = "<p>City: " + address.city + "</p>";
  var addressZip = "<p>Zip Code: " + address.zip + "</p>";
  return addressType + addressPhoneNumber + addressEmail + addressStreet + addressCity + addressZip;
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
    var inputtedType = $("#new-address-type").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmail = $("input#new-email").val();
    var inputtedStreet = $("input#new-street").val();
    var inputtedCity = $("input#new-city").val();
    var inputtedZip = $("input#new-zip").val();
    //clear input fields
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email").val("");
    $("#input#new-address-type").val("");
    $("input#new-street").val("");
    $("input#new-city").val("");
    $("input#new-zip").val("");

    var newContact = new Contact(inputtedFirstName, inputtedLastName);
    addressBook.addContact(newContact);
    var newAddress = new Address(inputtedType, inputtedEmail, inputtedPhoneNumber, inputtedStreet, inputtedCity, inputtedZip);
    newContact.addAddress(newAddress);
    console.log(addressBook);
    displayContactDetails(addressBook);
  })
  //end form submit -------------------------------------------------//
// end document.ready() --------------------------------------------//
})
