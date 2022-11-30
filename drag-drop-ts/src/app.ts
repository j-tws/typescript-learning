// Drag & Drop Interfaces
interface Draggable {
  dragStartHandler(event: DragEvent): void
  dragEndHandler(event: DragEvent): void
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void
  dropHandler(event: DragEvent): void
  dragLeaveHandler(event: DragEvent): void
}

// Project Type
enum ProjectStatus { Active, Finished }

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ){}
}

// Project State Management
type Listener<T> = (items: T[]) => void

class State<T> {
  protected listeners: Listener<T>[] = []

  addListener(listenerFn: Listener<T>){
    this.listeners.push(listenerFn)
  }
}

class ProjectState extends State<Project> {
  
  private projects: Project[] = []
  private static instance: ProjectState

  private constructor(){
    super()
  }

  static getInstance(){
    if (this.instance){
      return this.instance
    }
    this.instance = new ProjectState()
    return this.instance
  }


  addProject(title: string, description: string, numOfPeople: number){
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    )

    this.projects.push(newProject)
    this.updateListeners()
  }

  moveProject(projectId: string, newStatus: ProjectStatus){
    const project = this.projects.find(project => project.id === projectId)
    if (project && project.status !== newStatus) {
      project.status = newStatus
      this.updateListeners()
    }
  }

  private updateListeners(){
    for (const listenerFn of this.listeners){
      listenerFn(this.projects.slice())
    }
  }
}

const projectState = ProjectState.getInstance()

// validation
interface Validate {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number
}

function validate(input: Validate){
  let isValid = true;

  if (input.required){
    isValid = isValid && input.value.toString().trim().length !== 0
  }

  if (input.minLength != null && typeof input.value === 'string'){
    isValid = isValid && input.value.length > input.minLength
  }

  if (input.maxLength != null && typeof input.value === 'string'){
    isValid = isValid && input.value.length < input.maxLength
  }

  if (input.min != null && typeof input.value === 'number'){
    isValid = isValid && input.value > input.min
  }

  if (input.max != null && typeof input.value === 'number'){
    isValid = isValid && input.value < input.max
  }
  return isValid
}

// Autobind decorator
function Autobind(
  _: any, 
  _2: string, 
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get(){
      const boundFn = originalMethod.bind(this)
      return boundFn
    }
  }

  return adjDescriptor
}

// Component Base Class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;
  

  constructor(
    templateId: string, 
    hostElementId: string, 
    insertAtStart: boolean, 
    newElementId?: string
  ){
    this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement
    this.hostElement = document.getElementById(hostElementId)! as T

    const importedNode = document.importNode(this.templateElement.content, true)
    this.element = importedNode.firstElementChild as U
    if (newElementId){
      this.element.id = newElementId
    }

    this.attach(insertAtStart)
  }

  private attach(insertAtBeginning: boolean){
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? 'afterbegin' : 'beforeend', 
      this.element
    )
  }

  abstract configure(): void
  abstract renderContent(): void
}

// ProjectList Class
class ProjectList extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
  assignedProjects: Project[];

  constructor(private type: 'active' | 'finished'){
    super('project-list', 'app', false,`${type}-projects`)
    this.assignedProjects = []

    // this.hostElement.innerHTML = this.templateElement.innerHTML
    
    this.configure()
    this.renderContent()
  }

  @Autobind
  dragOverHandler(event: DragEvent){
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain'){
      event.preventDefault()
      const listEl = this.element.querySelector('ul')!
      listEl.classList.add('droppable')
    }
  }

  @Autobind
  dropHandler(event: DragEvent){
    const projectId = event.dataTransfer!.getData('text/plain')
    projectState.moveProject(
      projectId, 
      this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished)
  }

  @Autobind
  dragLeaveHandler(_: DragEvent){
    const listEl = this.element.querySelector('ul')!
    listEl.classList.remove('droppable')
  }

  private renderProjects(){
    const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement
    listEl.innerHTML = ''
    for (const projectItem of this.assignedProjects){
      new ProjectItem(this.element.querySelector('ul')!.id, projectItem)
    }
  }

  configure(){
    this.element.addEventListener('dragover', this.dragOverHandler)
    this.element.addEventListener('dragleave', this.dragLeaveHandler)
    this.element.addEventListener('drop', this.dropHandler)

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(prj => {
        if(this.type === 'active'){
          return prj.status === ProjectStatus.Active
        }
       return prj.status === ProjectStatus.Finished
      })
      this.assignedProjects = relevantProjects
      this.renderProjects()
    })
  }

  renderContent(){
    const listId = `${this.type}-projects-list`
    this.element.querySelector('ul')!.id = listId
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS'
  }
}

// ProjectItem Class
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  private project: Project;

  get persons(){
    if (this.project.people === 1){
      return '1 person'
    } else {
      return `${this.project.people} persons`
    }
  }

  constructor(hostId: string, project: Project){
    super('single-project', hostId, false, project.id)
    this.project = project
    this.configure()
    this.renderContent()
  }

  @Autobind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData('text/plain', this.project.id)
    event.dataTransfer!.effectAllowed = 'move'
  }

  dragEndHandler(_: DragEvent): void {
    console.log('DragEnd');
    
  }

  configure(): void {
    this.element.addEventListener('dragstart', this.dragStartHandler)
    this.element.addEventListener('dragstart', this.dragEndHandler)
  }

  renderContent(): void {
    this.element.querySelector('h2')!.textContent = this.project.title
    this.element.querySelector('h3')!.textContent = this.persons + ' assigned'
    this.element.querySelector('p')!.textContent = this.project.description
  }
}

// ProjectInput Class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  peopleInput: HTMLInputElement;

  
  constructor(){
    super('project-input', 'app', true, 'user-input')
    this.titleInput = this.element.querySelector('#title')! as HTMLInputElement
    this.descriptionInput = this.element.querySelector('#description')! as HTMLInputElement
    this.peopleInput = this.element.querySelector('#people')! as HTMLInputElement
    this.configure()
  }

  private gatherUserInput(): [string, string, number] | void{
    const enteredTitle = this.titleInput.value
    const enteredDescription = this.descriptionInput.value
    const enteredPeople = this.peopleInput.value

    const titleValidatable: Validate = {
      value: enteredTitle,
      required: true
    }

    const descriptionValidatable: Validate = {
      value: enteredDescription,
      required: true,
      minLength: 6,
      maxLength: 20,
    }

    const peopleValidatable: Validate = {
      value: parseInt(enteredPeople),
      required: true,
      min: 3,
      max: 10
    }

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('Invalid input, please try again')
      return
    } else {
      return [enteredTitle, enteredDescription, parseInt(enteredPeople)]
    }
  }

  private clearInputs(){
    this.titleInput.value = ''
    this.descriptionInput.value = ''
    this.peopleInput.value = ''
  }
  
  configure(){
    this.element.addEventListener('submit', this.onSubmit)
  }

  renderContent(): void {
    
  }

  @Autobind
  private onSubmit(ev: Event){
    ev.preventDefault()
    // console.log(this.titleInput.value)
    const userInput = this.gatherUserInput()
    // console.log(userInput)
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput
      projectState.addProject(title, description, people)
      this.clearInputs()
    }
  }
  
}

const test = new ProjectInput()
const activeList = new ProjectList('active')
const finishedList = new ProjectList('finished')
