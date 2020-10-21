import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var estudiantesTbody = document.getElementById('estudiantes');
var btnfilterByName = document.getElementById('button-filterByName');
var inputSearchBox = (document.getElementById('search-box'));
var totalCreditElm = document.getElementById('total-credits');
var btnfilterByNumber = document.getElementById('button-filterByNumber');
var inputSearchBoxMin = (document.getElementById('search-boxMin'));
var inputSearchBoxMax = (document.getElementById('search-boxMax'));
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByNumber.onclick = function () { return buscarPorRango(); };
renderCoursesInTable(dataCourses);
colocarDatosEstudiante(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement('tr');
        trElement.innerHTML = "<td>" + course.name + "</td>\n                        <td>" + course.professor + "</td>\n                        <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = text == null ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === ''
        ? dataCourses
        : courses.filter(function (c) { return c.name.match(nameKey); });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return (totalCredits = totalCredits + course.credits); });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
function colocarDatosEstudiante(studentData) {
    studentData.forEach(function (estudiante) {
        estudiante.informacion.forEach(function (info) {
            var trElement = document.createElement('tr');
            trElement.innerHTML = "\t\n\t\t\t<th scope=\"row\">" + info[0] + "</th>\n\t\t\t<td>" + info[1] + "</td>";
            estudiantesTbody.appendChild(trElement);
        });
    });
}
function buscarPorRango() {
    var min = inputSearchBoxMin.valueAsNumber;
    min = min == null ? 0 : min;
    var max = inputSearchBoxMax.valueAsNumber;
    max = max == null ? 0 : max;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(min, max, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByCredits(min, max, courses) {
    return min === 0 && max === 0
        ? dataCourses
        : courses.filter(function (c) { return c.credits >= min && c.credits <= max; });
}
