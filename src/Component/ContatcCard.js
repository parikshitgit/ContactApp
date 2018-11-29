import React from 'react'
import ContactList from "./ContactList";

class Contactcard extends React.Component{

    constructor(props){
        super(props);

    }

    DeleteContatct(e,Name){
        e.preventDefault();
        var delitem = Name;
        var delurl = 'please paste correct url here" +/TemoPOCLUP/v1/ContactOperation?Name='+delitem;
        alert('Are you sure to remove : ' + delitem );
        var del =fetch(delurl,{method:'DELETE'}).then(res=>res.json()).then(this.props.formtable());


    }

    UpdateContact(e,Contact){
        e.preventDefault();
        document.getElementById("name_in").value = Contact.Name ;
        document.getElementById("email_in").value = Contact.Email ;
        document.getElementById("phone_in").value = Contact.Phone ;
        document.getElementById("Address_in").value = Contact.Address ;
    }
    handleSubmit(e) {
        e.preventDefault();

    }
    render(){

        var Address = 'New York';

        if(this.props.contact != null) {

            Address = this.props.contact.Address;

        }


        var mapurl = 'https://maps.googleapis.com/maps/api/staticmap?center='+Address+'&size=200x100&maptype=roadmap&key=AIzaSyC9ZjA8NaYVDOsktzF7aeo4uHcTuh3oP4M';

        if(this.props.contact != null) {
            return (


                <div className="form-container">
                    <div>Name: {this.props.contact.Name}</div>
                    <div>Phone: {this.props.contact.Phone}</div>
                    <div>Email: {this.props.contact.Email}</div>
                    <div>Address: {this.props.contact.Address}</div>
                    <div><img src = {mapurl} /></div>
                    <button onClick={(e)=>this.DeleteContatct(e,this.props.contact.Name)} className="Contact-card-button">Delete</button>
                </div>


            );
        }


        if(this.props.contact == null) {
            return (


                <div className="well">

                </div>


            );
        }

    }



}
export default Contactcard
