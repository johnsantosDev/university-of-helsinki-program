export interface MainHeader {
    courseName: string
}

interface Exercise {
    name: string,
    exerciseCount: number
}

export interface Contents {
    content: Exercise []
}

export interface TotalExercise {
    total: number
}

interface CoursePartBase {
    name: string,
    exerciseCount: number
}

interface CoursePartDescription extends CoursePartBase {
    description: string
}

interface CoursePartBasic extends CoursePartDescription {
    kind: 'basic'
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number,
    kind: 'group'
}

interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string,
    kind: 'background'
}

interface CoursePartRequirement extends CoursePartDescription{
    requirements: string[],
    kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirement

export interface Parts {
    courses: CoursePart[]
}