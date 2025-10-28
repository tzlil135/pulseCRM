let ENV = "development";

const connectToDB = () => {
    if (ENV === "development") {
        import("./mongoDB/conectLocally");
    }
    if (ENV === "production") {
        import("./mongoDB/connectToAtlas");
    }
};
export default connectToDB;