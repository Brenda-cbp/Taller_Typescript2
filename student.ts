export class Student {
	codigo: string;
	cedula: string;
	direccion: string;
	edad: string;
	telefono: string;
	informacion: [string, string][];
	constructor(informacion: [string, string][]) {
		this.informacion = informacion;
		this.codigo = informacion[0][1];
		this.cedula = informacion[1][1];
		this.direccion = informacion[2][1];
		this.edad = informacion[3][1];
		this.telefono = informacion[4][1];
	}
}
// export class Student {
// 	atributo: string;
// 	valor: string;
// 	informacion: [string, string][];
// 	constructor(atributo: string, valor: string) {
// 		this.atributo = atributo;
// 		this.valor = valor;
// 	}
// }
