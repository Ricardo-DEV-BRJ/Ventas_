const rules = {
    required: value => !!value || 'Campo requerido',
    empty: value => value.trim() !== '' || 'Campo vacío',
    positive: value => value > 0 || 'Debe ser un número positivo'
}

export {
    rules,
}