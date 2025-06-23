
/**
 * getAuthPayload devuelve el payload del token en json
 * @return {Object} payload en JSON
 */
function getAuthPayload() {
  const token = localStorage.getItem('token');
  const payload = token ? token.split('.')[1] : null;
  return payload ? JSON.parse(decodeURIComponent(escape(atob(payload)))) : {};
}

/**
 * getAuthPayload devuelve el payload del token en json
 * @return {String} payload en JSON
 */
function getToken() {
  return localStorage.getItem('token');
}

/**
 * getAuthPayload devuelve el payload del token en json
 * @return {String} el identificador de la persona loggueada
 */
function getPersonId() {
  return getAuthPayload().id;
}

/**
 * getAuthPayload devuelve el payload del token en json
 * @return {String} el usuario completo de la persona loggueada
 */
function getPersonUsuario() {
  return getAuthPayload().usuario;
}
/**
 * 
 * getAuthPayload devuelve el payload del token en json
 * @return {String} el nombre completo de la persona loggueada
 */
function getPersonNombre() {
  return getAuthPayload().nombre;
}
/**
 * getAuthPayload devuelve el payload del token en json
 * @return {String} el apellido completo de la persona loggueada
 */
function getPersonApellido() {
  return getAuthPayload().apellido;
}

/**
 * getAuthPayload devuelve el payload del token en json
 * @return {String} el rol de la persona loggueada
 */
function getRol() {
  return getAuthPayload().rol;
}

export {
  getPersonId,
  getToken,
  getPersonUsuario,
  getRol,
  getPersonNombre,
  getPersonApellido,
};
