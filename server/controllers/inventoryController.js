import InventoryModel from "../models/inventoryModel.js";
import userModel from "../models/userModel.js";

const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType } = req.body;
    //validate request
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        message: "USER NOT FOUND",
        success: false,
      });
    }
    if (inventoryType === "in" && user.role !== "donar") {
      return res.status(400).send({
        message: "ONLY DONAR CAN ADD INVENTORY",
        success: false,
      });
    }
    if (inventoryType === "out" && user.role !== "hospital") {
      return res.status(400).send({
        message: "ONLY HOSPITAL CAN ADD INVENTORY",
        success: false,
      });
    }
    // save inventory
    const inventory = new InventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      message: "NEW BLOOD RECORD CREATED SUCCESSFULLY",
      success: true,
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "ERROR IN CREATING INVENTORY",
      success: false,
      error,
    });
  }
};

const getAllInventoryController = async (req, res) => {
  try {
    const inventories = await InventoryModel.find({
      organization: req.body.userId,
    })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      message: "ALL BLOOD RECORDS",
      success: true,
      inventories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "ERROR IN GETTING INVENTORIES",
      success: false,
      error,
    });
  }
};

export { createInventoryController, getAllInventoryController };
