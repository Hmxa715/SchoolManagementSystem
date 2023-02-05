/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import ModalDialog from "./modal/ModalDialog";

const Dashboard = () => {
    const [name, setName] = useState("");
    const [token, setToken] = useState("");
    const [expire, setExpire] = useState("");
    const [Tenants, setTenants] = useState([]);
    const [show, setShow] = useState(false);
    const [uuid, setuuid] = useState("");
    const [url, setURL] = useState("");
    const [address, setaddress] = useState("");
    const [contact_number, setcontactnumber] = useState("");
    const history = useNavigate();

    useEffect(() => {
        refreshToken();
        getAllTenants();
        // getUsers();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get("http://localhost:5000/token");
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                history("/");
            }
        }
    };

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(
        async (config) => {
            const currentDate = new Date();
            if (expire * 1000 < currentDate.getTime()) {
                const response = await axios.get("http://localhost:5000/token");
                config.headers.Authorization = `Bearer ${response.data.accessToken}`;
                setToken(response.data.accessToken);
                const decoded = jwt_decode(response.data.accessToken);
                setName(decoded.name);
                setExpire(decoded.exp);
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const getAllTenants = async () => {
        const response = await axiosJWT.get("http://localhost:5000/getAllTenants", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setTenants(response.data || []);
    };
    const getTenantById = async (id) => {
        try {
            console.log('uuid is here: ',id)
            const response = await axios.get(`http://localhost:5000/getTenantById/${id}`);
            setuuid(response.data.uuid);
            setURL(response.data.URL);
            setaddress(response.data.address);
            setcontactnumber(response.data.contact_number);
        } catch (error) {
            console.log(error);
        }
    };
    const saveTenant = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/addTenant", {
                url,
                address,
                contact_number,
            });
            setShow(false);
            history("/dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    const updateTenant = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/updateTenant/${uuid}`, {
                url,
                address,
                contact_number,
            });
            history("/dashboard");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="container mt-5">
            <p>Welcome Back: {name}</p>
            <button onClick={() => setShow(true)} className="button is-success custom-link"> Add Tenant</button>
            <ModalDialog
                title="Add Tenant"
                onClose={() => setShow(false)}
                show={show}>
                <div className="columns is-centered">
                    <div className="column" style={{ padding: '20px' }}>
                        <form onSubmit={saveTenant}>
                            <div className="field">
                                <label className="label">URL</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={url}
                                        onChange={(e) => setURL(e.target.value)}
                                        placeholder="Domain URL"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Address</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={address}
                                        onChange={(e) => setaddress(e.target.value)}
                                        placeholder="Address"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Contact</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={contact_number}
                                        onChange={(e) => setcontactnumber(e.target.value)}
                                        placeholder="Contact Number"
                                    />
                                </div>
                            </div>
                            
                            <div className="field">
                                <button type="submit" className="button is-success">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </ModalDialog>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>URL</th>
                        <th>Address</th>
                        <th>Contact Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Tenants.length > 0 ? (Tenants.map((tenant, index) => (
                        <tr key={tenant.uuid}>
                            <td>{index + 1}</td>
                            <td>{tenant.URL}</td>
                            <td>{tenant.address}</td>
                            <td>{tenant.contact_number}</td>
                            <td>
                                <button onClick={() => { setShow(true); getTenantById(tenant.uuid)}} className="button is-small is-info mr-2">Edit</button>
                                <ModalDialog
                                    title="Edit Tenant"
                                    onClose={() => setShow(false)}
                                    show={show}>
                                    {/* <AddTenantForm /> */}
                                    <div className="columns is-centered">
                                        <div className="column" style={{ padding: '20px' }}>
                                            <form onSubmit={updateTenant}>
                                                <div className="field">
                                                    <label className="label">URL</label>
                                                    <div className="control">
                                                        <input
                                                            type="text"
                                                            className="input"
                                                            value={url}
                                                            onChange={(e) => setURL(e.target.value)}
                                                            placeholder="Domain URL"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label className="label">Address</label>
                                                    <div className="control">
                                                        <input
                                                            type="text"
                                                            className="input"
                                                            value={address}
                                                            onChange={(e) => setaddress(e.target.value)}
                                                            placeholder="Address"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label className="label">Contact</label>
                                                    <div className="control">
                                                        <input
                                                            type="text"
                                                            className="input"
                                                            value={contact_number}
                                                            onChange={(e) => setcontactnumber(e.target.value)}
                                                            placeholder="Contact Number"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="field">
                                                    <button type="submit" className="button is-success">
                                                        Save
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </ModalDialog>
                                <button
                                    className="button is-small is-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))) : (
                        <tr>
                            <td colSpan={5} className="text-center">
                                No data found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
