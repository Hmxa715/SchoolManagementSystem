import React, { useState } from "react";
import {  Form } from "react-bootstrap";

const AddTenantForm = props => {
    const initialFormState = {
        tenanturl: "",
        tenantaddress: "",
        tenantcontact: ""
    };
    const [Tenant, setUser] = useState(initialFormState);

    const handleInputChange = event => {
        const { name, value } = event.target;

        setUser({ ...Tenant, [name]: value });
    };

    return (
        <form
            onSubmit={event => {
                event.preventDefault();
                if (!Tenant.tenanturl || !Tenant.tenantaddress || !Tenant.tenantcontact) return;

                props.addUser(Tenant);
                setUser(initialFormState);
            }}
        >
            <Form.Group>
                <Form.Label>URL</Form.Label>
                <Form.Control
                    type="Text"
                    placeholder="Domain URL"
                    name="tenanturl"
                    value={Tenant.URL}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Address"
                    name="tenantaddress"
                    value={Tenant.Address}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Contact</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Contact Number"
                    name="tenantcontact"
                    value={Tenant.contact_number}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <button className="btn btn-primary">Save</button>
        </form>
    );
};

export default AddTenantForm;
