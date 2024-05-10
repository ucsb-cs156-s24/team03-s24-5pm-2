import React from 'react';
import OrganizationForm from "main/components/UCSBOrganizations/UCSBOrganizationForm"
import { ucsbOrganizationsFixtures } from 'fixtures/ucsbOrganizationFixture';

export default {
    title: 'components/UCSBOrganizations/UCSBOrganizationForm',
    component: OrganizationForm
};


const Template = (args) => {
    return (
        <OrganizationForm {...args} />
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
    initialContents: ucsbOrganizationsFixtures.oneOrganization,
    buttonLabel: "Update",
    submitAction: (data) => {
        console.log("Submit was clicked with data: ", data); 
        window.alert("Submit was clicked with data: " + JSON.stringify(data));
   }
};
