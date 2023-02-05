import Tenants from "../models/TenantModel.js";

export const addTenant = async (req, res) => {
    const { url, address, contact_number } = req.body;
    try {
        await Tenants.create({
            URL: url,
            address: address,
            contact_number: contact_number
        });
        res.json({ msg: "Tenant Registrated Successfully" });
    } catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
}

export const updateTenant = async (req, res) => {
    try {
        await Tenants.update(req.body, {
            where: {
                uuid: req.params.uuid
            }
        });
        res.status(200).json({ msg: "Tenant Updated Successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
}

export const deleteTenant = async (req, res) => {
    try {
        await Tenants.destroy({
            where: {
                uuid: req.params.uuid
            }
        });
        res.status(200).json({ msg: "Teanant Deleted Successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
}

export const getAllTenants = async (req, res) => {
    try {
        const response = await Tenants.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
}

export const getTenantById = async (req, res) => {
    try {
        const response = await Tenants.findOne({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
}