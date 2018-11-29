import React from 'react';
import ContactHeader from './ContactHeader'
import ContactList from './ContactList'
import CreateContact from './CreateContact'

class ContactDisplay extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: {
                ContatcAdded: null,
                ReloadList : 'false',
                displayAdd:'hidden',
                displayList:'block'


            }
        }

    }

    displayAddContact(e){
        e.preventDefault();
      var tempstate = this.state;
      this.setState({

          data:{
              ContatcAdded: tempstate.data.ContatcAdded,
              ReloadList: tempstate.data.ReloadList,
              displayList:'hidden',
              displayAdd: 'block',
              url : 'Please paste correct url here'

          },


      });
    }

    displayContactList(e){
        e.preventDefault();
        var tempstate = this.state;
        this.setState({

            data:{
                ContatcAdded: tempstate.data.ContatcAdded,
                ReloadList: tempstate.data.ReloadList,
                displayList:'block',
                displayAdd: 'hidden',


            },


        });
    }
    handleSubmit(e) {
        e.preventDefault();
        var contact = {Name:this.refs.name.value.trim(), Email :this.refs.email.value.trim(),Phone: this.refs.phone.value.trim(),Address:this.refs.address.value.trim()};

        var url = this.state.data.url + '/TemoPOCLUP/v1/ContactOperation'
        var payload = JSON.stringify(contact);
        var AddedContact = fetch(url,{method:'PUT',body:payload}).then(res=> res.json()).then(this.setState({

            data:
                {
                    ReloadList: 'true',
                }
        })
        );
        console.log(JSON.stringify(AddedContact));



    }
    render(){


        return(
            <div className="well">

             <div className="sidenav">
                 <a href="#" ><button onClick={(e)=>this.displayAddContact(e)} className="myButton">Add Contact</button></a>
                 <a href="#" ><button onClick={(e)=>this.displayContactList(e)} className="myButton">Contact List</button></a>


             </div>
            <div className="main">

                <div id="AddContact" className={this.state.data.displayAdd}>
                <h3 className="text-center">
                    <strong>Add Contact</strong>
                </h3>
                <hr/>
                <div id = "Add Contact">
                <form onSubmit={this.handleSubmit.bind(this)} className="form-container">
                    <div className="form-group">
                        <input id = "name_in"type="text" ref="name" className="form-field" placeholder="Add name" />
                    </div>
                    <div className="form-group">
                        <input id = "phone_in" type="text" ref="phone" className="form-field" placeholder="Add phone" />
                    </div>
                    <div className="form-group">
                        <input id = "email_in"type="text" ref="email" className="form-field" placeholder="Add email" />
                    </div>
                    <div className="form-group">
                        <textarea id = "Address_in"type="text" ref="address" className="form-field" placeholder="Enter Address" />
                    </div>
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
                </div>
                </div>
                <div className={this.state.data.displayList}><ContactList reload = {this.state.data.ReloadList} displayadd = {this.displayAddContact.bind(this)}/></div>
            </div>
            </div>


        );

    }



}
export default ContactDisplay
