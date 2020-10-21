import { Student } from './student.js';
let info: [string, string][] = [
	['Código', '201812721'],
	['Cédula', '1001308205'],
	['Edad', '20 años'],
	['Dirección', 'Diag 82 G # 72 C 31'],
	['Número de teléfono', '3112858812'],
];
export const dataStudent = [new Student(info)];
