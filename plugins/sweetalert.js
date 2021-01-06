import Swal from 'sweetalert2'

export default (ctx, inject) => {
  ctx.$swal = Swal
  inject('swal', Swal)
}
