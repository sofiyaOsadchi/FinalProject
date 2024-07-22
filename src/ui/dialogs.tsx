import Swal from "sweetalert2";


 export const showSuccessDialog = (title: string, text: string) => {
    return Swal.fire({
        title,
        text,
        icon: "success",
        position: "center",
        showConfirmButton: false,
        width: 400,
        timer: 1500,
        customClass: {
            popup: 'custom-font-size'
        }
    });

};
export const showErrorDialog = (title: string, text: string) => {
    return Swal.fire({
        title,
        text,
        icon: "error",
        position: "center",
        showConfirmButton: false,
        width: 400,
        timer: 2000,
        customClass: {
            popup: 'custom-font-size'
        }
    });
};
export const showConfirmDialog = async (title: string, text: string) => {
    return await Swal.fire({
        title,
        text,
        icon: "warning",
        position: "center",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    });
}

export const showPopup = (title: string, html: string) => {
    return Swal.fire({
        title,
        html,
        icon: "success",
        position: "top-end",
        showConfirmButton: false,
        width: 300,
        timer: 6000,
        customClass: {
            popup: 'custom-font-size'
        }
    });
};

const dialogs = { success: showSuccessDialog, error: showErrorDialog, confirm: showConfirmDialog, showPopup };
export default dialogs;