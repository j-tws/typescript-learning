import Cmp from "./base-component";
import * as Validation from "../util/validation";
import { Autobind } from "../decorators/autobind";
import { projectState } from "../state/project-state";


// ProjectInput Class
export class ProjectInput extends Cmp<HTMLDivElement, HTMLFormElement> {
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

    const titleValidatable: Validation.Validate = {
      value: enteredTitle,
      required: true
    }

    const descriptionValidatable: Validation.Validate = {
      value: enteredDescription,
      required: true,
      minLength: 6,
      maxLength: 20,
    }

    const peopleValidatable: Validation.Validate = {
      value: parseInt(enteredPeople),
      required: true,
      min: 3,
      max: 10
    }

    if (
      !Validation.validate(titleValidatable) ||
      !Validation.validate(descriptionValidatable) ||
      !Validation.validate(peopleValidatable)
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



