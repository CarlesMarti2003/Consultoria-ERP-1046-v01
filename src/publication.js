// Reactivar únicament quan Héctor ho demane.
// Es conserven les pàgines, els requisits i les descàrregues per a la pròxima entrega.
export const showAdvancedSections = false
export const isProjectPagePublished = (page) => showAdvancedSections || !['requisits','documents'].includes(page)
