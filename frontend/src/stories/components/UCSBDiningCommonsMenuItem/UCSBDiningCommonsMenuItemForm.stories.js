import React from 'react';
import UCSBDiningCommonsMenuItemForm from "main/components/UCSBDiningCommonsMenuItems/UCSBDiningCommonsMenuItemForm";
import {ucsbDiningCommonsMenuItemsFixtures} from "fixtures/ucsbDiningCommonsMenuItemsFixtures";

export default {
    title: 'components/UCSBDiningCommonsMenuItem/UCSBDiningCommonsMenuItemForm',
    component: UCSBDiningCommonsMenuItemForm,
};

const Template = (args) => {
    return (
        <UCSBDiningCommonsMenuItemForm {...args} />
    )
};

export const Create = Template.bind({});

Create.args = {
    buttonLabel: "Create",
    submitAction: (data) => {
        console.log("Submit was clicked with data: ", data);
        window.alert("Submit was clicked with data: " + JSON.stringify(data));
    }
};

export const Update = Template.bind({});

Update.args = {
    initialContents: ucsbDiningCommonsMenuItemsFixtures.oneDiningCommonsMenuItem[0],
    buttonLabel: "Update",
    submitAction: (data) => {
        console.log("Submit was clicked with data: ", data);
        window.alert("Submit was clicked with data: " + JSON.stringify(data));
    }
};
