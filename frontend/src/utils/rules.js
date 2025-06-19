const rules = {
    required: value => !!value || 'Campo requerido',
    empty: value => value.trim() !== '' || 'Campo vacío'
}

export {
    rules,
}