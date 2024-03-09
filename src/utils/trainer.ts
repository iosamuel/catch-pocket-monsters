export function setTrainerName(name: string) {
  localStorage.setItem('trainer', name)
}

export function getTrainerName() {
  return localStorage.getItem('trainer')
}
