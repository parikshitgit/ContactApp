import React from 'react';
import Contactcard from './ContatcCard';
import './Contacts.css';


class ContactList extends React.Component{


    constructor(props){
        var countl ='';
        super(props);
        this.state = {
            data: {
                contactlist: null,
                contatcUI : [],
                Contactcard: null,
                url : 'please paste correct url here'

            }
        }

    }

    UpdateContact(e,Contact){
        e.preventDefault();
        document.getElementById("name_in").value = Contact.Name ;
        document.getElementById("email_in").value = Contact.Email ;
        document.getElementById("phone_in").value = Contact.Phone ;
        document.getElementById("Address_in").value = Contact.Address ;
        this.props.displayadd(e);
    }

    SetContactcard(e,Contactc){
        e.preventDefault();
        var card = Contactc;
        var tempstate = this.state.data;
        this.setState({
            data:{
                contactlist : tempstate.contactlist,
                contatcUI :  tempstate.contatcUI,
                Contactcard: card,
                url : tempstate.url,

            },

        });

    }

     DeleteContatct(e,Name){
        e.preventDefault();
        var delitem = Name;
        var delurl =  this.state.data.url +'/TemoPOCLUP/v1/ContactOperation?Name='+delitem;
        alert('Are you sure to remove : ' + delitem );
        var del =fetch(delurl,{method:'DELETE'}).then(res=>res.json()).then(this.FormContatctTable());


     }
    getContactList(){
        var url = this.state.data.url + '/TemoPOCLUP/v1/ContactOperation';
        return fetch(url).then(res => res.json())


    }
    FormContatctTable() {

          var surl = this.state.data.url;

        Promise.all([this.getContactList()]).then(result => {
            this.setState({
                data:
                    {
                        contactlist: result[0],
                        url : surl,

                    }
            }, () => { console.dir("STATE" + this.state.data.contactlist) });


        }).then(result =>{
            var temp = (this.state.data.contactlist)? this.state.data.contactlist:"no value";
            console.log(JSON.stringify(temp, null, 4));
            var ContactList = (temp.pxResults)? temp.pxResults : "no Audit to Display";
            var imgurl = './img_avatar.png';
            var rows = ContactList.map((ContactList, i) => {
                var address = ContactList.Address.replace(",","\n");

                return <tr key={i}>


                    <td> <div className="chip">

                        <img src={imgurl} alt='Person' width='96' height='96'/>
                        <a onClick={(e)=>this.SetContactcard(e,ContactList)} >{ContactList.Name}</a> : {ContactList.Phone}                    </div>
                </td>




                </tr>
            });
            var tempstate = this.state.data;
            this.setState({

                data:
                    {
                        contatcUI: rows,
                        contactlist:tempstate.contactlist,
                        url: tempstate.url,
                    }
            });

            console.log(JSON.stringify(rows));

        });
    }



    FormContatctTablesearch(filter) {



        var temp = (this.state.data.contactlist) ? this.state.data.contactlist : "no value";
        console.log(JSON.stringify(temp, null, 4));
        var ContactList = (temp.pxResults) ? temp.pxResults : "no Audit to Display";
        var imgurl = './img_avatar.png';
        var ContactSearch = new Array();
        var j;
        var k = 0;
        for (j in temp.pxResults) {


            if(temp.pxResults[j].Name.toUpperCase().indexOf(filter)> -1){
                ContactSearch.push(temp.pxResults[j]);
                k++;
               }
           }

        var rows = ContactSearch.map((ContactList, i) => {
            var address = ContactList.Address.replace(",","\n");

            return <tr key={i}>


                <td> <div className="chip">

                    <img src={imgurl} alt='Person' width='96' height='96'/>
                    <a onClick={(e)=>this.SetContactcard(e,ContactList)} >{ContactList.Name}</a> : {ContactList.Phone}                    </div>
                </td>




            </tr>
        });

             var stateurl = this.state.data.url;

            this.setState({

                data:
                    {
                        contatcUI: rows,
                        contactlist: temp,
                        url: stateurl,
                    }
            });

            console.log(JSON.stringify(rows));

        }

    componentDidMount(){
        this.FormContatctTable();


    }

    componentWillReceiveProps(props){

        if(this.props.reload == 'true'){
            this.FormContatctTable();
        }
    }


         Search(e) {
        // Declare variables
        var input, filter, table, tr, td, i;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("Contact-List");
        tr = table.getElementsByTagName("tr");

       this.FormContatctTablesearch(filter);
    }


    render(){


        return(



        <div className="well">
            <h3 className="text-center">
                <strong>
                    Contacts
                </strong>
            </h3>
            <hr/>

            <div className="form-group">

                <div className="searchcontact">

                <input id = "myInput"type="text"  placeholder="search contact" onChange={(e)=> this.Search(e) } className=".searchcontact " />
                </div>
            </div>
            <hr/>

            <div className="datagrid">
            <table id = "Contact-List" className="blueTable">
                <thead>
                <tr>
                    <th>Contact</th>

                </tr>
                </thead>
                <tbody>
                {this.state.data.contatcUI}
                </tbody>
            </table>
        </div>

            <div id ="ContatcCard" className="card"> <Contactcard contact ={this.state.data.Contactcard} formtable = {this.FormContatctTable.bind(this)} /> </div>


        </div>



        );


    }



}
export default ContactList
