import mongoose from "mongoose";

const inventorySchema = mongoose.Schema({
    inventoryType: {
        type: String,
        required: [true, "Inventory type is required"],
        enum:["in" , "out"]
    },
    bloodGroup: {
        type: String,
        required: [true, "Blood group is required"],
        enum:["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required: [true, "Organization is required"],
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required: function () {
            return this.inventoryType === "out";
        },
    },
    donar: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required: function () {
            return this.inventoryType === "in";
        },
    },
},
{
    timestamps: true,
}
);

const InventoryModel = mongoose.model("Inventory", inventorySchema);
export default InventoryModel;