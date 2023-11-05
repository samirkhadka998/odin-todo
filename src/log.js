import Swal from 'sweetalert2'


export default function LogMessage(message, type) {

    console.log(message)
}

export  function AutoClose() {

    let timerInterval
    Swal.fire({
        title: 'Auto close alert!',
        html: 'I will close in <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            // const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                //   b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        //   if (result.dismiss === Swal.DismissReason.timer) {
        //     console.log('I was closed by the timer')
        //   }
    })
}