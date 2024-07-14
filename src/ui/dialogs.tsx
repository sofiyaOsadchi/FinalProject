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
export const showConfirmDialog = async (p0: string) => {
    return await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        position: "center",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    });
}

const dialogs = { success: showSuccessDialog, error: showErrorDialog, confirm: showConfirmDialog };
export default dialogs;