import {Meteor} from "meteor/meteor";
import {ContactsCollection} from "./ContactsCollection";

Meteor.methods({
    'contacts.insert'(name, email, imageUrl) {
        return ContactsCollection.insert({ name, email, imageUrl });
    },
    'contacts.fetchAll'() {
        return ContactsCollection.find({}).fetch();
    }
})
