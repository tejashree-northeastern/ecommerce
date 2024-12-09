import { toast } from "react-toastify";

const displayToast = ({ msg, type = "success" }) =>
  toast[type](msg, {
    position: "bottom-center",
    autoClose: 3000,
  });

export default displayToast;
