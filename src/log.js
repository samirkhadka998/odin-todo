import Swal from 'sweetalert2'


export function ConfirmMessage() {
    let result = false;
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            //   Swal.fire(
            //     'Deleted!',
            //     'Your file has been deleted.',
            //     'success'
            //   )
            result = true;
        }
        else {

            result = false;
        }
    })

    return result;
}

export default function LogMessage(type = "save", icon = "success") {

    let message = '';

    switch (type) {
        case "save":
            message = "Data saved sucessfully"
            break;

        case "delete":
            message = "Data deleted sucessfully"
            break;

        case "update":
            message = "Data updated sucessfully"
            break;


        default:
            break;
    }

    Swal.fire({
        icon: icon,
        title: message,
        showConfirmButton: false,
        timer: 1300
    })

}