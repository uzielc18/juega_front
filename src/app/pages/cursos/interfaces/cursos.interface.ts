export interface Cursos {
    data: Data;
}

export interface Data {
    cursos_estudiante: CursosEstudiante[];
    cursos_docente:    any[];
}

export interface CursosEstudiante {
    id:                     number;
    course_id:              number;
    persons_student_id:     number;
    id_carga_curso_docente: string;
    codigo:                 string;
    ciclo:                  string;
    estado_matricula:       string;
    estado:                 string;
    created_at:             null;
    updated_at:             null;
    deleted_at:             null;
    semester_id:            number;
    origen_matricula:       string;
}
