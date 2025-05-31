export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    email?: string;
    phone?: string;
    birthDate: string;
    image?: string;
    address?: Address;
    company?: Company;
}

export interface Address {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
}

export interface Company {
    department: string;
    name: string;
    title: string;
    address?: Address;
}

export interface EmployeeResponse {
    users: Employee[];
    total: number;
    skip: number;
    limit: number;
}   