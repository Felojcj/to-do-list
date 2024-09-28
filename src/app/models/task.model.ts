export interface Skills {
  skill: string
}

export interface People {
  name: string,
  age: number,
  skills: Skills[]
}

export interface Task {
  id: string,
  taskName: string,
  limitDate: string,
  active: boolean,
  people: People[]
}
