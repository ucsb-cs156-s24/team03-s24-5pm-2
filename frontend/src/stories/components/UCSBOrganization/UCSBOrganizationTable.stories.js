import React from 'react';
import OrganizationTable from 'main/components/UCSBOrganizations/UCSBOrganizationTable';
import { ucsbOrganizationsFixtures } from 'fixtures/ucsbOrganizationFixture';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';
import { rest } from "msw";

export default {
    title: 'components/UCSBOrganizations/UCSBOrganizationTable',
    component: OrganizationTable
};

const Template = (args) => {
    return (
        <OrganizationTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    organizations: []
};

export const ThreeItemsOrdinaryUser = Template.bind({});

ThreeItemsOrdinaryUser.args = {
    organizations: ucsbOrganizationsFixtures.threeOrganization,
    currentUser: currentUserFixtures.userOnly,
};

export const ThreeItemsAdminUser = Template.bind({});
ThreeItemsAdminUser.args = {
    organizations: ucsbOrganizationsFixtures.threeOrganization,
    currentUser: currentUserFixtures.adminUser,
}

ThreeItemsAdminUser.parameters = {
    msw: [
        rest.delete('/api/UCSBOrganization', (req, res, ctx) => {
            window.alert("DELETE: " + JSON.stringify(req.url));
            return res(ctx.status(200),ctx.json({}));
        }),
    ]
};
