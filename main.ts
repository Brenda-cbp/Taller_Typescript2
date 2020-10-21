import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
import { Student } from './student.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let estudiantesTbody: HTMLElement = document.getElementById('estudiantes')!;
const btnfilterByName: HTMLElement = document.getElementById(
	'button-filterByName'
)!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>(
	document.getElementById('search-box')!
);
const totalCreditElm: HTMLElement = document.getElementById('total-credits')!;

const btnfilterByNumber: HTMLElement = document.getElementById(
	'button-filterByNumber'
)!;
const inputSearchBoxMin: HTMLInputElement = <HTMLInputElement>(
	document.getElementById('search-boxMin')!
);
const inputSearchBoxMax: HTMLInputElement = <HTMLInputElement>(
	document.getElementById('search-boxMax')!
);

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByNumber.onclick = () => buscarPorRango();

renderCoursesInTable(dataCourses);
colocarDatosEstudiante(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`;

function renderCoursesInTable(courses: Course[]): void {
	console.log('Desplegando cursos');
	courses.forEach((course) => {
		let trElement = document.createElement('tr');
		trElement.innerHTML = `<td>${course.name}</td>
                        <td>${course.professor}</td>
                        <td>${course.credits}</td>`;
		coursesTbody.appendChild(trElement);
	});
}

function applyFilterByName() {
	let text = inputSearchBox.value;
	text = text == null ? '' : text;
	clearCoursesInTable();
	let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
	renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
	return nameKey === ''
		? dataCourses
		: courses.filter((c) => c.name.match(nameKey));
}

function getTotalCredits(courses: Course[]): number {
	let totalCredits: number = 0;
	courses.forEach((course) => (totalCredits = totalCredits + course.credits));
	return totalCredits;
}

function clearCoursesInTable() {
	while (coursesTbody.hasChildNodes()) {
		if (coursesTbody.firstChild != null) {
			coursesTbody.removeChild(coursesTbody.firstChild);
		}
	}
}

function colocarDatosEstudiante(studentData: Student[]): void {
	studentData.forEach((estudiante) => {
		estudiante.informacion.forEach((info) => {
			let trElement = document.createElement('tr');
			trElement.innerHTML = `	
			<th scope="row">${info[0]}</th>
			<td>${info[1]}</td>`;
			estudiantesTbody.appendChild(trElement);
		});
	});
}

function buscarPorRango() {
	let min = inputSearchBoxMin.valueAsNumber;
	min = min == null ? 0 : min;
	let max = inputSearchBoxMax.valueAsNumber;
	max = max == null ? 0 : max;
	clearCoursesInTable();
	let coursesFiltered: Course[] = searchCourseByCredits(min, max, dataCourses);
	renderCoursesInTable(coursesFiltered);
}
function searchCourseByCredits(min: number, max: number, courses: Course[]) {
	return min === 0 && max === 0
		? dataCourses
		: courses.filter((c) => c.credits >= min && c.credits <= max);
}
