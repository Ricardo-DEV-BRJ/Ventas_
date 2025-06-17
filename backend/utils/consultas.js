function todos(tablas, campo, orden) {
    const orden_tabla = campo ? `ORDER BY  ${campo} ${orden}` : ''
    const query = `SELECT * FROM ${tablas} ${orden_tabla}`
    return query;
}

function uno(tablas, id) {
    const query = `SELECT * FROM ${tablas} WHERE ${id} = ?`
    return query;
}


function crear(tablas, campos) {
    let insert = []
    for (let i = 0; i < campos.length; i++) {
        insert.push('?')
    }
    const query = `INSERT INTO ${tablas} (${campos.join(', ')}) VALUES (${insert.join(', ')})`
    return query;
}


function modificar(tablas, campos, id) {
    for (let i = 0; i < campos.length; i++) {
        campos[i] = campos[i] + ' = ?';
    }
    const query = `UPDATE ${tablas} SET ${campos.join(', ')} WHERE ${id} = ?`
    return query
}

function eliminar(tablas, campos, id) {
    const query = `UPDATE ${tablas} SET ${campos} = ? WHERE ${id} = ?`
    return query
}
module.exports = { todos, crear, modificar, eliminar, uno }