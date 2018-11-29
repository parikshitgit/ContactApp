import React from 'react';
import './Contacts.css';
class ContactHeader extends React.Component{

   constructor(props){

       super(props);
   }

    render(){

        return(

            <h1 className="title">{this.props.Headertext}</h1>

        );

    }

}
export default ContactHeader
