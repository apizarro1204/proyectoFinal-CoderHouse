function __(id) {
  return document.getElementById(id);
}
export function verifyPass() {
    console.log('Mensajeeee')
  let pass = __("password").value,
    pass2 = __("password2").value;

  if (pass != pass2) {
    window.alert('Las contraseñas no coinciden')
  } else {
    window.alert('Mensaje else')
  }
}

