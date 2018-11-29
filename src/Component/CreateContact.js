import React from 'react';

class CreateContact extends React.Component{

    constructor(props){
        super(props);

    }


    handleSubmit(e) {
        e.preventDefault();
        var contact = {name:this.refs.name.value.trim(), email :this.refs.email.value.trim(),phone: this.refs.phone.value.trim()};

        //contact.name=this.refs.name.value.trim();
        //alert(contact.name + contact.phone +contact.email );
        //AppActions.saveContact(contact);

    }
    render(){
        return(
            <div className="well">
                <h3 className="text-center">
                    <strong>Add Contact</strong>
                </h3>
                <hr/>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <input type="text" ref="name" className="form-control" placeholder="Add name" />
                    </div>
                    <div className="form-group">
                        <input type="text" ref="phone" className="form-control" placeholder="Add phone" />
                    </div>
                    <div className="form-group">
                        <input type="text" ref="email" className="form-control" placeholder="Add email" />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>


        );

    }



}
export default CreateContact











