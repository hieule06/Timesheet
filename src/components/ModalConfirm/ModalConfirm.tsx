import Swal from "sweetalert2";

export const ModalConfirm = (
  titleBtnArchive: string | undefined,
  name: string | undefined
) =>
  Swal.fire({
    title: "Are you sure?",
    text: `${titleBtnArchive} : '${name}'?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#7cd1f9",
    cancelButtonColor: "#efefef",
    confirmButtonText: "Yes",
    reverseButtons: true
  });
