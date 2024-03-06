interface Project {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

interface OutputProjectModel {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export default class ProjectModel {
    public id: string;
    public name: string;
    public createdAt: string;
    public updatedAt: string;

    constructor(data: Project) {
        this.id = data.id;
        this.name = data.name;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    public getProjectModel(): OutputProjectModel {
        return {
            id: this.id,
            name: this.name,
            createdAt: new Date(this.createdAt),
            updatedAt: new Date(this.updatedAt),
        };
    }

    public clone(): ProjectModel {
        return new ProjectModel({
            id: this.id,
            name: this.name,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        });
    }
}
