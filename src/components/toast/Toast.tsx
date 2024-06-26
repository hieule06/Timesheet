import Swal from "sweetalert2";

export const Toast = Swal.mixin({
  toast: true,
  customClass: {
    popup: "colored-toast"
  },
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  position: "bottom-end",
  color: "white",
  iconColor: "white"
});
